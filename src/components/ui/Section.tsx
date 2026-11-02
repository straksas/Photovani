import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from '@/lib/router';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-stone-600">{children}</p>}
    </div>
  );
}

interface CTAButtonProps {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function CTAButton({ to, children, variant = 'primary', className = '' }: CTAButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={variant === 'primary' ? `btn-primary ${className}` : `btn-secondary ${className}`}
    >
      {children}
      <ArrowRight size={16} />
    </button>
  );
}
