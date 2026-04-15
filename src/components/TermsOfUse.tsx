import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TermsOfUse: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Use - Quikku</title>
        <meta
          name="description"
          content="Read Quikku's Terms of Use. Learn about our waitlist registration, user responsibilities, and service terms for innovative travel payment solutions."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.quikkupay.com/terms" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.quikkupay.com/terms" />
        <meta property="og:title" content="Terms of Use - Quikku" />
        <meta property="og:description" content="Read Quikku's Terms of Use. Learn about our waitlist registration, user responsibilities, and service terms for innovative travel payment solutions." />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://www.quikkupay.com/terms" />
        <meta property="twitter:title" content="Terms of Use - Quikku" />
        <meta property="twitter:description" content="Read Quikku's Terms of Use. Learn about our waitlist registration, user responsibilities, and service terms for innovative travel payment solutions." />
      </Helmet>

      <div className="min-h-screen bg-[#000d2e]">
        {/* Header */}
        <header className="w-full bg-[#000d2e]/80 backdrop-blur-md border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/"
              className="text-white/50 hover:text-secondary transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="w-full py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-white mb-4">
              Terms of Use
            </h1>
            <p className="text-white/40 mb-8">Last updated: December 7, 2025</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-white/65 mb-4">
                  By accessing and using Quikku's website and services, you
                  acknowledge that you have read, understood, and agree to be
                  bound by these Terms of Use. If you do not agree to these
                  terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  2. Waitlist Registration
                </h2>
                <p className="text-white/65 mb-4">
                  By joining our waitlist, you agree to:
                </p>
                <ul className="list-disc pl-6 text-white/65 mb-4 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>
                    Receive email communications from Quikku regarding our
                    launch and updates
                  </li>
                  <li>
                    Understand that waitlist registration does not guarantee
                    access to our services
                  </li>
                  <li>
                    Maintain the confidentiality of any early access or beta
                    information shared with you
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  3. Intellectual Property
                </h2>
                <p className="text-white/65 mb-4">
                  All content, features, and functionality on this website,
                  including but not limited to text, graphics, logos, images,
                  and software, are the exclusive property of Quikku and are
                  protected by international copyright, trademark, and other
                  intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  4. User Conduct
                </h2>
                <p className="text-white/65 mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-white/65 mb-4 space-y-2">
                  <li>
                    Use the website for any unlawful purpose or in violation of
                    these Terms
                  </li>
                  <li>
                    Attempt to gain unauthorized access to our systems or
                    networks
                  </li>
                  <li>Interfere with or disrupt the website or servers</li>
                  <li>Transmit any viruses, malware, or other harmful code</li>
                  <li>
                    Engage in any form of automated data collection or scraping
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  5. Service Availability
                </h2>
                <p className="text-white/65 mb-4">
                  Quikku is currently in development. We reserve the right to
                  modify, suspend, or discontinue any aspect of the website or
                  services at any time without notice. We do not guarantee that
                  the website will be available at all times or that it will be
                  free from errors or interruptions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  6. Disclaimer of Warranties
                </h2>
                <p className="text-white/65 mb-4">
                  The website and services are provided "as is" and "as
                  available" without warranties of any kind, either express or
                  implied, including but not limited to implied warranties of
                  merchantability, fitness for a particular purpose, or
                  non-infringement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-white/65 mb-4">
                  To the fullest extent permitted by law, Quikku shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, or any loss of profits or revenues,
                  whether incurred directly or indirectly, or any loss of data,
                  use, goodwill, or other intangible losses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  8. Changes to Terms
                </h2>
                <p className="text-white/65 mb-4">
                  We reserve the right to modify these Terms of Use at any time.
                  We will notify users of any material changes by updating the
                  "Last updated" date at the top of this page. Your continued
                  use of the website after any such changes constitutes your
                  acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  9. Contact Information
                </h2>
                <p className="text-white/65 mb-4">
                  If you have any questions about these Terms of Use, please
                  contact us at:
                </p>
                <p className="text-white/65">Email: legal@quikkupay.com</p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsOfUse;
