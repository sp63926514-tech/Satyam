import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { CartItem, TakeawayOrder } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface TakeawayCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
}

export const TakeawayCartDrawer: React.FC<TakeawayCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [pickupTime, setPickupTime] = useState('Today at 6:30 PM');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  
  const [orderConfirmed, setOrderConfirmed] = useState<TakeawayOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const packagingFee = subtotal > 0 ? Number((subtotal * 0.03).toFixed(2)) : 0;
  const tax = subtotal > 0 ? Number((subtotal * 0.08625).toFixed(2)) : 0;
  const total = Number((subtotal + packagingFee + tax).toFixed(2));

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || items.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order: TakeawayOrder = {
        orderId: `FEAST-${Math.floor(10000 + Math.random() * 90000)}`,
        items: [...items],
        subtotal,
        tax,
        serviceFee: packagingFee,
        total,
        pickupTime,
        customerName,
        customerPhone,
        customerEmail,
        createdAt: new Date().toISOString(),
      };
      setOrderConfirmed(order);
      setIsSubmitting(false);
      onClearCart();
    }, 700);
  };

  const handleReset = () => {
    setOrderConfirmed(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#1A1816] border-l border-[#292623] h-full flex flex-col justify-between shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#292623] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C27838]" />
            <h3 id="cart-title" className="font-serif text-lg font-semibold text-[#F7F4EF]">
              Hearth Feast Pickup
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#A39E96] hover:text-[#EBE7E1] rounded-full hover:bg-[#121110] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {orderConfirmed ? (
            /* Order Confirmed View */
            <div className="py-6 space-y-6 text-center animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-[#C27838]/10 border border-[#C27838] flex items-center justify-center mx-auto text-[#C27838]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#A39E96]">Order Confirmed</span>
                <h4 className="font-serif text-2xl font-semibold text-[#F7F4EF]">
                  Ready for Hearth Pickup
                </h4>
                <p className="font-mono text-xl font-bold text-[#C27838] pt-1">
                  #{orderConfirmed.orderId}
                </p>
              </div>

              <div className="p-4 bg-[#141312] border border-[#292623] rounded-lg text-left text-xs space-y-3">
                <div className="flex justify-between text-[#EBE7E1]">
                  <span>Scheduled Pickup:</span>
                  <span className="font-semibold text-[#C27838]">{orderConfirmed.pickupTime}</span>
                </div>
                <div className="flex justify-between text-[#EBE7E1]">
                  <span>Guest:</span>
                  <span>{orderConfirmed.customerName} ({orderConfirmed.customerPhone})</span>
                </div>
                <div className="flex justify-between text-[#EBE7E1]">
                  <span>Pickup Location:</span>
                  <span className="text-right">482 Millwright Way, Host Stand</span>
                </div>
                <div className="border-t border-[#292623] pt-2 flex justify-between font-semibold text-[#EBE7E1]">
                  <span>Total Paid at Counter:</span>
                  <span className="font-mono tabular-nums">${orderConfirmed.total}</span>
                </div>
              </div>

              <p className="text-xs text-[#736E67] leading-relaxed">
                Your order is being prepared with compostable thermal packaging to preserve crust and fire-kissed aromatics.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 bg-[#C27838] hover:bg-[#A96327] text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-colors"
              >
                Done
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#3B3733] mx-auto" />
              <p className="text-base text-[#EBE7E1] font-medium">Your pickup bag is empty</p>
              <p className="text-xs text-[#736E67] max-w-xs mx-auto">
                Select items from our seasonal menu to order sourdough, pastas, or hearth mains for takeaway.
              </p>
            </div>
          ) : (
            /* Active Items List */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#A39E96]">
                <span>{items.reduce((s, i) => s + i.quantity, 0)} Items Selected</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-[#736E67] hover:text-red-400 transition-colors"
                >
                  Clear Bag
                </button>
              </div>

              {items.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="p-3.5 bg-[#141312] border border-[#292623] rounded-lg flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-sm font-semibold text-[#F7F4EF] truncate">
                      {cartItem.item.name}
                    </h5>
                    <div className="text-xs text-[#C27838] font-mono tabular-nums mt-0.5">
                      ${cartItem.item.price} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#1E1C1A] border border-[#292623] rounded p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                      className="p-1 text-[#A39E96] hover:text-[#EBE7E1] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#EBE7E1] px-1 tabular-nums">
                      {cartItem.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                      className="p-1 text-[#A39E96] hover:text-[#EBE7E1] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(cartItem.item.id)}
                    className="p-1.5 text-[#736E67] hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Pickup Time Selection */}
              <div className="pt-2 space-y-1.5">
                <label className="text-xs text-[#A39E96] font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C27838]" />
                  Desired Pickup Time
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-[#141312] border border-[#292623] rounded-md px-3 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                >
                  <option value="Today at 5:45 PM">Today at 5:45 PM</option>
                  <option value="Today at 6:30 PM">Today at 6:30 PM (Recommended)</option>
                  <option value="Today at 7:15 PM">Today at 7:15 PM</option>
                  <option value="Today at 8:00 PM">Today at 8:00 PM</option>
                  <option value="Tomorrow at 6:00 PM">Tomorrow at 6:00 PM</option>
                </select>
              </div>

              {/* Guest Information */}
              <form id="pickup-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                <div className="text-[11px] font-semibold tracking-wider uppercase text-[#736E67]">
                  Contact for Pickup Notification
                </div>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full bg-[#141312] border border-[#292623] rounded-md px-3 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                />
                <input
                  type="tel"
                  placeholder="Mobile Phone (for pickup SMS) *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  className="w-full bg-[#141312] border border-[#292623] rounded-md px-3 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                />
                <input
                  type="email"
                  placeholder="Email for Digital Receipt (optional)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#141312] border border-[#292623] rounded-md px-3 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                />
              </form>
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {!orderConfirmed && items.length > 0 && (
          <div className="p-5 border-t border-[#292623] bg-[#141312] space-y-4">
            <div className="space-y-1.5 text-xs text-[#A39E96]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono text-[#EBE7E1] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Compostable Packaging (3%)</span>
                <span className="font-mono tabular-nums">${packagingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#292623] text-sm font-semibold text-[#EBE7E1]">
                <span>Total Due at Pickup</span>
                <span className="font-mono text-[#C27838] text-base tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="pickup-form"
              disabled={isSubmitting || !customerName || !customerPhone}
              className="w-full py-3.5 bg-[#C27838] hover:bg-[#A96327] disabled:opacity-50 text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Transmitting Order...</span>
              ) : (
                <>
                  <span>Schedule Pickup Order (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
