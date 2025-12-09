import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Quikku</title>
        <meta
          name="description"
          content="Quikku's Privacy Policy. Learn how we collect, use, and protect your personal information. Your privacy is our priority."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.quikkupay.com/privacy" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="w-full bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/"
              className="text-primary hover:text-accent-dark transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="w-full py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 mb-8">Last updated: December 7, 2025</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-700 mb-4">
                  Quikku ("we," "our," or "us") is committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our
                  website and use our services. Please read this policy
                  carefully to understand our practices regarding your personal
                  data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-gray-700 mb-4">
                  We may collect the following types of information:
                </p>

                <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
                  2.1 Personal Information
                </h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                  <li>Email address (when you join our waitlist)</li>
                  <li>Name (if provided)</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
                  2.2 Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                  <li>Cookie data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                  <li>Manage our waitlist and notify you about our launch</li>
                  <li>
                    Send you updates, newsletters, and marketing communications
                  </li>
                  <li>Improve our website and services</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>
                    Respond to your inquiries and provide customer support
                  </li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  4. Legal Basis for Processing
                </h2>
                <p className="text-gray-700 mb-4">
                  We process your personal data based on:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                  <li>
                    <strong>Consent:</strong> You have given explicit consent
                    for us to process your data for specific purposes
                  </li>
                  <li>
                    <strong>Legitimate Interests:</strong> Processing is
                    necessary for our legitimate business interests
                  </li>
                  <li>
                    <strong>Legal Obligation:</strong> Processing is required to
                    comply with applicable laws
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  5. Information Sharing and Disclosure
                </h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> Third-party vendors who
                    assist us in operating our website and services (e.g., email
                    service providers, analytics services)
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law,
                    court order, or government regulation
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a
                    merger, acquisition, or sale of assets
                  </li>
                  <li>
                    <strong>Protection of Rights:</strong> To protect our
                    rights, privacy, safety, or property
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  6. Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to enhance
                  your experience. Cookies are small data files stored on your
                  device. You can control cookie settings through your browser
                  preferences, but disabling cookies may limit certain features
                  of our website.
                </p>
                <p className="text-gray-700 mb-4">Types of cookies we use:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                  <li>
                    <strong>Essential Cookies:</strong> Required for the website
                    to function properly
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how
                    visitors use our website
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Used to deliver relevant
                    advertisements
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  7. Data Security
                </h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  8. Data Retention
                </h2>
                <p className="text-gray-700 mb-4">
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law. Waitlist data will be retained until you
                  request removal or until our service launches.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  9. Your Rights
                </h2>
                <p className="text-gray-700 mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal data
                    we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of
                    inaccurate or incomplete data
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    data
                  </li>
                  <li>
                    <strong>Portability:</strong> Request transfer of your data
                    to another service
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to certain processing
                    activities
                  </li>
                  <li>
                    <strong>Withdrawal of Consent:</strong> Withdraw consent at
                    any time
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing
                    communications
                  </li>
                </ul>
                <p className="text-gray-700 mb-4">
                  To exercise any of these rights, please contact us at
                  privacy@quikkupay.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  10. International Data Transfers
                </h2>
                <p className="text-gray-700 mb-4">
                  Your information may be transferred to and processed in
                  countries other than your country of residence. These
                  countries may have different data protection laws. We ensure
                  appropriate safeguards are in place to protect your personal
                  data in accordance with this Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  11. Children's Privacy
                </h2>
                <p className="text-gray-700 mb-4">
                  Our services are not directed to individuals under the age of
                  18. We do not knowingly collect personal information from
                  children. If you believe we have collected information from a
                  child, please contact us immediately, and we will take steps
                  to delete such information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  12. Third-Party Links
                </h2>
                <p className="text-gray-700 mb-4">
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of these
                  external sites. We encourage you to review the privacy
                  policies of any third-party sites you visit.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  13. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will notify
                  you of any material changes by updating the "Last updated"
                  date at the top of this page. We encourage you to review this
                  policy periodically.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  14. Contact Us
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please contact us
                  at:
                </p>
                <p className="text-gray-700 mb-2">
                  Email: privacy@quikkupay.com
                </p>
                <p className="text-gray-700">
                  For data protection inquiries: dpo@quikkupay.com
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
