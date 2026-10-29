export type DietaryTag = 
  | 'Wood-Fired' 
  | 'Gluten-Free' 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Heritage Breed' 
  | 'Day-Boat Sustainable'
  | 'Chef Signature';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'pasta' | 'hearth' | 'tasting' | 'cellar' | 'desserts';
  price: number;
  description: string;
  ingredients: string[];
  producerNote?: string;
  winePairing?: string;
  dietary: DietaryTag[];
  imageUrl: string;
  isTakeawayAvailable: boolean;
  preparationTime?: string;
}

export interface DiningArea {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capacityText: string;
  recommendedFor: string;
  imageUrl?: string;
}

export interface Reservation {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  specialRequests?: string;
  occasion: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface TakeawayOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  pickupTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  createdAt: string;
}
