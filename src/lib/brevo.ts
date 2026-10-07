/**
 * Server-side Brevo client for the waitlist API. Only imported by route handlers,
 * so the API key never reaches the browser bundle.
 */

const REQUEST_TIMEOUT_MS = 10_000;

export type BrevoConfig = {
  apiKey: string;
  apiUrl: string;
  listId: number;
  emailFrom: string;
  emailFromName: string;
  emailTo: string;
  emailToName: string;
};

export type BrevoResult = {
  ok: boolean;
  status: number;
  body: Record<string, unknown> | null;
  error: string | null;
};

/** Read and validate the Brevo settings from the environment; throws with a readable message. */
export function loadBrevoConfig(env: NodeJS.ProcessEnv = process.env): BrevoConfig {
  const required = ["BREVO_API_KEY", "BREVO_LIST_ID", "EMAIL_FROM", "EMAIL_FROM_NAME", "EMAIL_TO", "EMAIL_TO_NAME"];
  const missing = required.filter((name) => !env[name]?.trim());
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}. See .env.example.`);
  }

  const apiKey = env.BREVO_API_KEY!.trim();
  if (apiKey.startsWith("xsmtpsib-")) {
    throw new Error(
      "BREVO_API_KEY is an SMTP key (xsmtpsib-...). The API needs an API v3 key (xkeysib-...) from Brevo > SMTP & API > API Keys.",
    );
  }
  if (apiKey === "your-brevo-api-key-here") {
    throw new Error("BREVO_API_KEY is still the placeholder from .env.example.");
  }

  const listId = Number(env.BREVO_LIST_ID);
  if (!Number.isInteger(listId) || listId <= 0) {
    throw new Error("BREVO_LIST_ID must be the numeric ID of a Brevo contact list.");
  }

  return {
    apiKey,
    apiUrl: (env.BREVO_API_URL?.trim() || "https://api.brevo.com/v3").replace(/\/+$/, ""),
    listId,
    emailFrom: env.EMAIL_FROM!.trim(),
    emailFromName: env.EMAIL_FROM_NAME!.trim(),
    emailTo: env.EMAIL_TO!.trim(),
    emailToName: env.EMAIL_TO_NAME!.trim(),
  };
}

export async function brevoRequest(
  config: BrevoConfig,
  method: "GET" | "POST",
  path: string,
  payload?: unknown,
): Promise<BrevoResult> {
  try {
    const response = await fetch(config.apiUrl + path, {
      method,
      headers: { Accept: "application/json", "Content-Type": "application/json", "api-key": config.apiKey },
      body: payload === undefined ? undefined : JSON.stringify(payload),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: "no-store",
    });
    const text = await response.text();
    let body: Record<string, unknown> | null = null;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = null;
    }
    return { ok: response.ok, status: response.status, body, error: null };
  } catch (err) {
    return { ok: false, status: 0, body: null, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Human-readable explanation of a failed call, with a hint for the usual Brevo setup mistakes. */
export function describeBrevoError(result: BrevoResult): string {
  if (result.error) return `Could not reach Brevo: ${result.error}`;

  const message = String(result.body?.message ?? "");
  const code = String(result.body?.code ?? "");
  const detail = `HTTP ${result.status} ${code}: ${message}`.trim();

  if (result.status === 401 && /ip address/i.test(message)) {
    return `${detail} Hint: Brevo blocked this server's IP. Add it under Brevo > Security > Authorised IPs (https://app.brevo.com/security/authorised_ips), or deactivate IP blocking there.`;
  }
  if (result.status === 401) {
    return `${detail} Hint: BREVO_API_KEY is invalid or revoked. Create an API key (it starts with "xkeysib-") under Brevo > SMTP & API > API Keys. SMTP keys ("xsmtpsib-") do not work here.`;
  }
  if (result.status === 400 && /sender/i.test(message)) {
    return `${detail} Hint: EMAIL_FROM must be a sender verified in Brevo (Senders, domains & dedicated IPs).`;
  }
  if (result.status === 404) {
    return `${detail} Hint: check BREVO_LIST_ID matches an existing contact list in Brevo.`;
  }
  return detail;
}

function logFailure(action: string, result: BrevoResult) {
  console.error(`[quikku] Brevo: failed to ${action}. ${describeBrevoError(result)}`);
}

/** Add (or update) a contact in the waitlist list. An existing contact counts as success. */
export async function addContact(config: BrevoConfig, email: string): Promise<BrevoResult> {
  const result = await brevoRequest(config, "POST", "/contacts", {
    email,
    listIds: [config.listId],
    updateEnabled: true,
  });
  // Without updateEnabled Brevo answers 400 duplicate_parameter for known contacts
  if (!result.ok && result.body?.code === "duplicate_parameter") result.ok = true;
  if (!result.ok) logFailure("add contact", result);
  return result;
}

/** Send the internal notification email to the team. */
export async function sendNotification(config: BrevoConfig, subject: string, htmlContent: string) {
  const result = await brevoRequest(config, "POST", "/smtp/email", {
    sender: { name: config.emailFromName, email: config.emailFrom },
    to: [{ email: config.emailTo, name: config.emailToName }],
    subject,
    htmlContent,
  });
  if (!result.ok) logFailure("send notification email", result);
  return result;
}
