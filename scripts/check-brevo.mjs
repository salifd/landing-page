// Checks the Brevo setup used by the waitlist API, from the container's environment.
//
//   docker compose exec web node scripts/check-brevo.mjs              key, contact list and sender
//   docker compose exec web node scripts/check-brevo.mjs --send-test  also send a test alert to EMAIL_TO
//
// Run it on the production server: Brevo's IP allow-list applies per machine.

const env = process.env;
const apiUrl = (env.BREVO_API_URL || "https://api.brevo.com/v3").replace(/\/+$/, "");
const apiKey = (env.BREVO_API_KEY || "").trim();
let failed = false;

const report = (ok, label, detail = "") => {
  failed ||= !ok;
  console.log(`${ok ? "  OK    " : "  FAIL  "}${label}${detail ? `\n        ${detail.replaceAll("\n", "\n        ")}` : ""}`);
};

async function call(method, path, payload) {
  try {
    const res = await fetch(apiUrl + path, {
      method,
      headers: { Accept: "application/json", "Content-Type": "application/json", "api-key": apiKey },
      body: payload ? JSON.stringify(payload) : undefined,
      signal: AbortSignal.timeout(10_000),
    });
    const text = await res.text();
    let body = null;
    try { body = text ? JSON.parse(text) : null; } catch { /* not JSON */ }
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    return { ok: false, status: 0, body: null, error: err.message };
  }
}

function explain(r) {
  if (r.error) return `Could not reach Brevo: ${r.error}`;
  const msg = r.body?.message ?? "";
  const detail = `HTTP ${r.status} ${r.body?.code ?? ""}: ${msg}`;
  if (r.status === 401 && /ip address/i.test(msg))
    return `${detail}\nHint: add this server's IP under Brevo > Security > Authorised IPs (https://app.brevo.com/security/authorised_ips).`;
  if (r.status === 401)
    return `${detail}\nHint: BREVO_API_KEY is invalid or revoked. Use an API key (xkeysib-...), not an SMTP key (xsmtpsib-...).`;
  if (r.status === 404) return `${detail}\nHint: check BREVO_LIST_ID matches an existing contact list.`;
  return detail;
}

console.log("Brevo configuration check\n");

const missing = ["BREVO_API_KEY", "BREVO_LIST_ID", "EMAIL_FROM", "EMAIL_FROM_NAME", "EMAIL_TO", "EMAIL_TO_NAME"].filter((n) => !env[n]?.trim());
if (missing.length) {
  report(false, "Environment", `Missing: ${missing.join(", ")}. Fill them in .env and restart: docker compose up -d`);
  process.exit(1);
}
if (apiKey.startsWith("xsmtpsib-")) {
  report(false, "BREVO_API_KEY", "This is an SMTP key (xsmtpsib-...). Create an API key (xkeysib-...) under Brevo > SMTP & API > API Keys.");
  process.exit(1);
}
report(true, "Environment loaded", `API key ends in …${apiKey.slice(-4)}`);

const account = await call("GET", "/account");
report(account.ok, "API key accepted", account.ok ? `Account: ${account.body?.email ?? "unknown"}` : explain(account));
if (!account.ok) process.exit(1);

const list = await call("GET", `/contacts/lists/${env.BREVO_LIST_ID}`);
report(list.ok, `Contact list #${env.BREVO_LIST_ID} exists`,
  list.ok ? `Name: ${list.body?.name ?? "?"}, contacts: ${list.body?.uniqueSubscribers ?? list.body?.totalSubscribers ?? "?"}` : explain(list));

const from = env.EMAIL_FROM.trim();
const senders = await call("GET", "/senders");
if (senders.ok) {
  const match = (senders.body?.senders ?? []).find((s) => s.email?.toLowerCase() === from.toLowerCase());
  report(Boolean(match?.active), `Sender ${from} is verified`,
    !match ? `Not in your Brevo senders. Add it (or authenticate the domain ${from.split("@")[1]}) under Senders, domains & dedicated IPs.`
      : match.active ? "" : "The sender exists but is not active yet: confirm it from the email Brevo sent.");
} else {
  report(false, "Read senders", explain(senders));
}

if (process.argv.includes("--send-test")) {
  const sent = await call("POST", "/smtp/email", {
    sender: { name: env.EMAIL_FROM_NAME, email: from },
    to: [{ email: env.EMAIL_TO.trim(), name: env.EMAIL_TO_NAME }],
    subject: "Test notification - Quikku waitlist",
    htmlContent: "<p>This is a test from <code>scripts/check-brevo.mjs --send-test</code>. Waitlist notifications are working.</p>",
  });
  report(sent.ok, `Test email sent to ${env.EMAIL_TO.trim()}`, sent.ok ? `Message id: ${sent.body?.messageId ?? "?"}` : explain(sent));
}

console.log(failed ? "\nSome checks failed. Fix the items above and run this again." : "\nAll good.");
process.exit(failed ? 1 : 0);
