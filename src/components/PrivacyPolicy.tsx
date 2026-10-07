import React from "react";
import LegalPage, { type LegalSection } from "./legal/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          Quikku Pte. Ltd. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          Please read this policy carefully to understand our practices regarding your personal data.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <p>We may collect the following types of information:</p>

        <h3>2.1 Personal Information</h3>
        <ul>
          <li>Email address (when you join our waitlist)</li>
          <li>Name (if provided)</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <ul>
          <li>IP address and location data</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Pages visited and time spent on our website</li>
          <li>Referring website addresses</li>
          <li>Cookie data</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Manage our waitlist and notify you about our launch</li>
          <li>Send you updates, newsletters, and marketing communications</li>
          <li>Improve our website and services</li>
          <li>Analyze usage patterns and trends</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Comply with legal obligations</li>
          <li>Prevent fraud and enhance security</li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-basis-for-processing",
    title: "Legal Basis for Processing",
    body: (
      <>
        <p>We process your personal data based on:</p>
        <ul>
          <li>
            <strong>Consent:</strong> You have given explicit consent for us to process your data for specific purposes
          </li>
          <li>
            <strong>Legitimate Interests:</strong> Processing is necessary for our legitimate business interests
          </li>
          <li>
            <strong>Legal Obligation:</strong> Processing is required to comply with applicable laws
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "information-sharing-and-disclosure",
    title: "Information Sharing and Disclosure",
    body: (
      <>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share your information with:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and services
            (e.g., email service providers, analytics services)
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law, court order, or government regulation
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
          </li>
          <li>
            <strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies-and-tracking-technologies",
    title: "Cookies and Tracking Technologies",
    body: (
      <>
        <p>
          We use cookies and similar tracking technologies to enhance your experience. Cookies are small data files
          stored on your device. You can control cookie settings through your browser preferences, but disabling cookies
          may limit certain features of our website.
        </p>
        <p>Types of cookies we use:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for the website to function properly
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how visitors use our website
          </li>
          <li>
            <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    body: (
      <>
        <p>
          We implement appropriate technical and organizational security measures to protect your personal information
          against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
          the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: (
      <>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
          Privacy Policy, unless a longer retention period is required or permitted by law. Waitlist data will be
          retained until you request removal or until our service launches.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: (
      <>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>
            <strong>Access:</strong> Request a copy of the personal data we hold about you
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate or incomplete data
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal data
          </li>
          <li>
            <strong>Portability:</strong> Request transfer of your data to another service
          </li>
          <li>
            <strong>Objection:</strong> Object to certain processing activities
          </li>
          <li>
            <strong>Withdrawal of Consent:</strong> Withdraw consent at any time
          </li>
          <li>
            <strong>Opt-out:</strong> Unsubscribe from marketing communications
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:privacy@quikkupay.com">privacy@quikkupay.com</a>
        </p>
      </>
    ),
  },
  {
    id: "international-data-transfers",
    title: "International Data Transfers",
    body: (
      <>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. These
          countries may have different data protection laws. We ensure appropriate safeguards are in place to protect
          your personal data in accordance with this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "children-s-privacy",
    title: "Children's Privacy",
    body: (
      <>
        <p>
          Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
          information from children. If you believe we have collected information from a child, please contact us
          immediately, and we will take steps to delete such information.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    body: (
      <>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or
          content of these external sites. We encourage you to review the privacy policies of any third-party sites you
          visit.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-this-privacy-policy",
    title: "Changes to This Privacy Policy",
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
          We will notify you of any material changes by updating the "Last updated" date at the top of this page. We
          encourage you to review this policy periodically.
        </p>
      </>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please
          contact us at:
        </p>
        <p>
          Email: <a href="mailto:privacy@quikkupay.com">privacy@quikkupay.com</a>
        </p>
        <p>
          For data protection inquiries: <a href="mailto:dpo@quikkupay.com">dpo@quikkupay.com</a>
        </p>
      </>
    ),
  },
];

const PrivacyPolicy: React.FC = () => (
  <LegalPage title="Privacy Policy" updated="December 7, 2025" current="privacy" sections={SECTIONS} />
);

export default PrivacyPolicy;
