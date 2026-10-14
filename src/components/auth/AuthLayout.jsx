import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'

export function Field({ label, children, hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</label>
      {children}
      {hint ? <p className="mt-1.5 text-[13px] leading-5 text-neutral-500">{hint}</p> : null}
    </div>
  )
}

export function Divider({ children = 'or' }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-neutral-200" />
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">{children}</span>
      <span className="h-px flex-1 bg-neutral-200" />
    </div>
  )
}

export default function AuthLayout({ eyebrow, title, lead, children, side }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbfbfa]">
      <div className="laravel-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FF2D20] text-white shadow-[0_8px_20px_rgba(255,45,32,0.4)]">
              <Scale className="h-[18px] w-[18px]" />
            </span>
            <span className="leading-none">
              <span className="block text-[15px] font-semibold tracking-tight text-neutral-950">Mizan AI</span>
              <span className="mt-0.5 hidden text-[11px] text-neutral-500 sm:block">Pakistan legal research</span>
            </span>
          </Link>
          <Link to="/" className="text-sm font-medium text-neutral-500 transition hover:text-neutral-950">
            ← Back to home
          </Link>
        </header>

        <main className="grid flex-1 items-center gap-8 py-8 sm:py-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="mx-auto w-full max-w-[480px] lg:mx-0">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">
              [ {eyebrow} ]
            </div>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl">
              {title}
            </h1>
            {lead ? <p className="mt-3 text-[15px] leading-7 text-neutral-600">{lead}</p> : null}
            <div className="mt-6 rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.06)] sm:p-7">
              {children}
            </div>
            <p className="mt-4 text-center text-[13px] text-neutral-500 lg:text-left">
              Protected by Mizan AI secure auth. Your research stays private.
            </p>
          </div>

          <aside className="hidden lg:block">
            {side ?? (
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,45,32,0.28), transparent 65%), radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)',
                    backgroundSize: 'auto, 22px 22px',
                  }}
                />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    232,000+ judgments indexed
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.02em]">
                    Research Pakistani case law <span className="serif-accent font-normal text-white/90">in seconds.</span>
                  </h2>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-white/70">
                    {['Hybrid vector + BM25 search across 215 courts', 'Structured memos with Issue, Law & Precedents', 'Conflict alerts when benches disagree'].map((t) => (
                      <li key={t} className="flex items-start gap-2.5">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF2D20]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.04] p-4 font-mono text-[12px] leading-6 text-white/70">
                    <div className="text-white/40">$ mizan search “bail u/s 497 CrPC”</div>
                    <div><span className="text-emerald-400">✓</span> 14 precedents · Supreme Court · LHC</div>
                    <div><span className="text-emerald-400">✓</span> memo drafted in 1.8s</div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
