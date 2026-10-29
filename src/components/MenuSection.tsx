import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';
import { Search, Flame, Wine, Sparkles, Plus, Check, Info } from 'lucide-react';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
  onOpenReservation: () => void;
}

type CategoryFilter = 'all' | 'starters' | 'pasta' | 'hearth' | 'tasting' | 'cellar' | 'desserts';

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onAddToCart,
  onOpenReservation,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeDietary, setActiveDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedDishId, setAddedDishId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'starters', label: 'Starters & Crudo' },
    { id: 'pasta', label: 'Handcrafted Pasta' },
    { id: 'hearth', label: 'Wood-Fired Mains' },
    { id: 'tasting', label: 'Chef’s Tasting' },
    { id: 'cellar', label: 'Cellar & Cocktails' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const dietaryOptions = [
    { id: 'all', label: 'All Preferences' },
    { id: 'Chef Signature', label: 'Chef Signatures' },
    { id: 'Wood-Fired', label: 'Wood-Fired' },
    { id: 'Gluten-Free', label: 'Gluten-Free' },
    { id: 'Vegetarian', label: 'Vegetarian' },
  ];

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      // Dietary match
      if (activeDietary !== 'all' && !item.dietary.includes(activeDietary as any)) return false;
      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIng = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      return true;
    });
  }, [activeCategory, activeDietary, searchQuery]);

  const handleQuickAdd = (dish: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(dish);
    setAddedDishId(dish.id);
    setTimeout(() => setAddedDishId(null), 1800);
  };

  return (
    <section id="menu" className="py-20 bg-[#141312] border-b border-[#292623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#C27838]">
            Autumn 2026 Micro-Season
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F4EF] [text-wrap:balance]">
            Crafted by White Oak Embers
          </h2>
          <p className="text-sm sm:text-base text-[#A39E96] leading-relaxed">
            Our menu evolves with the harvest of our regional agricultural partners. Each cut, catch, and heritage vegetable is cooked over open California oak fire.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs (Segmented functional controls) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#1A1816] border border-[#292623] rounded-lg overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#C27838] text-white shadow-sm'
                    : 'text-[#A39E96] hover:text-[#EBE7E1] hover:bg-[#25221F]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Dietary & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
            {/* Dietary Sub-filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-medium text-[#736E67] uppercase tracking-wider whitespace-nowrap">
                Filter:
              </span>
              {dietaryOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveDietary(opt.id)}
                  className={`px-3 py-1.5 text-xs rounded transition-colors whitespace-nowrap shrink-0 ${
                    activeDietary === opt.id
                      ? 'bg-[#292623] text-[#EBE7E1] border border-[#736E67]'
                      : 'text-[#A39E96] hover:text-[#EBE7E1] border border-transparent'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736E67]" />
              <input
                type="text"
                placeholder="Search ingredients, cuts, wines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1816] border border-[#292623] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#EBE7E1] placeholder-[#736E67] focus:outline-none focus:border-[#C27838]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#736E67] hover:text-[#EBE7E1]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tasting Menu Highlight Banner (if category is all or tasting) */}
        {(activeCategory === 'all' || activeCategory === 'tasting') && (
          <div className="mb-12 bg-gradient-to-r from-[#1E1C1A] via-[#23201D] to-[#1E1C1A] border border-[#3B3733] rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-xl">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#C27838] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>The Hearth Experience · 7 Courses</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F4EF]">
                The Seven Fires Tasting Menu
              </h3>
              <p className="text-sm text-[#B5B0A6] leading-relaxed">
                An intimate culinary journey guided by live embers. Includes our 48h hearth sourdough, wild hamachi crudo, black truffle agnolotti, 45-day dry-aged ribeye, and hearth-charred Basque cheesecake.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="text-xl font-mono text-[#EBE7E1]">
                  $165 <span className="text-xs text-[#A39E96] font-sans">/ guest</span>
                </div>
                <div className="text-xs text-[#A39E96]">
                  Optional biodynamic cellar pairing: <span className="text-[#EBE7E1] font-mono">$110</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="px-5 py-2 text-xs font-semibold tracking-wider uppercase bg-[#C27838] hover:bg-[#A96327] text-white rounded-md transition-colors shadow-sm ml-auto"
                >
                  Reserve Tasting Seating
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dish Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#1A1816] rounded-lg border border-[#292623] space-y-3">
            <p className="text-base text-[#EBE7E1]">No dishes match your selected filter or search.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveDietary('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#C27838] underline hover:text-[#A96327]"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group bg-[#1A1816] border border-[#292623] hover:border-[#3B3733] rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Dish Image */}
                  <div className="relative h-52 sm:h-56 w-full bg-[#121110] overflow-hidden">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-transparent to-transparent opacity-80" />
                    
                    {/* Unboxed Metadata in quiet overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#EBE7E1]">
                      <div className="flex items-center gap-1.5 bg-[#141312]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#292623]/80 text-[#C27838]">
                        <span>{dish.dietary[0] || 'Seasonal'}</span>
                      </div>
                      {dish.category === 'hearth' && (
                        <div className="flex items-center gap-1 bg-[#141312]/80 backdrop-blur-sm px-2 py-1 rounded text-[#EBE7E1] font-mono text-[10px]">
                          <Flame className="w-3 h-3 text-[#C27838]" />
                          <span>Hearth</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {/* Unboxed inline metadata */}
                    <div className="flex items-center gap-1.5 text-xs text-[#A39E96]">
                      <span className="capitalize">{dish.category}</span>
                      <span aria-hidden="true" className="text-[#3B3733]">·</span>
                      <span>{dish.dietary.slice(0, 2).join(' · ')}</span>
                    </div>

                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#F7F4EF] group-hover:text-[#C27838] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      <span className="font-mono text-base font-semibold text-[#EBE7E1] tabular-nums shrink-0">
                        ${dish.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A39E96] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {dish.winePairing && (
                      <div className="pt-2 flex items-center gap-1.5 text-xs text-[#736E67] truncate">
                        <Wine className="w-3.5 h-3.5 text-[#C27838] shrink-0" />
                        <span className="truncate">Pairing: {dish.winePairing}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-[#292623] flex items-center justify-between gap-3 text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDish(dish);
                    }}
                    className="text-[#A39E96] hover:text-[#EBE7E1] transition-colors flex items-center gap-1 font-medium"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Story & Origin</span>
                  </button>

                  {dish.isTakeawayAvailable ? (
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(dish, e)}
                      className="px-3 py-1.5 bg-[#25221F] hover:bg-[#C27838] text-[#EBE7E1] hover:text-white rounded transition-colors flex items-center gap-1.5 font-medium whitespace-nowrap"
                    >
                      {addedDishId === dish.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add for Pickup</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#736E67] italic">Dine-in only</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dietary & Corkage Notice */}
        <div className="mt-14 pt-8 border-t border-[#292623] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#A39E96]">
          <div>
            <span className="font-semibold text-[#EBE7E1]">Allergy & Dietary Accommodations:</span>
            <span className="ml-2">Please notify our culinary team of any allergies upon booking. We gladly accommodate gluten-free and vegetarian diets.</span>
          </div>
          <div className="shrink-0 text-right">
            <span className="font-medium text-[#EBE7E1]">Corkage:</span> $45 / 750ml bottle (max 2 bottles)
          </div>
        </div>
      </div>
    </section>
  );
};
