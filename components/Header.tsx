'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes';

export default function Header() {
  const { count } = useCart();
  const {theme}  = useTheme();
  
  
  return (
    <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src= {theme == 'light' ?'./assets/images/logo_light.png' : './assets/images/logo_dark.png'} alt="Pickzy" className="h-20 w-20 object-contain p-2 transition group-hover:scale-105"/>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="relative">
            <span className="sr-only">Cart</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-primary px-2 text-xs text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
