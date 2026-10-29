import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, siteConfig } from '@/config/site';
import { useNavigate } from '@/lib/router';

export function Header({ currentPath }: { currentPath: string }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

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
          onClick={() => go('/')}
          className={`font-serif text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl ${
            solid ? 'text-charcoal-900' : 'text-cream-50'
          }`}
        >
          {siteConfig.businessName}
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const active = currentPath === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => go(item.path)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    solid
                      ? active
                        ? 'text-accent-600'
                        : 'text-charcoal-700 hover:text-accent-600'
                      : active
                        ? 'text-cream-50 underline decoration-accent-300 decoration-2 underline-offset-4'
                        : 'text-cream-100/90 hover:text-cream-50'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden transition-colors ${
            solid ? 'text-charcoal-900' : 'text-cream-50'
          }`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 top-0 z-40 bg-charcoal-900/95 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <ul className="flex h-full flex-col items-center justify-center gap-8">
            {navItems.map((item) => {
              const active = currentPath === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => go(item.path)}
                    className={`font-serif text-2xl font-medium transition-colors ${
                      active ? 'text-accent-400' : 'text-cream-50 hover:text-accent-300'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
