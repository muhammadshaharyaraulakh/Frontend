import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Check, Scale, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { cn } from '../lib/utils'

const PLANS = {
  monthly: [
    {
      name: 'Free',
      tagline: 'For law students trying Mizan AI.',
      monthly: 0,
      cta: 'Start for free',
      ctaVariant: 'outline',
      features: [
        '50 hybrid searches / month',
        '3 research memos / month',
        'Supreme Court + 2 High Courts',
        '1 saved collection',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      tagline: 'For advocates & litigators.',
      monthly: 2499,
      popular: true,
      cta: 'Start 14-day free trial',
      ctaVariant: 'default',
      features: [
        'Unlimited hybrid searches',
        '50 research memos / month',
        'All 215 courts, 232,000+ judgments',
        'Conflict detection + citation graph',
        'Unlimited collections & exports',
        'Priority support',
      ],
    },
    {
      name: 'Chambers',
      tagline: 'For firms & research teams.',
      monthly: 5999,
      cta: 'Talk to sales',
      ctaVariant: 'outline',
      features: [
        'Everything in Pro',
        '5 seats included, add more anytime',
        'Shared workspace & case folders',
        'SSO, audit logs & 2FA enforcement',
        'API access + onboarding',
        'Dedicated success manager',
      ],
    },
  ],
  yearly: [
    {
      name: 'Free',
      tagline: 'For law students trying Mizan AI.',
      monthly: 0,
      cta: 'Start for free',
      ctaVariant: 'outline',
      features: [
        '50 hybrid searches / month',
        '3 research memos / month',
        'Supreme Court + 2 High Courts',
        '1 saved collection',
        'Community support',
      ],
    },
    {
      name: 'Pro',
      tagline: 'For advocates & litigators.',
      monthly: 1999,
      yearlyTotal: 23988,
      popular: true,
      cta: 'Start 14-day free trial',
      ctaVariant: 'default',
      features: [
        'Unlimited hybrid searches',
        '50 research memos / month',
        'All 215 courts, 232,000+ judgments',
        'Conflict detection + citation graph',
        'Unlimited collections & exports',
        'Priority support',
      ],
    },
    {
      name: 'Chambers',
      tagline: 'For firms & research teams.',
      monthly: 4799,
      yearlyTotal: 57588,
      cta: 'Talk to sales',
      ctaVariant: 'outline',
      features: [
        'Everything in Pro',
        '5 seats included, add more anytime',
        'Shared workspace & case folders',
        'SSO, audit logs & 2FA enforcement',
        'API access + onboarding',
        'Dedicated success manager',
      ],
    },
  ],
}

const FAQS = [
  {
    q: 'Is the Free plan really free?',
    a: 'Yes — free forever, no card required. 50 searches and 3 memos a month so students can try real hybrid search before upgrading.',
  },
  {
    q: 'How does yearly billing save money?',
    a: 'Yearly plans cost 2 months less — Pro drops from Rs 2,499 to Rs 1,999/mo and Chambers from Rs 5,999 to Rs 4,799/mo, billed once a year.',
  },
  {
    q: 'Can I switch between monthly and yearly?',
    a: 'Anytime from dashboard Settings. Upgrades apply instantly; downgrades take effect at the next cycle.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Debit/credit cards, bank transfer and JazzCash/Easypaisa for yearly invoices. Paid plans include a 14-day money-back guarantee.',
  },
]

function Price({ plan, billing }) {
  if (plan.monthly === 0) {
    return (
      <div className="mt-5 flex items-end gap-2">
        <span className="text-4xl font-semibold tracking-tight sm:text-5xl">Rs 0</span>
        <span className="pb-1.5 text-sm text-neutral-500">forever</span>
      </div>
    )
  }
  return (
    <div className="mt-5">
      <div className="flex items-end gap-2">
        <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Rs {plan.monthly.toLocaleString('en-PK')}
        </span>
        <span className="pb-1.5 text-sm text-neutral-500">/ month</span>
      </div>
      <p className="mt-1.5 text-[13px] text-neutral-500">
        {billing === 'yearly' && plan.yearlyTotal
          ? `Billed Rs ${plan.yearlyTotal.toLocaleString('en-PK')} once a year`
          : 'Billed monthly · cancel anytime'}
      </p>
    </div>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')
  const plans = PLANS[billing]

  return (
    <div className="min-h-screen min-w-[320px] bg-[#fbfbfa] font-sans text-neutral-950 antialiased">
      <header className="sticky top-0 z-50 bg-[#fbfbfa]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mt-3 flex h-14 items-center justify-between rounded-2xl border border-neutral-200 bg-white/80 px-3 sm:px-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FF2D20] text-white shadow-[0_8px_20px_rgba(255,45,32,0.4)]">
                <Scale className="h-[18px] w-[18px]" />
              </span>
              <span className="leading-none">
                <span className="block text-[15px] font-semibold tracking-tight">Mizan AI</span>
                <span className="mt-0.5 hidden text-[11px] text-neutral-500 sm:block">Pakistan legal research</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Link to="/" className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-900/5 hover:text-neutral-950">
                Home
              </Link>
              <span className="rounded-lg bg-neutral-950 px-3.5 py-2.5 text-sm font-medium text-white">Pricing</span>
              <Link to="/dashboard" className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-900/5 hover:text-neutral-950">
                Dashboard
              </Link>
            </nav>
            <div className="flex items-center gap-1.5">
              <Link to="/login" className="hidden text-sm font-medium text-neutral-600 transition hover:text-neutral-950 sm:block">
                Sign in
              </Link>
              <Link to="/signup">
                <Button className="h-10 px-4">Get Early Access</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="laravel-hero-glow relative overflow-hidden">
          <div className="laravel-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1280px] px-4 pb-10 pt-12 text-center sm:px-6 sm:pt-16 lg:px-8">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">
              [ Pricing ]
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Simple pricing for <span className="serif-accent font-normal">every</span> practice.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Start free. Upgrade when your caseload grows. Switch between monthly and yearly anytime.
            </p>
            <div className="mt-7 inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm">
              {['monthly', 'yearly'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold capitalize transition-all',
                    billing === b ? 'bg-neutral-950 text-white shadow' : 'text-neutral-500 hover:text-neutral-900',
                  )}
                >
                  {b}
                  {b === 'yearly' && (
                    <span className={cn(
                      'rounded-full px-2 py-0.5 text-[11px] font-bold',
                      billing === 'yearly' ? 'bg-[#FF2D20] text-white' : 'bg-[#FF2D20]/10 text-[#c81f14]',
                    )}>
                      −20%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1280px] px-4 pb-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  'card-lift relative flex flex-col p-6 sm:p-7',
                  plan.popular && 'border-[#FF2D20]/40 shadow-[0_24px_70px_rgba(255,45,32,0.12)] ring-2 ring-[#FF2D20]/60',
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#FF2D20] px-3.5 py-1.5 text-xs font-bold text-white shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" /> Most popular
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold tracking-tight">{plan.name}</h2>
                  {plan.monthly === 0 && <Badge>Free</Badge>}
                  {billing === 'yearly' && plan.monthly > 0 && <Badge variant="default">Save 20%</Badge>}
                </div>
                <p className="mt-1 text-sm text-neutral-500">{plan.tagline}</p>
                <Price plan={plan} billing={billing} />
                <ul className="mt-6 grid gap-2.5 border-t border-neutral-100 pt-6 text-sm leading-6 text-neutral-700">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                        plan.popular ? 'bg-[#FF2D20]/12 text-[#c81f14]' : 'bg-emerald-50 text-emerald-600',
                      )}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="mt-7 block">
                  <Button variant={plan.ctaVariant} size="lg" className="w-full">
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-center text-[13px] text-neutral-500">
            Prices in PKR, exclusive of taxes. Paid plans include a 14-day money-back guarantee.
          </p>
        </section>
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Compare ]</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Compare plans side by side</h2>
          </div>
          <Card className="mt-7 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/70">
                    <th className="p-4 font-medium text-neutral-500">Feature</th>
                    <th className="p-4 font-semibold">Free</th>
                    <th className="p-4 font-semibold text-[#c81f14]">Pro</th>
                    <th className="p-4 font-semibold">Chambers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {[
                    ['Hybrid searches', '50 / mo', 'Unlimited', 'Unlimited'],
                    ['Research memos', '3 / mo', '50 / mo', '200 / mo'],
                    ['Court coverage', '3 courts', 'All 215 courts', 'All 215 courts'],
                    ['Conflict detection', '—', 'Included', 'Included'],
                    ['Team seats', '1', '1', '5 included'],
                    ['API access', '—', '—', 'Included'],
                    ['Support', 'Community', 'Priority', 'Dedicated manager'],
                  ].map(([f, free, pro, team]) => (
                    <tr key={f} className="transition hover:bg-neutral-50/70">
                      <td className="p-4 font-medium text-neutral-600">{f}</td>
                      <td className="p-4 text-neutral-700">{free}</td>
                      <td className="p-4 font-medium text-neutral-900">{pro}</td>
                      <td className="p-4 text-neutral-700">{team}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ FAQ ]</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Pricing questions</h2>
          </div>
          <div className="mt-7 grid gap-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition open:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold marker:hidden">
                  {f.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg leading-none transition group-open:rotate-45 group-open:bg-[#FF2D20] group-open:text-white">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
          <Card className="mt-8 flex flex-col items-center gap-4 bg-[#0d0d0f] p-6 text-center text-white sm:flex-row sm:p-8 sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF2D20]">
              <BadgeCheck className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Not sure which plan fits?</h3>
              <p className="mt-1 text-sm leading-6 text-white/60">Start free — upgrade to Pro in one click when you need unlimited research.</p>
            </div>
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">Start free</Button>
            </Link>
          </Card>
        </section>
        {/* __PART3__ */}
      </main>

      <footer className="bg-[#0d0d0f] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FF2D20] text-white"><Scale className="h-4 w-4" /></div>
              <div className="text-sm font-semibold">Mizan AI</div>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-white/55">
              <Link to="/" className="transition hover:text-white">Home</Link>
              <span className="text-white">Pricing</span>
              <Link to="/login" className="transition hover:text-white">Sign in</Link>
              <Link to="/signup" className="transition hover:text-white">Sign up</Link>
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-6 text-sm text-white/45">© 2025 Mizan AI · Prices in PKR</div>
        </div>
      </footer>
    </div>
  )
}

