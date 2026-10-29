import React, { useState } from 'react';
import { X, Search, Calendar, Users, Clock, AlertTriangle, CheckCircle, Ban } from 'lucide-react';
import { findReservationByCode, cancelReservation, getStoredReservations } from '../utils/reservationStorage';
import { Reservation } from '../types';

interface ReservationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationLookupModal: React.FC<ReservationLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [code, setCode] = useState('');
  const [searchResult, setSearchResult] = useState<Reservation | null>(null);
  const [searched, setSearched] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [recentList, setRecentList] = useState<Reservation[]>([]);

  React.useEffect(() => {
    if (isOpen) {
      setRecentList(getStoredReservations());
      setSearchResult(null);
      setSearched(false);
      setCancelSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const res = findReservationByCode(code);
    setSearchResult(res || null);
    setSearched(true);
    setCancelSuccess(false);
  };

  const handleCancelBooking = (bookingCode: string) => {
    const ok = window.confirm('Are you sure you wish to cancel this reservation? We release the table immediately to the waitlist.');
    if (ok) {
      cancelReservation(bookingCode);
      setCancelSuccess(true);
      setRecentList(getStoredReservations());
      if (searchResult && searchResult.code === bookingCode) {
        setSearchResult({ ...searchResult, status: 'cancelled' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#1A1816] border border-[#292623] rounded-lg p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#A39E96] hover:text-[#EBE7E1] rounded-full hover:bg-[#121110] transition-colors"
          aria-label="Close lookup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C27838]">
            Reservation Concierge
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#F7F4EF]">
            Lookup or Modify Booking
          </h3>
          <p className="text-xs text-[#A39E96]">
            Enter your 6-character booking code (e.g. <span className="font-mono text-[#EBE7E1]">AUR-7842</span>) to view table details or adjust your party.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#736E67]" />
            <input
              type="text"
              placeholder="e.g. AUR-7842"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full bg-[#121110] border border-[#292623] rounded-md pl-9 pr-3 py-2 text-xs text-[#EBE7E1] uppercase font-mono tracking-wider focus:outline-none focus:border-[#C27838]"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#C27838] hover:bg-[#A96327] text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-colors whitespace-nowrap"
          >
            Find Table
          </button>
        </form>

        {/* Result Area */}
        {searched && searchResult && (
          <div className="p-5 bg-[#141312] border border-[#292623] rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#292623] pb-3">
              <div>
                <span className="text-xs text-[#736E67] uppercase">Booking Code</span>
                <div className="font-mono text-lg font-bold text-[#C27838]">{searchResult.code}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#736E67] uppercase">Status</span>
                <div className="text-xs font-semibold uppercase">
                  {searchResult.status === 'confirmed' ? (
                    <span className="text-emerald-400 flex items-center gap-1 justify-end">
                      <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1 justify-end">
                      <Ban className="w-3.5 h-3.5" /> Cancelled
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#736E67] block">Guest Name</span>
                <span className="font-medium text-[#EBE7E1]">{searchResult.name}</span>
              </div>
              <div>
                <span className="text-[#736E67] block">Party Size</span>
                <span className="font-medium text-[#EBE7E1]">{searchResult.guests} Guests</span>
              </div>
              <div>
                <span className="text-[#736E67] block">Date & Time</span>
                <span className="font-medium text-[#EBE7E1]">{searchResult.date} at {searchResult.time}</span>
              </div>
              <div>
                <span className="text-[#736E67] block">Seating Area</span>
                <span className="font-medium text-[#EBE7E1]">{searchResult.seatingArea}</span>
              </div>
            </div>

            {searchResult.specialRequests && (
              <div className="text-xs text-[#A39E96] pt-2 border-t border-[#292623]">
                <span className="text-[#EBE7E1]">Special Notes:</span> {searchResult.specialRequests}
              </div>
            )}

            {searchResult.status === 'confirmed' && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleCancelBooking(searchResult.code)}
                  className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 border border-red-900/50 hover:border-red-500 rounded transition-colors"
                >
                  Cancel this Reservation
                </button>
              </div>
            )}
          </div>
        )}

        {searched && !searchResult && (
          <div className="p-4 bg-[#141312] border border-[#292623] rounded-lg text-center text-xs text-[#A39E96]">
            No booking found matching code <span className="font-mono text-[#EBE7E1]">{code}</span>. Please verify your confirmation email or speak with our host at (415) 890-4420.
          </div>
        )}

        {/* Stored Recent Bookings in Browser */}
        {recentList.length > 0 && !searchResult && (
          <div className="space-y-3 pt-2 border-t border-[#292623]">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#736E67]">
              Stored Bookings on This Device
            </div>
            <div className="space-y-2">
              {recentList.map((res) => (
                <div
                  key={res.id}
                  onClick={() => {
                    setCode(res.code);
                    setSearchResult(res);
                    setSearched(true);
                  }}
                  className="p-3 bg-[#141312] border border-[#292623] hover:border-[#3B3733] rounded-md flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div>
                    <span className="font-mono font-bold text-[#C27838] mr-2">{res.code}</span>
                    <span className="text-[#EBE7E1]">{res.date} ({res.time})</span>
                    <span className="text-[#736E67] ml-2">· {res.guests} Guests</span>
                  </div>
                  <span className={`text-[11px] uppercase font-medium ${res.status === 'confirmed' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
