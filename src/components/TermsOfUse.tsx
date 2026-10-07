import React from "react";
import LegalPage, { type LegalSection } from "./legal/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    body: (
      <>
        <p>
          By accessing and using Quikku Pte. Ltd.'s website and services, you acknowledge that you have read,
          understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use
          our services.
        </p>
      </>
    ),
  },
  {
    id: "waitlist-registration",
    title: "Waitlist Registration",
    body: (
      <>
        <p>By joining our waitlist, you agree to:</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Receive email communications from Quikku regarding our launch and updates</li>
          <li>Understand that waitlist registration does not guarantee access to our services</li>
          <li>Maintain the confidentiality of any early access or beta information shared with you</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <>
        <p>
          All content, features, and functionality on this website, including but not limited to text, graphics, logos,
          images, and software, are the exclusive property of Quikku and are protected by international copyright,
          trademark, and other intellectual property laws.
        </p>
      </>
    ),
  },
  {
    id: "user-conduct",
    title: "User Conduct",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for any unlawful purpose or in violation of these Terms</li>
          <li>Attempt to gain unauthorized access to our systems or networks</li>
          <li>Interfere with or disrupt the website or servers</li>
          <li>Transmit any viruses, malware, or other harmful code</li>
          <li>Engage in any form of automated data collection or scraping</li>
        </ul>
      </>
    ),
  },
  {
    id: "service-availability",
    title: "Service Availability",
    body: (
      <>
        <p>
          Quikku is currently in development. We reserve the right to modify, suspend, or discontinue any aspect of the
          website or services at any time without notice. We do not guarantee that the website will be available at all
          times or that it will be free from errors or interruptions.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    body: (
      <>
        <p>
          The website and services are provided "as is" and "as available" without warranties of any kind, either
          express or implied, including but not limited to implied warranties of merchantability, fitness for a
          particular purpose, or non-infringement.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, Quikku shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
          indirectly, or any loss of data, use, goodwill, or other intangible losses.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms",
    body: (
      <>
        <p>
          We reserve the right to modify these Terms of Use at any time. We will notify users of any material changes by
          updating the "Last updated" date at the top of this page. Your continued use of the website after any such
          changes constitutes your acceptance of the new Terms.
        </p>
      </>
    ),
  },
  {
    id: "contact-information",
    title: "Contact Information",
    body: (
      <>
        <p>If you have any questions about these Terms of Use, please contact us at:</p>
        <p>
          Email: <a href="mailto:legal@quikkupay.com">legal@quikkupay.com</a>
        </p>
      </>
    ),
  },
];

const TermsOfUse: React.FC = () => (
  <LegalPage title="Terms of Use" updated="December 7, 2025" current="terms" sections={SECTIONS} />
);

export default TermsOfUse;
