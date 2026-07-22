import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { RESTAURANT } from '../../lib/data';

export function Footer() {
  return (
    <footer className="bg-[#131B10] text-[#DFE7CF] border-t border-[#DFE7CF]/10">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-serif text-3xl font-semibold text-[#DCFFE5]">
              {RESTAURANT.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#DFE7CF]/70">
              {RESTAURANT.tagline} Seasonal menus, warm rooms, and a reservation
              that takes under a minute.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#DCFFE5]">
              Portfolio Project
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#DFE7CF]/70">
              This is a digital platform designed and developed as a project of the Digital Nexes Portfolio.
            </p>
            <p className="mt-3">
              <a
                href="/NexCafe_Restaurant_Platform_Case_Study.pdf"
                download="NexCafe_Restaurant_Platform_Case_Study.pdf"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#AAD08D] hover:text-[#DCFFE5] transition-colors border-b border-[#AAD08D]/40 pb-0.5"
              >
                View Case Study
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#DCFFE5]">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#DFE7CF]/80">
              <li>
                <a
                  href="/#menu"
                  className="transition-colors hover:text-[#DCFFE5] font-medium"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="/#specials"
                  className="transition-colors hover:text-[#DCFFE5] font-medium"
                >
                  Chef's specials
                </a>
              </li>
              <li>
                <Link
                  to="/reserve"
                  className="transition-colors hover:text-[#DCFFE5] font-medium"
                >
                  Reserve
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#DFE7CF]/10 pt-8 sm:flex-row">
          <p className="text-xs text-[#DFE7CF]/50">
            © {new Date().getFullYear()} {RESTAURANT.name}. All rights
            reserved.
          </p>
          <a
            href="https://digitalnexes.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DFE7CF]/20 text-[#DFE7CF]/70 transition-colors hover:border-[#DCFFE5] hover:text-[#DCFFE5] hover:bg-[#DCFFE5]/10"
          >
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
