import React, { useState } from 'react';
import { Users, Calendar, Mail, Phone, CheckCircle, ArrowRight, Building2, Sparkles } from 'lucide-react';

export const PrivateDiningSection: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<'cellar' | 'glasshouse' | 'buyout'>('cellar');
  const [guests, setGuests] = useState(12);
  const [menuTier, setMenuTier] = useState<number>(125); // $125 or $165 or $220
  const [date, setDate] = useState(new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const spaces = {
    cellar: {
      title: 'Subterranean Wine Cellar',
      capacity: '6 to 14 Guests Seated',
      description: 'Candlelit vaulted cellar surrounded by our 2,400 bottle reserve with dedicated sommelier service and customized hearth menu.',
      baseMinSpend: 1500,
      image: '/src/assets/images/cellar_dining_room_1793281172685.jpg',
    },
    glasshouse: {
      title: 'Glasshouse Garden Terrace',
      capacity: '15 to 32 Guests Seated · 45 Standing',
      description: 'Lush botanical garden atrium with heated terracotta floors, ambient skylight, and private outdoor wood-oven display.',
      baseMinSpend: 3200,
      image: '/src/assets/images/hero_restaurant_hearth_1793281172409.jpg',
    },
    buyout: {
      title: 'Full Restaurant & Hearth Buyout',
      capacity: 'Up to 85 Guests Seated',
      description: 'Exclusive use of the entire facility including both dining rooms, live hearth line, full craft bar, and personalized culinary team.',
      baseMinSpend: 12000,
      image: '/src/assets/images/hero_restaurant_hearth_1793281172409.jpg',
    },
  };

  const currentSpace = spaces[selectedSpace];
  const estimatedFoodSpend = guests * menuTier;
  const estimatedTotal = Math.max(estimatedFoodSpend, currentSpace.baseMinSpend);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setInquirySent(true);
  };

  return (
    <section id="private-dining" className="py-20 bg-[#121110] border-b border-[#292623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#C27838]">
            Celebrations & Corporate Evenings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F4EF] [text-wrap:balance]">
            Private Dining & Hearth Buyouts
          </h2>
          <p className="text-sm sm:text-base text-[#A39E96]">
            From candlelit cellar dinners to full restaurant celebrations, our events director curates every detail of your evening.
          </p>
        </div>

        {/* Space Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(spaces) as Array<keyof typeof spaces>).map((key) => {
            const sp = spaces[key];
            const isSelected = selectedSpace === key;
            return (
              <div
                key={key}
                onClick={() => setSelectedSpace(key)}
                className={`p-6 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1E1C1A] border-[#C27838] shadow-lg'
                    : 'bg-[#141312] border-[#292623] hover:border-[#3B3733]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold text-[#F7F4EF]">{sp.title}</h3>
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#C27838]" />}
                </div>
                <div className="text-xs text-[#C27838] font-medium mt-1">{sp.capacity}</div>
                <p className="text-xs text-[#A39E96] mt-3 leading-relaxed">{sp.description}</p>
                <div className="mt-4 pt-3 border-t border-[#292623] text-[11px] text-[#736E67]">
                  Food & Beverage minimum from <span className="font-mono text-[#EBE7E1] font-medium">${sp.baseMinSpend.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Estimator & Inquiry Form */}
        <div className="bg-[#1A1816] border border-[#292623] rounded-xl p-6 sm:p-10 shadow-xl">
          {inquirySent ? (
            <div className="py-8 text-center max-w-lg mx-auto space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-full bg-[#C27838]/10 border border-[#C27838] flex items-center justify-center mx-auto text-[#C27838]">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#F7F4EF]">
                Inquiry Received
              </h3>
              <p className="text-sm text-[#A39E96] leading-relaxed">
                Thank you, <span className="text-[#EBE7E1] font-semibold">{contactName}</span>. Our Private Events Director, Claire Vance, will contact you at <span className="text-[#EBE7E1] font-semibold">{contactEmail}</span> within 24 hours with custom menu proposals and floorplans.
              </p>
              <button
                type="button"
                onClick={() => setInquirySent(false)}
                className="mt-4 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase border border-[#3B3733] hover:border-[#A39E96] text-[#EBE7E1] rounded-md transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left: Interactive Cost Breakdown */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#C27838]">Real-Time Event Estimate</span>
                  <h4 className="font-serif text-xl font-semibold text-[#F7F4EF]">
                    {currentSpace.title}
                  </h4>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Guest count slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[#EBE7E1]">
                      <span>Estimated Guests:</span>
                      <span className="font-mono font-bold text-[#C27838] text-sm tabular-nums">{guests} Guests</span>
                    </div>
                    <input
                      type="range"
                      min={selectedSpace === 'cellar' ? 6 : selectedSpace === 'glasshouse' ? 15 : 35}
                      max={selectedSpace === 'cellar' ? 14 : selectedSpace === 'glasshouse' ? 32 : 85}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full accent-[#C27838] bg-[#121110] cursor-pointer"
                    />
                  </div>

                  {/* Menu Tier Picker */}
                  <div className="space-y-1.5">
                    <label className="text-[#A39E96] block">Culinary Experience Tier:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setMenuTier(125)}
                        className={`p-2.5 rounded border text-center transition-all ${
                          menuTier === 125
                            ? 'bg-[#C27838] text-white border-[#C27838]'
                            : 'bg-[#121110] border-[#292623] text-[#A39E96]'
                        }`}
                      >
                        <div className="font-semibold text-xs">$125/pp</div>
                        <div className="text-[10px] mt-0.5">4-Course Hearth</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMenuTier(165)}
                        className={`p-2.5 rounded border text-center transition-all ${
                          menuTier === 165
                            ? 'bg-[#C27838] text-white border-[#C27838]'
                            : 'bg-[#121110] border-[#292623] text-[#A39E96]'
                        }`}
                      >
                        <div className="font-semibold text-xs">$165/pp</div>
                        <div className="text-[10px] mt-0.5">7 Fires Tasting</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMenuTier(220)}
                        className={`p-2.5 rounded border text-center transition-all ${
                          menuTier === 220
                            ? 'bg-[#C27838] text-white border-[#C27838]'
                            : 'bg-[#121110] border-[#292623] text-[#A39E96]'
                        }`}
                      >
                        <div className="font-semibold text-xs">$220/pp</div>
                        <div className="text-[10px] mt-0.5">Grand Gala & Wine</div>
                      </button>
                    </div>
                  </div>

                  {/* Cost Calculation Box */}
                  <div className="p-4 bg-[#141312] border border-[#292623] rounded-lg space-y-2">
                    <div className="flex justify-between text-[#A39E96]">
                      <span>{guests} Guests × ${menuTier} Menu:</span>
                      <span className="font-mono tabular-nums text-[#EBE7E1]">${(guests * menuTier).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#A39E96]">
                      <span>Space Minimum Spend:</span>
                      <span className="font-mono tabular-nums text-[#EBE7E1]">${currentSpace.baseMinSpend.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-[#292623] flex justify-between text-sm font-semibold text-[#EBE7E1]">
                      <span>Estimated Food & Beverage:</span>
                      <span className="font-mono text-base text-[#C27838] tabular-nums">${estimatedTotal.toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] text-[#736E67] pt-1">
                      * Exclusive of 20% hospitality gratuity and California sales tax.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#A39E96]">
                    Request Space Availability
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-[#A39E96]">Organizer Name *</label>
                      <input
                        type="text"
                        placeholder="Julian Vance"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                        className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A39E96]">Email Address *</label>
                      <input
                        type="email"
                        placeholder="julian@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A39E96]">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="(415) 555-0182"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A39E96]">Target Event Date *</label>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838] tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#A39E96]">Event Purpose & Special Details</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Executive dinner for 12 board members, require private audiovisual setup and customized printed menus."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#121110] border border-[#292623] rounded-md p-3 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C27838] hover:bg-[#A96327] text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Submit Private Event Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
