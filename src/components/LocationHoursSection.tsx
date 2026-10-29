import React, { useState } from 'react';
import { MapPin, Clock, Car, Phone, Mail, Navigation, Check, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_HOURS } from '../data/restaurantData';

export const LocationHoursSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compute live open status
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentDecHour = hours + minutes / 60;

  let isOpenNow = false;
  let statusText = 'Closed right now · Opens at 5:00 PM for dinner';

  if (day === 1) {
    statusText = 'Closed on Mondays for butchery & levain fermentation';
  } else if (day >= 2 && day <= 4) {
    // Tue-Thu: 5:00 PM - 10:30 PM (17:00 - 22.5)
    if (currentDecHour >= 17 && currentDecHour < 22.5) {
      isOpenNow = true;
      statusText = 'Open now · Dinner service until 10:30 PM';
    } else if (currentDecHour < 17) {
      statusText = 'Opens today at 5:00 PM for Hearth Dinner';
    }
  } else if (day === 5 || day === 6) {
    // Fri-Sat: 4:30 PM - 11:30 PM (16.5 - 23.5)
    if (currentDecHour >= 16.5 && currentDecHour < 23.5) {
      isOpenNow = true;
      statusText = 'Open now · Dinner & Late Hearth until 11:30 PM';
    } else if (currentDecHour < 16.5) {
      statusText = 'Opens today at 4:30 PM';
    }
  } else if (day === 0) {
    // Sunday: 11:00 AM - 2:30 PM (11 - 14.5) & 5:00 PM - 9:30 PM (17 - 21.5)
    if ((currentDecHour >= 11 && currentDecHour < 14.5) || (currentDecHour >= 17 && currentDecHour < 21.5)) {
      isOpenNow = true;
      statusText = 'Open now · Sunday Hearth service';
    } else if (currentDecHour < 11) {
      statusText = 'Opens today at 11:00 AM for Hearth Brunch';
    } else if (currentDecHour >= 14.5 && currentDecHour < 17) {
      statusText = 'Midday break · Evening service begins at 5:00 PM';
    }
  }

  return (
    <section id="visit" className="py-20 bg-[#141312] border-b border-[#292623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#C27838]">
            Plan Your Visit
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F4EF] [text-wrap:balance]">
            Hours, Location & Arrival
          </h2>
          <p className="text-sm sm:text-base text-[#A39E96]">
            Nestled in the Historic Arts District, steps from converted warehouse galleries and the bay shoreline.
          </p>
        </div>

        {/* Live Service Status Callout */}
        <div className="max-w-2xl mx-auto p-4 bg-[#1A1816] border border-[#292623] rounded-lg flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${isOpenNow ? 'bg-emerald-400' : 'bg-amber-500'}`} />
            <div>
              <span className="font-semibold text-[#EBE7E1] mr-2">
                {isOpenNow ? 'Service Active' : 'Hearth Status'}:
              </span>
              <span className="text-[#A39E96]">{statusText}</span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#736E67] hidden sm:inline">PST Time</span>
        </div>

        {/* 2-Column Grid: Hours & Practical Details Left, Stylized Map & Arrival Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Hours table & Contact */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#1A1816] border border-[#292623] rounded-xl p-6 sm:p-8 space-y-6 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-serif font-semibold text-[#F7F4EF]">
                <Clock className="w-4 h-4 text-[#C27838]" />
                <span>Weekly Hearth Service Schedule</span>
              </div>

              <div className="divide-y divide-[#292623]">
                {RESTAURANT_HOURS.map((h, i) => (
                  <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div>
                      <span className="font-medium text-[#EBE7E1]">{h.days}</span>
                      <span className="block text-[11px] text-[#736E67]">{h.service}</span>
                    </div>
                    <span className="font-mono text-[#C27838] tabular-nums font-medium sm:text-right">
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#292623] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#736E67] block uppercase text-[10px]">Host Stand & Bookings</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#EBE7E1] hover:text-[#C27838] font-mono text-sm">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[#736E67] block uppercase text-[10px]">Direct Inquiry</span>
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-[#EBE7E1] hover:text-[#C27838] font-mono">
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Etiquette & Valet Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#1A1816] border border-[#292623] rounded-lg space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#EBE7E1]">
                  <Car className="w-3.5 h-3.5 text-[#C27838]" />
                  Valet & Parking
                </div>
                <p className="text-[#A39E96] leading-relaxed">
                  {RESTAURANT_INFO.valet}
                </p>
              </div>

              <div className="p-4 bg-[#1A1816] border border-[#292623] rounded-lg space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#EBE7E1]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C27838]" />
                  Atmosphere & Attire
                </div>
                <p className="text-[#A39E96] leading-relaxed">
                  {RESTAURANT_INFO.dressCode}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Address & Map Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#1A1816] border border-[#292623] rounded-xl overflow-hidden shadow-lg">
              {/* Stylized Dark Mode Map Canvas */}
              <div className="relative h-64 sm:h-72 bg-[#100F0E] p-6 flex flex-col justify-between overflow-hidden border-b border-[#292623]">
                {/* Decorative architectural grid lines */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(#C27838 1px, transparent 1px), radial-gradient(#3B3733 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    backgroundPosition: '0 0, 12px 12px'
                  }}
                />
                
                {/* Stylized Street Line Art */}
                <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,80 Q200,120 400,90 T800,140" stroke="#C27838" strokeWidth="2" fill="none" />
                  <path d="M120,0 L160,300" stroke="#736E67" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                  <path d="M340,0 L320,300" stroke="#736E67" strokeWidth="1.5" fill="none" />
                  <path d="M0,180 L800,180" stroke="#736E67" strokeWidth="1" fill="none" />
                </svg>

                {/* Pin Center Marker */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="p-3 bg-[#C27838] text-white rounded-full shadow-2xl border-2 border-[#121110] animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="mt-3 bg-[#121110]/95 backdrop-blur-md px-4 py-2 rounded-lg border border-[#292623] text-center shadow-lg">
                    <div className="font-serif font-bold text-sm text-[#F7F4EF]">Aurelia Kitchen & Hearth</div>
                    <div className="text-[11px] text-[#C27838]">482 Millwright Way · Arts District</div>
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-center text-[11px] text-[#736E67] bg-[#121110]/80 backdrop-blur-sm px-3 py-1.5 rounded">
                  <span>Historic Arts District · San Francisco</span>
                  <span>Transit: 4th & King (3 min walk)</span>
                </div>
              </div>

              {/* Address details & quick actions */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#C27838]">Physical Address</span>
                  <div className="text-sm font-medium text-[#EBE7E1]">{RESTAURANT_INFO.address}</div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="px-4 py-2 bg-[#25221F] hover:bg-[#332F2B] text-xs font-medium text-[#EBE7E1] rounded-md transition-colors flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://maps.google.com/?q=Historic+Arts+District+San+Francisco+CA"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#C27838] hover:bg-[#A96327] text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-colors flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
