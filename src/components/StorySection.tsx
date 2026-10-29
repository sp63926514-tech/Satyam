import React from 'react';
import { Flame, Sparkles, Sprout, Wheat, Quote } from 'lucide-react';
import { FARM_PARTNERS, TESTIMONIALS } from '../data/restaurantData';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#121110] border-b border-[#292623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C27838]">
              The Culinary Philosophy
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F4EF] leading-tight [text-wrap:balance]">
              Returning to the primal intimacy of live fire and soil.
            </h2>

            <div className="space-y-4 text-base text-[#B5B0A6] leading-relaxed">
              <p>
                Founded in the Historic Arts District, Aurelia was born from an obsession with the purest element of cooking: wood fire. We use no gas cooktops or modern electric steamers. Every sauce reduction, roasted marrow bone, hand-extruded pasta toss, and blistered crust is governed by the heat of white oak embers.
              </p>
              <p>
                Chef Marco Sterling collaborates directly with Northern California’s most dedicated family farms, micro-mills, and day-boat captains. Our menus are not planned months in advance—they are composed each morning based on what arrived from the tide and the soil.
              </p>
            </div>

            {/* Core Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#1A1816] border border-[#292623] rounded-lg space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-serif font-semibold text-[#EBE7E1]">
                  <Flame className="w-4 h-4 text-[#C27838]" />
                  100% White Oak Embers
                </div>
                <p className="text-xs text-[#A39E96]">
                  Slow-seasoned hardwood delivers clean radiant heat without pungent soot, creating a silky caramelization.
                </p>
              </div>

              <div className="p-4 bg-[#1A1816] border border-[#292623] rounded-lg space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-serif font-semibold text-[#EBE7E1]">
                  <Wheat className="w-4 h-4 text-[#C27838]" />
                  48-Hour Natural Levain
                </div>
                <p className="text-xs text-[#A39E96]">
                  Ancient grains milled fresh in Capay Valley, wild-fermented to yield digestible, deeply flavorful crumb.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Right */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-lg overflow-hidden border border-[#292623] bg-[#1A1816] shadow-xl">
              <img
                src="/src/assets/images/dish_wood_fired_ribeye_1793281171938.jpg"
                alt="Wood-fired dry-aged ribeye seared over white oak coals"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
              <div className="p-6 bg-[#1A1816] space-y-2">
                <div className="text-xs tracking-wider uppercase text-[#C27838] font-semibold">
                  Heritage Butchery
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#F7F4EF]">
                  In-House Whole Animal Aging Program
                </h3>
                <p className="text-xs text-[#A39E96] leading-relaxed">
                  Every primal cut is aged in our temperature-controlled Himalayan salt chamber for a minimum of 45 days, intensifying tenderness and nutty complexity before meeting the hearth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Partners Section */}
        <div className="space-y-8 pt-8 border-t border-[#292623]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-[#C27838]">
                Soil, Salt & Grain
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F4EF] mt-1">
                Our Dedicated Farm & Mill Partners
              </h3>
            </div>
            <p className="text-xs text-[#A39E96] max-w-md">
              True gastronomy begins with the health of the pasture and the ethics of the harvest. We honor these Northern California producers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FARM_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="p-5 bg-[#1A1816] border border-[#292623] rounded-lg space-y-2.5"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#C27838] font-medium">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>{partner.location}</span>
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#EBE7E1]">
                  {partner.name}
                </h4>
                <p className="text-xs text-[#A39E96] leading-relaxed">
                  {partner.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Acclaim & Testimonials */}
        <div className="pt-8 border-t border-[#292623] space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#C27838]">
              Critical Praise
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F4EF]">
              What the Critics Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#1A1816] border border-[#292623] rounded-lg flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-[#C27838] opacity-60" />
                  <p className="font-serif italic text-sm sm:text-base text-[#D4CFC7] leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="pt-3 border-t border-[#292623] text-xs">
                  <span className="font-semibold text-[#EBE7E1] block">{t.critic}</span>
                  <span className="text-[#A39E96]">{t.publication} · {t.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
