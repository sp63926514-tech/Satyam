import React, { useState } from 'react';
import { ShoppingBag, Search, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
  onOpenLookup: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenCart,
  onOpenLookup,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#121110]/95 backdrop-blur-md border-b border-[#292623] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#hero"
              className="font-serif text-2xl md:text-3xl font-semibold tracking-wide text-[#EBE7E1] hover:text-[#C27838] transition-colors whitespace-nowrap shrink-0"
            >
              Aurelia
            </a>

            {/* Zone 2: 4-5 concise single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wider uppercase text-[#A39E96]">
              <a
                href="#menu"
                className="hover:text-[#EBE7E1] transition-colors hover:underline underline-offset-8 decoration-[#C27838] whitespace-nowrap shrink-0"
              >
                Seasonal Menu
              </a>
              <a
                href="#story"
                className="hover:text-[#EBE7E1] transition-colors hover:underline underline-offset-8 decoration-[#C27838] whitespace-nowrap shrink-0"
              >
                The Hearth
              </a>
              <a
                href="#cellar"
                className="hover:text-[#EBE7E1] transition-colors hover:underline underline-offset-8 decoration-[#C27838] whitespace-nowrap shrink-0"
              >
                Wine Cellar
              </a>
              <a
                href="#private-dining"
                className="hover:text-[#EBE7E1] transition-colors hover:underline underline-offset-8 decoration-[#C27838] whitespace-nowrap shrink-0"
              >
                Private Dining
              </a>
              <a
                href="#visit"
                className="hover:text-[#EBE7E1] transition-colors hover:underline underline-offset-8 decoration-[#C27838] whitespace-nowrap shrink-0"
              >
                Hours & Location
              </a>
            </nav>

            {/* Zone 3: 1 primary action button + auxiliary quick access */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenLookup}
                title="Lookup Existing Reservation"
                className="p-2 text-[#A39E96] hover:text-[#EBE7E1] hover:bg-[#1E1C1A] rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">My Booking</span>
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                title="Takeaway Cart"
                className="relative p-2 text-[#A39E96] hover:text-[#EBE7E1] hover:bg-[#1E1C1A] rounded-lg transition-colors"
                aria-label="View pickup order bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C27838] text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenReservation}
                className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#C27838] hover:bg-[#A96327] text-white rounded-md transition-all duration-150 shadow-sm active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                Reserve Table
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#A39E96] hover:text-[#EBE7E1] lg:hidden rounded-lg focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#292623] bg-[#141312] px-6 py-5 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm font-medium tracking-wider uppercase text-[#A39E96]">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#EBE7E1] py-1 border-b border-[#1E1C1A]"
              >
                Seasonal Menu
              </a>
              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#EBE7E1] py-1 border-b border-[#1E1C1A]"
              >
                The Hearth & Story
              </a>
              <a
                href="#cellar"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#EBE7E1] py-1 border-b border-[#1E1C1A]"
              >
                Wine Cellar
              </a>
              <a
                href="#private-dining"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#EBE7E1] py-1 border-b border-[#1E1C1A]"
              >
                Private Dining
              </a>
              <a
                href="#visit"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#EBE7E1] py-1 border-b border-[#1E1C1A]"
              >
                Hours & Location
              </a>
            </nav>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 text-xs font-semibold tracking-wider uppercase bg-[#C27838] text-white rounded-md text-center"
              >
                Reserve Table
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLookup();
                }}
                className="w-full py-2.5 text-xs font-medium text-[#A39E96] hover:text-[#EBE7E1] border border-[#292623] rounded-md text-center"
              >
                Find Existing Reservation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
