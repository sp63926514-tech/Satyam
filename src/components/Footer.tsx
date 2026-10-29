import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#0D0C0B] text-[#A39E96] border-t border-[#292623] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Accolades */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-3xl font-semibold tracking-tight text-[#EBE7E1] block">
              Aurelia
            </span>
            <p className="text-xs text-[#C27838] tracking-widest uppercase font-medium">
              Kitchen & Hearth · {RESTAURANT_INFO.michelinAccolade}
            </p>
            <p className="text-xs text-[#736E67] max-w-sm leading-relaxed">
              Rooted in the Historic Arts District of San Francisco. Dedicated to primal wood-fire gastronomy, coastal agriculture, natural cellar vintages, and generous hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <div className="font-semibold tracking-wider uppercase text-[#EBE7E1]">
              Explore
            </div>
            <ul className="space-y-2">
              <li><a href="#menu" className="hover:text-[#EBE7E1] transition-colors">Autumn Menu</a></li>
              <li><a href="#story" className="hover:text-[#EBE7E1] transition-colors">The Hearth Story</a></li>
              <li><a href="#cellar" className="hover:text-[#EBE7E1] transition-colors">Wine Cellar</a></li>
              <li><a href="#private-dining" className="hover:text-[#EBE7E1] transition-colors">Private Events</a></li>
              <li><a href="#reservations" className="hover:text-[#EBE7E1] transition-colors">Table Booking</a></li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <div className="font-semibold tracking-wider uppercase text-[#EBE7E1]">
              Hearth Hours
            </div>
            <div className="space-y-1 text-[#736E67]">
              <div>Tue – Thu: 5:00 PM – 10:30 PM</div>
              <div>Fri – Sat: 4:30 PM – 11:30 PM</div>
              <div>Sun: 11:00 AM – 9:30 PM</div>
              <div className="text-[#A39E96]">Mon: Closed for Fermentation</div>
            </div>
          </div>

          {/* Harvest Dispatch Newsletter */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <div className="font-semibold tracking-wider uppercase text-[#EBE7E1]">
              Seasonal Harvest Dispatch
            </div>
            <p className="text-xs text-[#736E67]">
              Receive monthly notices on rare wild mushroom harvests, library cellar releases, and guest chef hearth dinners.
            </p>
            {subscribed ? (
              <div className="p-2.5 bg-[#141312] border border-[#292623] rounded text-emerald-400 flex items-center gap-1.5 text-xs">
                <Check className="w-4 h-4" />
                <span>Thank you. You are on the dispatch list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#141312] border border-[#292623] rounded px-3 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#C27838] hover:bg-[#A96327] text-white rounded transition-colors"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E1C1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#736E67]">
          <div>
            © {new Date().getFullYear()} Aurelia Kitchen & Hearth, LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#A39E96] cursor-pointer">Privacy & Reservation Policies</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#A39E96] cursor-pointer">Accessibility</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#A39E96] cursor-pointer">Press & Media Kit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
