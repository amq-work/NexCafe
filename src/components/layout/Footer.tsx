import { Link } from 'react-router-dom';
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
              Aayan Qureshi has made this project for my personal portfolio projects showcase.
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
        </div>
      </div>
    </footer>
  );
}
