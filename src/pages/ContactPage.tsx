import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/ui/Section';
import { services, siteConfig } from '@/config/site';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface FormData {
  name: string;
  email: string;
  service: string;
  preferredDate: string;
  message: string;
  // Honeypot — hidden field for spam bots
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    preferredDate: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact | ${siteConfig.businessName}`,
    description: `Contact ${siteConfig.businessName} to inquire about maternity, couples, family, and individual photography sessions in ${siteConfig.primaryCity}.`,
    url: `${siteConfig.productionDomain}/contact`,
  };

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) {
      e.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.service) e.service = 'Please select a photography service.';
    if (!form.message.trim()) {
      e.message = 'Please tell me a little about what you\'re looking for.';
    } else if (form.message.trim().length < 10) {
      e.message = 'Your message should be at least 10 characters.';
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot check — if filled, silently succeed (bot caught)
    if (form.website) {
      setStatus('success');
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    setErrorMsg('');

    if (!isSupabaseConfigured) {
      setStatus('error');
      setErrorMsg(
        'The contact form is not yet connected to a database. Please email me directly at ' +
          siteConfig.email +
          ' until this is configured.',
      );
      return;
    }

    try {
      const { error } = await supabase.from('contact_inquiries').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        service: form.service,
        preferred_date: form.preferredDate || null,
        message: form.message.trim(),
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', service: '', preferredDate: '', message: '', website: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? `Something went wrong: ${err.message}. Please try again or email me at ${siteConfig.email}.`
          : 'Something went wrong. Please try again or email me directly.',
      );
    }
  }

  function updateField<K extends keyof FormData>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key as keyof FormErrors]: undefined }));
    }
  }

  return (
    <>
      <Seo
        title={`Contact — Book a Photography Session in ${siteConfig.primaryCity}`}
        description={`Get in touch with ${siteConfig.businessName} to book a professional photography session in ${siteConfig.primaryCity}, ${siteConfig.stateRegion}. We offer maternity, couples, family, and individual portraits, plus school events, birthday parties, and event photography. Inquire about availability, pricing, and session details.`}
        path="/contact"
        structuredData={structuredData}
      />

      {/* Page header */}
      <section className="bg-cream-100 pt-32 pb-12">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk about your session"
            >
              Whether you're expecting a new arrival, celebrating an anniversary, updating
              your family portraits, or planning a special event, Photovani is here to
              capture it beautifully. As a professional photography studio serving
              {' '}{siteConfig.primaryCity} and the {siteConfig.stateRegion} area, we
              specialize in maternity photography, couples portraits, family photography,
              and individual portrait sessions — and we offer much more. Photovani also
              provides professional photography for school events, birthday parties,
              graduation ceremonies, recitals, sporting events, corporate gatherings,
              engagement parties, baby showers, and virtually any occasion where you want
              genuine, timeless images preserved in natural light. If you need a
              photographer, we're open to it. Use the form below to tell us about your
              session, or reach out directly by email.
            </SectionHeading>
          </Reveal>
        </div>
      </section>

      {/* Contact section */}
      <section className="container-px mx-auto max-w-7xl py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: contact info */}
          <Reveal className="lg:col-span-2">
            <h2 className="text-xl font-semibold">Get in touch</h2>
            <p className="mt-3 text-stone-600">
              I typically respond within 1–2 business days. For the fastest reply, include
              the type of session you're interested in and your preferred timeframe.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-accent-600" />
                <div>
                  <p className="text-sm font-medium text-charcoal-700">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-stone-600 transition-colors hover:text-accent-600"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              {siteConfig.phone && (
                <li className="flex items-start gap-3">
                  <Phone size={20} className="mt-0.5 shrink-0 text-accent-600" />
                  <div>
                    <p className="text-sm font-medium text-charcoal-700">Phone</p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                      className="text-sm text-stone-600 transition-colors hover:text-accent-600"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-accent-600" />
                <div>
                  <p className="text-sm font-medium text-charcoal-700">Service area</p>
                  <p className="text-sm text-stone-600">
                    {siteConfig.primaryCity}, {siteConfig.stateRegion}
                    <br />
                    {siteConfig.serviceAreas.join(' · ')}
                  </p>
                </div>
              </li>
            </ul>

            {/* Social links */}
            {(siteConfig.instagramUrl || siteConfig.facebookUrl) && (
              <div className="mt-8 flex gap-4">
                {siteConfig.instagramUrl && (
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-stone-600 transition-colors hover:text-accent-600"
                  >
                    <Instagram size={22} />
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
                    <Facebook size={22} />
                  </a>
                )}
              </div>
            )}

            {!isSupabaseConfigured && (
              <div className="mt-8 flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 p-4">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                <p className="text-sm text-amber-800">
                  The contact form's database connection is not configured yet. You can
                  still reach me by email until it's set up.
                </p>
              </div>
            )}
          </Reveal>

          {/* Right: form */}
          <Reveal className="lg:col-span-3" delay={100}>
            <div className="rounded-2xl bg-cream-50 p-6 shadow-sm sm:p-10">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 size={56} className="text-green-600" />
                  <h3 className="mt-4 text-xl font-semibold">Thank you for your inquiry!</h3>
                  <p className="mt-2 max-w-sm text-stone-600">
                    Your message has been received. I'll get back to you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-secondary mt-8"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="text-lg font-semibold">Inquiry form</h3>
                  <p className="mt-1 text-sm text-stone-500">
                    Fields marked with <span className="text-accent-600">*</span> are required.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="form-label">
                        Name <span className="text-accent-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className="input-field"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && <p id="name-error" className="form-error">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-accent-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="input-field"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" className="form-label">
                        Service of interest <span className="text-accent-600">*</span>
                      </label>
                      <select
                        id="service"
                        className="input-field"
                        value={form.service}
                        onChange={(e) => updateField('service', e.target.value)}
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? 'service-error' : undefined}
                      >
                        <option value="">Select a session type…</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Individual Portraits">Individual Portraits</option>
                        <option value="School Events">School Events</option>
                        <option value="Birthday Parties">Birthday Parties</option>
                        <option value="Other Event">Other Event / Occasion</option>
                        <option value="Other">Other / Not sure yet</option>
                      </select>
                      {errors.service && <p id="service-error" className="form-error">{errors.service}</p>}
                    </div>

                    {/* Preferred date */}
                    <div>
                      <label htmlFor="preferredDate" className="form-label">
                        Preferred date
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        className="input-field"
                        value={form.preferredDate}
                        onChange={(e) => updateField('preferredDate', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <label htmlFor="message" className="form-label">
                      Message <span className="text-accent-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell me about the kind of session you have in mind…"
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className="form-error">{errors.message}</p>}
                  </div>

                  {/* Honeypot — visually hidden, not aria-hidden so bots fill it */}
                  <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="website">Website (leave empty)</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => updateField('website', e.target.value)}
                    />
                  </div>

                  {/* Error banner */}
                  {status === 'error' && errorMsg && (
                    <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-300 bg-red-50 p-4">
                      <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
                      <p className="text-sm text-red-700">{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn-primary mt-7 w-full sm:w-auto"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
