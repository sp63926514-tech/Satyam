import React, { useState } from 'react';
import { DINING_AREAS, RESTAURANT_INFO } from '../data/restaurantData';
import { saveReservation } from '../utils/reservationStorage';
import { Reservation } from '../types';
import { Calendar, Clock, Users, Flame, CheckCircle, Download, Sparkles, MapPin, AlertCircle } from 'lucide-react';

interface ReservationSectionProps {
  initialDate?: string;
  initialTime?: string;
  initialGuests?: number;
  onSuccessBooking?: (reservation: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  initialDate,
  initialTime,
  initialGuests,
  onSuccessBooking,
}) => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [date, setDate] = useState(initialDate || tomorrow);
  const [guests, setGuests] = useState(initialGuests || 2);
  const [time, setTime] = useState(initialTime || '7:00 PM');
  const [seatingArea, setSeatingArea] = useState('Main Hearth Dining Room');
  
  // Guest details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Dinner with Friends');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    { time: '5:00 PM', label: 'Early Hearth', status: 'Available' },
    { time: '5:30 PM', label: 'Early Hearth', status: 'Available' },
    { time: '6:15 PM', label: 'Prime Service', status: 'Few Left' },
    { time: '7:00 PM', label: 'Prime Service', status: 'Popular' },
    { time: '7:30 PM', label: 'Prime Service', status: 'Few Left' },
    { time: '8:15 PM', label: 'Evening Hearth', status: 'Available' },
    { time: '9:00 PM', label: 'Late Seating', status: 'Available' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const reservation = saveReservation({
        name,
        email,
        phone,
        date,
        time,
        guests,
        seatingArea,
        occasion,
        specialRequests,
      });

      setConfirmedReservation(reservation);
      setIsSubmitting(false);
      if (onSuccessBooking) {
        onSuccessBooking(reservation);
      }
    }, 600);
  };

  const handleDownloadIcs = () => {
    if (!confirmedReservation) return;
    const [month, day, year] = confirmedReservation.date.split('-');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aurelia Kitchen & Hearth//Table Reservation//EN
BEGIN:VEVENT
SUMMARY:Table Reservation at Aurelia Kitchen & Hearth (${confirmedReservation.code})
DESCRIPTION:Reservation for ${confirmedReservation.guests} guests at ${confirmedReservation.seatingArea}. Special notes: ${confirmedReservation.specialRequests || 'None'}. Phone: ${RESTAURANT_INFO.phone}.
LOCATION:${RESTAURANT_INFO.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `aurelia-reservation-${confirmedReservation.code}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reservations" className="py-20 bg-[#121110] border-b border-[#292623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#C27838]">
            Table Booking & Experiences
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F4EF] [text-wrap:balance]">
            Reserve Your Hearth Experience
          </h2>
          <p className="text-sm sm:text-base text-[#A39E96]">
            Reservations are released 30 days in advance at 9:00 AM PST. Walk-in seating is reserved nightly at the bar counter.
          </p>
        </div>

        {/* Confirmation Screen */}
        {confirmedReservation ? (
          <div className="max-w-2xl mx-auto bg-[#1A1816] border border-[#C27838]/60 rounded-xl p-8 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#C27838]/10 border border-[#C27838] flex items-center justify-center mx-auto text-[#C27838]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F4EF]">
                Table Confirmed
              </h3>
              <p className="text-xs text-[#A39E96]">
                A formal email confirmation and SMS reminder have been dispatched to {confirmedReservation.email}.
              </p>
            </div>

            {/* Reservation Summary Card */}
            <div className="bg-[#141312] border border-[#292623] rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#292623] pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Booking Reference</span>
                <span className="font-mono text-xl font-bold text-[#C27838]">{confirmedReservation.code}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-xs text-[#736E67] uppercase">Date & Time</span>
                  <span className="font-medium text-[#EBE7E1]">{confirmedReservation.date} at {confirmedReservation.time}</span>
                </div>
                <div>
                  <span className="block text-xs text-[#736E67] uppercase">Party Size</span>
                  <span className="font-medium text-[#EBE7E1]">{confirmedReservation.guests} Guests</span>
                </div>
                <div>
                  <span className="block text-xs text-[#736E67] uppercase">Seating Room</span>
                  <span className="font-medium text-[#EBE7E1]">{confirmedReservation.seatingArea}</span>
                </div>
                <div>
                  <span className="block text-xs text-[#736E67] uppercase">Guest Name</span>
                  <span className="font-medium text-[#EBE7E1]">{confirmedReservation.name}</span>
                </div>
              </div>

              {confirmedReservation.specialRequests && (
                <div className="pt-2 text-xs text-[#A39E96] border-t border-[#292623]">
                  <span className="text-[#EBE7E1] font-medium">Notes for Kitchen:</span> {confirmedReservation.specialRequests}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="flex-1 py-3 px-4 bg-[#C27838] hover:bg-[#A96327] text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="py-3 px-4 border border-[#292623] hover:border-[#3B3733] text-[#A39E96] hover:text-[#EBE7E1] text-xs font-medium tracking-wider uppercase rounded-md transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Dining Areas Guide */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-semibold tracking-wider uppercase text-[#A39E96] mb-2">
                1. Select Dining Atmosphere
              </div>

              {DINING_AREAS.map((area) => (
                <div
                  key={area.id}
                  onClick={() => setSeatingArea(area.name)}
                  className={`p-5 rounded-lg border transition-all cursor-pointer ${
                    seatingArea === area.name
                      ? 'bg-[#1E1C1A] border-[#C27838] shadow-md'
                      : 'bg-[#141312] border-[#292623] hover:border-[#3B3733]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-[#F7F4EF]">
                        {area.name}
                      </h4>
                      <p className="text-xs text-[#C27838] font-medium mt-0.5">
                        {area.tagline}
                      </p>
                    </div>
                    {seatingArea === area.name && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C27838] mt-1.5 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#A39E96] mt-2 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#736E67] pt-2 border-t border-[#292623]">
                    <span>{area.capacityText}</span>
                    <span>Best for: {area.recommendedFor}</span>
                  </div>
                </div>
              ))}

              {/* Policy note */}
              <div className="p-4 bg-[#1A1816] rounded-lg border border-[#292623] text-xs text-[#736E67] space-y-1">
                <div className="flex items-center gap-1.5 text-[#EBE7E1] font-medium">
                  <AlertCircle className="w-3.5 h-3.5 text-[#C27838]" />
                  <span>Cancellation Courtesy</span>
                </div>
                <p>
                  We prepare our charcoal, aged cuts, and pasta daily based on bookings. We kindly request 24 hours notice for party modifications or cancellations.
                </p>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7 bg-[#1A1816] border border-[#292623] rounded-xl p-6 sm:p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-xs font-semibold tracking-wider uppercase text-[#A39E96]">
                  2. Choose Date, Party & Time
                </div>

                {/* Date & Guests row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#EBE7E1] font-medium flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#C27838]" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2.5 text-sm text-[#EBE7E1] focus:outline-none focus:border-[#C27838] tabular-nums"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#EBE7E1] font-medium flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#C27838]" />
                      Party Size
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2.5 text-sm text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time Slots Selector */}
                <div className="space-y-2">
                  <label className="text-xs text-[#EBE7E1] font-medium flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#C27838]" />
                    Available Seating Times for {seatingArea}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setTime(slot.time)}
                        className={`p-2.5 rounded-md border text-center transition-all ${
                          time === slot.time
                            ? 'bg-[#C27838] text-white border-[#C27838] shadow-sm'
                            : 'bg-[#121110] border-[#292623] text-[#EBE7E1] hover:border-[#3B3733]'
                        }`}
                      >
                        <div className="font-semibold text-xs tabular-nums">{slot.time}</div>
                        <div className={`text-[10px] mt-0.5 ${time === slot.time ? 'text-white/80' : 'text-[#736E67]'}`}>
                          {slot.status}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Contact Information */}
                <div className="pt-4 border-t border-[#292623] space-y-4">
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#A39E96]">
                    3. Guest Contact & Preferences
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-[#A39E96]">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Julian Hayes"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A39E96]">Email Address *</label>
                      <input
                        type="email"
                        placeholder="julian@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A39E96]">Mobile Phone *</label>
                      <input
                        type="tel"
                        placeholder="(415) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-[#A39E96]">Occasion (Optional)</label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full bg-[#121110] border border-[#292623] rounded-md px-3.5 py-2 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                      >
                        <option value="Dinner with Friends">Dinner with Friends</option>
                        <option value="Anniversary">Anniversary Celebration</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Date Night">Date Night</option>
                        <option value="Business Dinner">Business Dinner</option>
                        <option value="Solo Dining">Solo Hearth Dining</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#A39E96]">
                      Dietary Restrictions or Special Seating Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 1 guest has a severe shellfish allergy; celebrating our 5th wedding anniversary."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-[#121110] border border-[#292623] rounded-md p-3 text-xs text-[#EBE7E1] focus:outline-none focus:border-[#C27838]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-[#C27838] hover:bg-[#A96327] disabled:opacity-50 text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Confirming Table...</span>
                    ) : (
                      <>
                        <Flame className="w-4 h-4" />
                        <span>Confirm Table Reservation · {guests} Guests at {time}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
