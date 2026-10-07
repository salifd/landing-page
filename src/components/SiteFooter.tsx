import React from "react";
import Link from "next/link";
import { Logo } from "./brand";

const columnHeading = "text-[13px] font-semibold uppercase leading-[normal] tracking-[0.1em] text-sky";
const footerLink =
  "w-fit bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-base leading-[normal] text-white transition-[color,background-size] duration-300 ease-out hover:bg-[length:100%_1px] hover:text-sky focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/60";

const SiteFooter: React.FC = () => (
  <footer className="w-full bg-midnight pb-10 pt-16 md:pb-12 md:pt-[72px]">
    <div className="page-container flex flex-col gap-12 text-white">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div className="flex max-w-[360px] flex-col gap-4">
          <Logo />
          <p className="text-base leading-[1.5]">Pay Southeast Asia&apos;s QR codes with your international card.</p>
        </div>

        <div className="flex flex-wrap gap-12 whitespace-nowrap md:gap-24">
          <nav aria-label="Legal" className="flex flex-col gap-3.5">
            <p className={columnHeading}>Legal</p>
            <Link href="/privacy" className={footerLink}>
              Privacy
            </Link>
            <Link href="/terms" className={footerLink}>
              Terms
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2 border-t border-white pt-6 text-sm leading-[normal] md:flex-row">
        <p>© {new Date().getFullYear()} Quikku Pte. Ltd. · Singapore</p>
        <p>Visa and Mastercard are trademarks of their respective owners. Photos: Pexels.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
