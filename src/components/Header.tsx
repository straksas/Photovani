import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { useNavigate } from '@/lib/router';

export function Header({ currentPath }: { currentPath: string }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  // Pages with light backgrounds at the top need the solid header immediately,
  // otherwise the transparent-state nav text blends into the background.
  const solid = scrolled || currentPath !== '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPath]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-cream-50/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="container-px mx-auto flex max-w-8xl items-center justify-between py-5"
        aria-label="Main navigation"
      >
        {/* Logo / Business Name */}
        <button
          onClick={() => navigate('/')}
          className={`font-serif text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl ${
            solid ? 'text-charcoal-900' : 'text-cream-50'
          }`}
        >
          {siteConfig.brandDisplay}
        </button>
      </nav>
    </header>
  );
}
