import { Reservation } from '../types';

const STORAGE_KEY = 'aurelia_restaurant_reservations';

export const getStoredReservations = (): Reservation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with a sample upcoming reservation so new users see how lookup works!
      const sample: Reservation = {
        id: 'res-sample-1',
        code: 'AUR-7842',
        name: 'Elena Rostova',
        email: 'elena.rostova@example.com',
        phone: '(415) 555-0198',
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        time: '7:30 PM',
        guests: 2,
        seatingArea: "Chef's Hearth Counter",
        specialRequests: "Anniversary celebration. Would love sommelier pairing recommendations.",
        occasion: 'Anniversary',
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([sample]));
      return [sample];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveReservation = (reservationData: Omit<Reservation, 'id' | 'code' | 'createdAt' | 'status'>): Reservation => {
  const code = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
  const newReservation: Reservation = {
    ...reservationData,
    id: `res-${Date.now()}`,
    code,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };

  const current = getStoredReservations();
  const updated = [newReservation, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newReservation;
};

export const findReservationByCode = (code: string): Reservation | undefined => {
  const list = getStoredReservations();
  return list.find(r => r.code.toUpperCase() === code.trim().toUpperCase());
};

export const cancelReservation = (code: string): boolean => {
  const list = getStoredReservations();
  const index = list.findIndex(r => r.code.toUpperCase() === code.trim().toUpperCase());
  if (index === -1) return false;
  list[index].status = 'cancelled';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return true;
};
