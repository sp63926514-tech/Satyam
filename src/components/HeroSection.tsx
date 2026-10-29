import React from 'react';
import { Calendar, Users, Clock, ArrowRight, Flame, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
  onQuickBook: (date: string, time: string, guests: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onExploreMenu,
  onQuickBook,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = React.useState('7:00 PM');
  const [guests, setGuests] = React.useState(2);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook(selectedDate, selectedTime, guests);
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden border-b border-[#292623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Eyebrow & Accolades */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-widest uppercase text-[#A39E96] mb-6">
          <span className="flex items-center gap-1.5 text-[#C27838] font-semibold">
            <Flame className="w-3.5 h-3.5" />
            Wood-Fired Hearth & Kitchen
          </span>
          <span aria-hidden="true" className="text-[#3B3733]">·</span>
          <span>Historic Arts District</span>
          <span aria-hidden="true" className="text-[#3B3733]">·</span>
          <span className="flex items-center gap-1 text-[#EBE7E1]">
            <Award className="w-3.5 h-3.5 text-[#C27838]" />
            {RESTAURANT_INFO.michelinAccolade}
          </span>
        </div>

        {/* 2-Column Split: Editorial Presentation Left + Dramatic Photography Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Story, Title, Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] font-semibold text-[#F7F4EF] tracking-tight [text-wrap:balance]">
                Elemental fire, seasonal earth, and the timeless ritual of the hearth.
              </h1>
              
              <p className="text-base sm:text-lg text-[#B5B0A6] leading-relaxed max-w-xl font-normal">
                At Aurelia, every dish is shaped by 100% seasoned white oak embers, 48-hour levain sourdough, and daily harvest from Northern California’s regenerative coastal growers and day-boat fishermen.
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenReservation}
                className="px-7 py-3.5 text-xs font-semibold tracking-wider uppercase bg-[#C27838] hover:bg-[#A96327] text-white rounded-md transition-all shadow-md active:scale-[0.98] flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Book Your Table</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                type="button"
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-xs font-medium tracking-wider uppercase border border-[#3B3733] hover:border-[#A39E96] text-[#EBE7E1] hover:bg-[#1E1C1A] rounded-md transition-all whitespace-nowrap"
              >
                Explore Autumn Menu
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-4 border-t border-[#292623] flex items-center justify-between text-xs text-[#A39E96]">
              <div>
                <span className="block font-medium text-[#EBE7E1]">Dinner Service</span>
                <span className="tabular-nums">Tue–Sun from 5:00 PM</span>
              </div>
              <div className="text-right">
                <span className="block font-medium text-[#EBE7E1]">Cellar Reserve</span>
                <span className="tabular-nums">2,400+ Natural Vintages</span>
              </div>
              <div className="hidden sm:block text-right">
                <span className="block font-medium text-[#EBE7E1]">Chef's Counter</span>
                <span>8 Exclusive Fire Seats</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[380px] sm:h-[460px] lg:h-full min-h-[380px] rounded-lg overflow-hidden border border-[#292623] bg-[#1E1C1A] shadow-xl">
              <img
                src="/src/assets/images/hero_restaurant_hearth_1793281172409.jpg"
                alt="Open wood-fired kitchen and ambient dining room at Aurelia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/90 via-[#121110]/20 to-transparent pointer-events-none" />

              {/* Caption pill replaced with quiet typographic bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#EBE7E1] bg-[#141312]/80 backdrop-blur-md px-4 py-3 rounded border border-[#292623]/80">
                <span className="font-serif italic text-sm">The Iron Hearth & Rotisserie</span>
                <span className="text-[#C27838] tracking-widest uppercase font-mono text-[11px]">White Oak Fired</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Quick Booking Strip */}
        <div className="mt-12 bg-[#1A1816] border border-[#292623] rounded-lg p-5 lg:p-6 shadow-lg">
          <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-[#A39E96] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C27838]" />
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#121110] border border-[#292623] rounded-md px-3 py-2 text-sm text-[#EBE7E1] focus:outline-none focus:border-[#C27838] tabular-nums"
                required
              />
            </div>

            {/* Guests */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-[#A39E96] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#C27838]" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#121110] border border-[#292623] rounded-md px-3 py-2 text-sm text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
              >
                <option value={1}>1 Guest (Bar or Hearth Counter)</option>
                <option value={2}>2 Guests (Table or Counter)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5 Guests</option>
                <option value={6}>6 Guests (Large Booth)</option>
                <option value={8}>8 Guests (Private Salon)</option>
                <option value={10}>10+ Guests (Wine Cellar)</option>
              </select>
            </div>

            {/* Preferred Time */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-[#A39E96] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C27838]" />
                Preferred Seating
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-[#121110] border border-[#292623] rounded-md px-3 py-2 text-sm text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
              >
                <option value="5:30 PM">5:30 PM (Early Hearth)</option>
                <option value="6:30 PM">6:30 PM (Prime Dinner)</option>
                <option value="7:00 PM">7:00 PM (Prime Dinner)</option>
                <option value="7:30 PM">7:30 PM (Prime Dinner)</option>
                <option value="8:15 PM">8:15 PM (Evening Hearth)</option>
                <option value="9:00 PM">9:00 PM (Late Seating)</option>
              </select>
            </div>

            {/* Find Table Action Button */}
            <div className="pt-2 sm:pt-6">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#C27838] hover:bg-[#A96327] text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-colors shadow-sm whitespace-nowrap"
              >
                Find Table
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
