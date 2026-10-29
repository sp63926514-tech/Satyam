/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { ReservationSection } from './components/ReservationSection';
import { ReservationLookupModal } from './components/ReservationLookupModal';
import { TakeawayCartDrawer } from './components/TakeawayCartDrawer';
import { StorySection } from './components/StorySection';
import { WineCellarSection } from './components/WineCellarSection';
import { PrivateDiningSection } from './components/PrivateDiningSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { MenuItem, CartItem, Reservation } from './types';

const CART_STORAGE_KEY = 'aurelia_restaurant_cart';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  // Quick reservation prefill states
  const [quickDate, setQuickDate] = useState<string>('');
  const [quickTime, setQuickTime] = useState<string>('');
  const [quickGuests, setQuickGuests] = useState<number>(2);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  const handleAddToCart = (dish: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.item.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => {
          if (i.item.id === dishId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCartItems((prev) => prev.filter((i) => i.item.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickBook = (date: string, time: string, guests: number) => {
    setQuickDate(date);
    setQuickTime(time);
    setQuickGuests(guests);
    scrollToReservation();
  };

  const cartTotalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#121110] text-[#EBE7E1]">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenReservation={scrollToReservation}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLookup={() => setIsLookupOpen(true)}
        cartCount={cartTotalCount}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenReservation={scrollToReservation}
          onExploreMenu={scrollToMenu}
          onQuickBook={handleQuickBook}
        />

        {/* Seasonal Menu Section */}
        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onAddToCart={handleAddToCart}
          onOpenReservation={scrollToReservation}
        />

        {/* The Hearth Story & Farm Partners */}
        <StorySection />

        {/* Wine Cellar & Libations */}
        <WineCellarSection onOpenReservation={scrollToReservation} />

        {/* Live Reservation Booking Section */}
        <ReservationSection
          initialDate={quickDate}
          initialTime={quickTime}
          initialGuests={quickGuests}
        />

        {/* Private Dining & Buyouts */}
        <PrivateDiningSection />

        {/* Hours, Location & Directions */}
        <LocationHoursSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      <TakeawayCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <ReservationLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />
    </div>
  );
}
