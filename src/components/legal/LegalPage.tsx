import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { delay } from "../motion";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import HeroBackdrop from "../HeroBackdrop";
import LegalToc, { type TocItem } from "./LegalToc";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

type Props = {
  title: string;
  updated: string;
  current: "privacy" | "terms";
  sections: LegalSection[];
};

const DOCS = [
  { key: "privacy", label: "Privacy Policy", href: "/privacy" },
  { key: "terms", label: "Terms of Use", href: "/terms" },
] as const;

const LegalPage: React.FC<Props> = ({ title, updated, current, sections }) => {
  const toc: TocItem[] = sections.map((s, i) => ({ id: s.id, number: i + 1, title: s.title }));

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />

      <main>
        {/* Title band */}
        <section
          data-hero
          className="relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+2.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+4rem)]"
        >
          <HeroBackdrop />

          <div id="main-content" className="page-container relative flex flex-col items-start gap-6">
            <h1
              data-reveal="up"
              style={delay(90)}
              className="font-display text-[clamp(2.75rem,7vw,5rem)] font-bold leading-none tracking-[-0.03em] text-white"
            >
              {title}
            </h1>
            <div data-reveal="up" style={delay(180)} className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-sky px-4 py-2 text-sm font-semibold leading-[normal] text-sky">
                Last updated {updated}
              </span>
              <span className="text-sm leading-[normal] text-white">Quikku Pte. Ltd. · Singapore</span>
            </div>

            {/* Switch between the two legal documents */}
            <nav
              aria-label="Legal documents"
              data-reveal="up"
              style={delay(270)}
              className="mt-4 inline-flex rounded-full bg-midnight/70 p-1.5"
            >
              {DOCS.map((doc) => {
                const isCurrent = doc.key === current;
                return (
                  <Link
                    key={doc.key}
                    href={doc.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`rounded-full px-5 py-2.5 font-display text-sm font-semibold leading-[normal] transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60 ${
                      isCurrent ? "bg-sky text-deep-blue" : "text-white hover:text-sky"
                    }`}
                  >
                    {doc.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Document */}
        <div className="page-container grid gap-10 py-12 md:py-20 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {/* Collapsible on small screens, always open from lg up */}
            <details className="group rounded-2xl bg-white/70 p-2 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2 font-display text-sm font-semibold text-deep-blue [&::-webkit-details-marker]:hidden">
                On this page
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <div className="pt-2">
                <LegalToc items={toc} />
              </div>
            </details>
            <div className="hidden lg:block">
              <p className="mb-3 px-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-coral">On this page</p>
              <LegalToc items={toc} />
            </div>
          </aside>

          <article className="legal-prose max-w-[760px]">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2>
                  <span className="legal-number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="sr-only">{i + 1}. </span>
                  {section.title}
                </h2>
                {section.body}
              </section>
            ))}
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default LegalPage;
