import React from 'react';
import { X, Flame, Wine, Clock, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [added, setAdded] = React.useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#1A1816] border border-[#292623] rounded-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#121110]/80 hover:bg-[#121110] text-[#EBE7E1] rounded-full border border-[#292623] transition-colors"
          aria-label="Close dish modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Dish Image */}
          <div className="relative h-64 sm:h-72 w-full bg-[#141312] overflow-hidden">
            <img
              src={dish.imageUrl}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-transparent to-black/30 pointer-events-none" />
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Unboxed Metadata Header */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#C27838] tracking-widest uppercase font-medium">
                {dish.dietary.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {idx < dish.dietary.length - 1 && <span aria-hidden="true" className="text-[#3B3733]">·</span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex items-baseline justify-between gap-4">
                <h2 id="dish-modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F4EF]">
                  {dish.name}
                </h2>
                <span className="font-mono text-xl sm:text-2xl font-medium text-[#EBE7E1] tabular-nums shrink-0">
                  ${dish.price}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-[#D4CFC7] leading-relaxed">
              {dish.description}
            </p>

            {/* Ingredients & Provenance */}
            <div className="space-y-4 pt-4 border-t border-[#292623]">
              <div>
                <h3 className="text-xs font-semibold tracking-wider uppercase text-[#A39E96] mb-2">
                  Composition & Ingredients
                </h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#EBE7E1]">
                  {dish.ingredients.map((ing, i) => (
                    <span key={ing} className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C27838]" />
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {dish.producerNote && (
                <div className="bg-[#141312] p-4 rounded border border-[#292623] space-y-1">
                  <div className="text-[11px] font-semibold tracking-wider uppercase text-[#C27838]">
                    Farm & Purveyor Origin
                  </div>
                  <p className="text-xs sm:text-sm text-[#B5B0A6]">
                    {dish.producerNote}
                  </p>
                </div>
              )}

              {dish.winePairing && (
                <div className="flex items-start gap-3 p-4 bg-[#141312] rounded border border-[#292623]">
                  <Wine className="w-5 h-5 text-[#C27838] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-[#A39E96]">
                      Sommelier Cellar Pairing
                    </div>
                    <div className="text-sm font-medium text-[#EBE7E1] mt-0.5">
                      {dish.winePairing}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preparation time & Takeaway Order */}
            <div className="pt-4 border-t border-[#292623] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#A39E96]">
                <Clock className="w-4 h-4 text-[#C27838]" />
                <span>Prep: {dish.preparationTime || 'A la minute'}</span>
              </div>

              {dish.isTakeawayAvailable ? (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#C27838] hover:bg-[#A96327] text-white rounded-md transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Pickup Bag (${dish.price})</span>
                    </>
                  )}
                </button>
              ) : (
                <span className="text-xs text-[#A39E96] italic">
                  Dine-in exclusive dish (served fresh from the hearth)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
