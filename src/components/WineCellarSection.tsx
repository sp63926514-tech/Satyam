import React, { useState } from 'react';
import { Wine, Sparkles, ChevronRight, GlassWater } from 'lucide-react';

interface WineCellarSectionProps {
  onOpenReservation: () => void;
}

export const WineCellarSection: React.FC<WineCellarSectionProps> = ({
  onOpenReservation,
}) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'by-the-glass' | 'cocktails'>('flights');

  const flights = [
    {
      title: 'California Micro-Terroir Flight',
      price: 55,
      description: 'Three 3oz pours celebrating fog-cooled ridges: Anderson Valley Pinot Noir, Santa Cruz Mountain Chardonnay, and Dry Creek Zinfandel.',
      pairings: 'Best paired with our Truffle Agnolotti and Roasted Cauliflower.',
    },
    {
      title: 'Piedmont & Nebbiolo Retrospective',
      price: 85,
      description: 'Comparative study of three Barolo and Barbaresco vintages (2015, 2018, 2021) showing structural evolution and aromatic cedar.',
      pairings: 'Engineered specifically for our 45-Day Dry-Aged Ribeye.',
    },
    {
      title: 'Natural & Skin-Contact Curiosities',
      price: 48,
      description: 'Unfiltered, low-intervention pet-nats and amber macerated whites from Georgia, Friuli, and Mendocino.',
      pairings: 'Pairs with our Wild Hamachi Crudo and Smoked Burrata.',
    },
  ];

  const byTheGlass = [
    { name: '2023 Domaine Sigalas Assyrtiko', region: 'Santorini, Greece', glass: 22, bottle: 86, notes: 'Crisp flint, crushed sea salt, crystalline lemon zest' },
    { name: '2021 Raúl Pérez Ultreia Godello', region: 'Bierzo, Spain', glass: 19, bottle: 74, notes: 'White orchard fruit, mountain thyme, wet slate minerality' },
    { name: '2020 Fontodi Chianti Classico', region: 'Tuscany, Italy', glass: 24, bottle: 94, notes: 'Wild cherry, dried rosemary, leather, fine-grained tannins' },
    { name: '2019 Produttori del Barbaresco', region: 'Piedmont, Italy', glass: 32, bottle: 125, notes: 'Rose petal, crushed cranberry, tar, iron, immense length' },
    { name: '2018 Ridge Vineyards Estate Cabernet', region: 'Santa Cruz Mountains', glass: 38, bottle: 150, notes: 'Cassis, forest loam, pencil cedar, structured power' },
  ];

  const cocktails = [
    { name: 'White Oak Smoked Old Fashioned', price: 21, ingredients: 'Roasted pecan infused bourbon, black walnut bitters, white oak hearth smoke' },
    { name: 'Charred Rosemary Paloma', price: 19, ingredients: 'Siete Leguas Blanco Tequila, hearth-charred ruby red grapefruit, smoked sea salt rim' },
    { name: 'Ember Negroni', price: 20, ingredients: 'St. George Terroir Gin, Campari, Cocchi Vermouth di Torino, cedar ash rinse' },
    { name: 'Quince & Orchard Highball', price: 18, ingredients: 'Mars Iwai Japanese Whisky, fermented quince shrub, sparkling soda, lemon peel' },
  ];

  return (
    <section id="cellar" className="py-20 bg-[#141312] border-b border-[#292623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cellar Feature Banner with Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-[#292623] shadow-xl h-[360px] sm:h-[420px] bg-[#1E1C1A]">
            <img
              src="/src/assets/images/cellar_dining_room_1793281172685.jpg"
              alt="Subterranean Wine Cellar dining table and bottle collection at Aurelia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#141312]/80 backdrop-blur-md rounded border border-[#292623] flex items-center justify-between text-xs text-[#EBE7E1]">
              <span className="font-serif italic text-sm">Vaulted Subterranean Cellar & Tasting Salon</span>
              <span className="text-[#C27838] font-mono">2,400+ Curated Bottles</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C27838]">
              The Cellar Program
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#F7F4EF] [text-wrap:balance]">
              Living wines shaped by geological soul and honest hands.
            </h2>
            <p className="text-sm sm:text-base text-[#A39E96] leading-relaxed">
              Curated by Beverage Director Marcel Vane, our subterranean cellar champions biodynamic viticulture, regenerative growers, and old-world cellar rarities that complement wood smoke and rich fats.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenReservation}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase bg-[#C27838] hover:bg-[#A96327] text-white rounded-md transition-colors shadow-sm"
              >
                Reserve Cellar Private Dining
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Cellar Preview Tabs */}
        <div className="bg-[#1A1816] border border-[#292623] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#292623] pb-4">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#F7F4EF]">
              Sommelier Selections & Libations
            </h3>

            {/* Segmented Tab Controls */}
            <div className="flex items-center gap-1 p-1 bg-[#121110] border border-[#292623] rounded-md">
              <button
                type="button"
                onClick={() => setActiveTab('flights')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeTab === 'flights' ? 'bg-[#C27838] text-white' : 'text-[#A39E96] hover:text-[#EBE7E1]'
                }`}
              >
                Tasting Flights
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('by-the-glass')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeTab === 'by-the-glass' ? 'bg-[#C27838] text-white' : 'text-[#A39E96] hover:text-[#EBE7E1]'
                }`}
              >
                By The Glass
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cocktails')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeTab === 'cocktails' ? 'bg-[#C27838] text-white' : 'text-[#A39E96] hover:text-[#EBE7E1]'
                }`}
              >
                Hearth Cocktails
              </button>
            </div>
          </div>

          {/* Flights View */}
          {activeTab === 'flights' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {flights.map((f, i) => (
                <div key={i} className="p-5 bg-[#141312] border border-[#292623] rounded-lg space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-semibold text-[#F7F4EF]">{f.title}</span>
                      <span className="font-mono text-base font-bold text-[#C27838] tabular-nums">${f.price}</span>
                    </div>
                    <p className="text-xs text-[#A39E96] leading-relaxed">{f.description}</p>
                  </div>
                  <div className="pt-2 border-t border-[#292623] text-[11px] text-[#736E67] italic">
                    {f.pairings}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* By the Glass View */}
          {activeTab === 'by-the-glass' && (
            <div className="space-y-3 pt-2">
              {byTheGlass.map((wine, i) => (
                <div key={i} className="p-4 bg-[#141312] border border-[#292623] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-serif text-sm font-semibold text-[#F7F4EF]">{wine.name}</div>
                    <div className="text-xs text-[#C27838] mt-0.5">{wine.region} · <span className="text-[#A39E96] italic font-sans">{wine.notes}</span></div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-[#EBE7E1] shrink-0">
                    <div>Glass: <span className="text-[#C27838] font-bold">${wine.glass}</span></div>
                    <div>Bottle: <span className="text-[#EBE7E1]">${wine.bottle}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cocktails View */}
          {activeTab === 'cocktails' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {cocktails.map((c, i) => (
                <div key={i} className="p-4 bg-[#141312] border border-[#292623] rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base font-semibold text-[#F7F4EF]">{c.name}</span>
                    <span className="font-mono text-sm font-bold text-[#C27838] tabular-nums">${c.price}</span>
                  </div>
                  <p className="text-xs text-[#A39E96]">{c.ingredients}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
