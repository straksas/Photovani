import { Camera, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { navItems, siteConfig } from '@/config/site';
import { useNavigate } from '@/lib/router';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-stone-200 bg-cream-100">
      <div className="container-px mx-auto max-w-8xl py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Camera size={20} className="text-accent-600" />
              <span className="font-serif text-lg font-semibold text-charcoal-900">
                {siteConfig.businessName}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-stone-600">
              {siteConfig.tagline}. Serving {siteConfig.primaryCity} and the{' '}
              {siteConfig.stateRegion} area.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-500">
              Pages
            </h2>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-sm text-charcoal-700 transition-colors hover:text-accent-600"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-500">
              Get in touch
            </h2>
            <ul className="space-y-2 text-sm text-charcoal-700">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent-600" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-accent-600"
                >
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.phone && (
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-accent-600" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="transition-colors hover:text-accent-600"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
              )}
            </ul>
            {/* Social links */}
            {(siteConfig.instagramUrl || siteConfig.facebookUrl) && (
              <div className="mt-4 flex gap-3">
                {siteConfig.instagramUrl && (
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-stone-600 transition-colors hover:text-accent-600"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {siteConfig.facebookUrl && (
                  <a
                    href={siteConfig.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-stone-600 transition-colors hover:text-accent-600"
                  >
                    <Facebook size={20} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6">
          <p className="text-center text-xs text-stone-500">
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
