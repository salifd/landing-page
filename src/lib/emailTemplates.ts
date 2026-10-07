/** HTML bodies of the internal waitlist notification emails. */

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c]!);

export function successEmail(userEmail: string): string {
  const safeEmail = escapeHtml(userEmail);
  return `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
    <h2 style="color: #1e40af; margin-bottom: 20px;">New Waitlist Subscription</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
      Great news! Someone just joined the Quikku waitlist.
    </p>
    <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #10b981;">
      <p style="margin: 0; font-weight: bold; color: #1e40af;">Subscriber Email:</p>
      <p style="margin: 5px 0 0 0; font-size: 18px; color: #059669;">${safeEmail}</p>
    </div>
    <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
      This is an automated notification from the Quikku landing page.
    </p>
  </div>
</body>
</html>`;
}

export function failureEmail(userEmail: string, errorDetails?: string): string {
  const safeEmail = escapeHtml(userEmail);
  const errorSection = errorDetails
    ? `<p style="margin: 15px 0 0 0; font-weight: bold; color: #1e40af;">Error Details:</p>
               <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">${escapeHtml(errorDetails)}</p>`
    : "";
  return `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
    <h2 style="color: #dc2626; margin-bottom: 20px;">Failed Waitlist Subscription</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
      A waitlist subscription attempt failed for the following email:
    </p>
    <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #ef4444;">
      <p style="margin: 0; font-weight: bold; color: #1e40af;">Email Address:</p>
      <p style="margin: 5px 0 15px 0; font-size: 18px; color: #dc2626;">${safeEmail}</p>
      ${errorSection}
    </div>
    <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
      This is an automated notification from the Quikku landing page.
    </p>
  </div>
</body>
</html>`;
}
