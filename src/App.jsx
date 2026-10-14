import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  FileText,
  Globe,
  Scale,
  Search,
  Network,
  Shield,
  Sparkles,
} from 'lucide-react'
import { gsap } from 'gsap'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './components/ui/navigation-menu'
import { Separator } from './components/ui/separator'
import { cn } from './lib/utils'

const heroTags = ['Supreme Court', 'Lahore High Court', 'Sindh High Court', 'Federal Shariat Court', 'Islamabad High Court', 'Peshawar High Court']
const hybridBullets = [
  { icon: Network, label: 'Semantic vector search' },
  { icon: Code2, label: 'BM25 keyword fallback' },
  { icon: Shield, label: 'Reciprocal Rank Fusion' },
  { icon: Globe, label: 'pgvector powered' },
]
const hybridChips = ['Hybrid Search', 'pgvector', 'BM25', 'OpenAI Embeddings', 'Laravel AI SDK']
const memoSections = ['Issue', 'Applicable Law', 'Precedents', 'Conflicts', 'Recommendation']

const testimonials = [
  { quote: 'I used to spend half a day moving between law reports and scanned PDFs. Now I can locate the right Pakistani precedent in minutes.', name: 'A. Qureshi', role: 'Advocate', company: 'Supreme Court' },
  { quote: 'The hardest part of commercial work is knowing when a judgment was later distinguished. Mizan AI surfaces that context immediately.', name: 'Sara Malik', role: 'Corporate Lawyer', company: 'Karachi' },
  { quote: 'For my thesis, I needed cases across decades. This feels like having a research librarian who never gets tired.', name: 'Hassan Riaz', role: 'Law Student', company: 'Punjab University' },
  { quote: 'When I prepare briefs, I need the exact ratio and the later treatment. The memo output is closer to how a clerk thinks.', name: 'Nadia Iqbal', role: 'Research Assistant', company: 'Court Chambers' },
  { quote: 'It highlights contradictions I would otherwise miss when old and new benches take different views on the same section.', name: 'Dr. Umair Khan', role: 'LLB Professor', company: 'Legal Studies' },
  { quote: 'We wanted legal research that felt modern, fast, and trustworthy. This is the kind of product Pakistan’s legal tech stack needed.', name: 'M. Aslam', role: 'Founder', company: 'Legal Startup' },
]

const stats = [
  { label: 'Indexed Judgments', value: '232,000+' },
  { label: 'Courts Covered', value: '215' },
  { label: 'Years of Case Law', value: '40+' },
  { label: 'Average Query Time', value: '<2s' },
]

const courts = [
  { name: 'Supreme Court of Pakistan', jurisdiction: 'Nationwide appellate jurisdiction', years: '1956–2025' },
  { name: 'Lahore High Court', jurisdiction: 'Punjab', years: '1948–2025' },
  { name: 'Sindh High Court', jurisdiction: 'Sindh', years: '1955–2025' },
  { name: 'Peshawar High Court', jurisdiction: 'Khyber Pakhtunkhwa', years: '1960–2025' },
  { name: 'Islamabad High Court', jurisdiction: 'Islamabad Capital Territory', years: '2010–2025' },
  { name: 'Federal Shariat Court', jurisdiction: 'Shariat review jurisdiction', years: '1980–2025' },
]

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({ children, className = '' }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`.trim()}>{children}</div>
}

function CountUp({ value }) {
  const ref = useRef(null)
  const [count, setCount] = useState(value.includes('<') ? value : '0')

  useEffect(() => {
    if (value.includes('<')) return undefined

    const element = ref.current
    if (!element) return undefined

    let frame = 0
    const target = Number.parseInt(value.replace(/[^0-9]/g, ''), 10)
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? ''
    const suffix = value.match(/[^0-9]*$/)?.[0] ?? ''
    const duration = 1400

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()

      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        const next = Math.round(target * eased)
        setCount(`${prefix}${next}${suffix}`)
        if (progress < 1) frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
      observer.disconnect()
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <span ref={ref}>{count}</span>
}

function SectionHeading({ eyebrow, title, lead, align = 'center', dark = false }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      <div
        className={cn(
          'font-mono text-[11px] font-medium uppercase tracking-[0.28em]',
          dark ? 'text-white/50' : 'text-[#FF2D20]',
        )}
      >
        [ {eyebrow} ]
      </div>
      <h2
        className={cn(
          'mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-[2.9rem]',
          dark ? 'text-white' : 'text-neutral-950',
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn('mt-4 text-pretty text-base leading-7 sm:text-lg sm:leading-8', dark ? 'text-white/60' : 'text-neutral-600')}>
          {lead}
        </p>
      ) : null}
    </div>
  )
}

function CodeWindow({ filename, language, children, className = '', tabs = [] }) {
  return (
    <div className={cn('code-glow overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0f] text-neutral-100', className)}>
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          {tabs.length > 0 ? (
            <div className="flex items-center gap-1 text-xs">
              {tabs.map((tab, i) => (
                <span
                  key={tab}
                  className={cn(
                    'rounded-md px-2.5 py-1 font-mono',
                    i === 0 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70',
                  )}
                >
                  {tab}
                </span>
              ))}
            </div>
          ) : (
            <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/80">{filename}</span>
          )}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">{language}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-neutral-200"><code>{children}</code></pre>
    </div>
  )
}

function SocialIconButton({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  )
}

function GitHubMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.92 5.44.92 11.82c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.58 0-.29-.01-1.06-.02-2.08-3.2.71-3.88-1.58-3.88-1.58-.52-1.36-1.27-1.72-1.27-1.72-1.04-.74.08-.72.08-.72 1.15.08 1.76 1.2 1.76 1.2 1.02 1.8 2.67 1.28 3.32.98.1-.76.4-1.28.73-1.57-2.56-.3-5.25-1.31-5.25-5.83 0-1.29.45-2.34 1.19-3.16-.12-.3-.52-1.49.11-3.1 0 0 .97-.32 3.18 1.21a10.54 10.54 0 0 1 2.9-.4c.99 0 1.99.13 2.9.4 2.2-1.53 3.17-1.21 3.17-1.21.63 1.61.24 2.8.12 3.1.74.82 1.18 1.87 1.18 3.16 0 4.53-2.69 5.53-5.25 5.82.41.37.77 1.1.77 2.22 0 1.61-.01 2.91-.01 3.31 0 .32.21.69.8.57 4.57-1.53 7.85-5.86 7.85-10.96C23.08 5.44 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedInMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.41 4.33 5.55v6.19ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.78A1.76 1.76 0 0 0 0 1.73v20.54A1.76 1.76 0 0 0 1.78 24h20.44A1.76 1.76 0 0 0 24 22.27V1.73A1.76 1.76 0 0 0 22.22 0Z" />
    </svg>
  )
}

function XMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-6.78 7.76L23 22h-6.9l-5.42-7.05L4.53 22H1.4l7.2-8.24L1 2h7.06l4.95 6.46L18.9 2Zm-1.21 18h1.72L7.12 3.89H5.29L17.69 20Z" />
    </svg>
  )
}

function App() {
  useEffect(() => {
    gsap.to('.float-mockup', { y: -10, duration: 3, ease: 'power1.inOut', repeat: -1, yoyo: true })
  }, [])

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const researchMemo = useMemo(() => `{
  "Issue": "Whether death penalty reduction is available under Section 302 PPC.",
  "Applicable Law": [
    "Pakistan Penal Code, Section 302",
    "Criminal Procedure Code provisions on appeal",
    "Recent Supreme Court treatment of mitigating factors"
  ],
  "Precedents": [
    "PLD 2024 SC 118",
    "2023 SCMR 844",
    "2022 YLR 391"
  ],
  "Conflicts": [
    "Benches differ on premeditation weighting",
    "Some judgments emphasize socioeconomic mitigation"
  ],
  "Recommendation": "Argue for sentence reduction where intention is not fully established."
}`, [])

  const searchQuery = `<?php
$results = Judgment::query()
    ->nearestNeighbors('embedding', $queryEmbedding, 10)
    ->orWhereFullText('text', $query)
    ->with(['court', 'citations'])
    ->get();

return $results->map(fn ($judgment) => [
    'title' => $judgment->title,
    'score' => $judgment->score,
]);`

  return (
    <div className="min-h-screen bg-[#fbfbfa] font-sans text-neutral-950 antialiased">
      <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-[#fbfbfa]/85 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className={`mt-3 flex h-14 items-center justify-between rounded-2xl border px-3 transition-all sm:px-4 ${scrolled ? 'border-neutral-200 bg-white/80' : 'border-transparent'}`}>
            <a href="#top" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FF2D20] text-white shadow-[0_8px_20px_rgba(255,45,32,0.4)]"><Scale className="h-[18px] w-[18px]" /></div>
              <div className="leading-none">
                <div className="text-[15px] font-semibold tracking-tight">Mizan AI</div>
                <div className="mt-0.5 hidden text-[11px] text-neutral-500 sm:block">Pakistan legal research</div>
              </div>
            </a>

          <NavigationMenu>
            <NavigationMenuList>
              {[
                ['Platform', ['Hybrid Search', 'Research Memos', 'Conflict Detection']],
                ['Features', ['Judgment Search', 'Court Coverage', 'Citations']],
                ['How It Works', ['Query', 'Retrieve', 'Synthesize']],
                ['Docs', ['API', 'Guides', 'Examples']],
              ].map(([label, items]) => (
                <NavigationMenuItem key={label}>
                  <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                  <NavigationMenuContent>{items.map((item) => <NavigationMenuLink key={item} href="#">{item}</NavigationMenuLink>)}</NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-1.5">
            <a href="https://github.com" className="hidden h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-neutral-600 transition hover:bg-neutral-900/5 hover:text-neutral-950 md:inline-flex">
              <GitHubMark className="h-4 w-4" />
              <span className="font-mono text-xs">85K</span>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/login'
              }}
              className="hidden text-sm font-medium text-neutral-600 transition hover:text-neutral-950 sm:block"
            >
              Sign in
            </a>
            <Button className="h-10 px-4" onClick={() => { window.location.href = '/signup' }}>Get Early Access</Button>
          </div>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="laravel-hero-glow relative overflow-hidden">
          <div className="laravel-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1280px] px-4 pb-14 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <div className="mx-auto max-w-4xl text-center">
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 py-1 pl-1 pr-3 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-300">
                <span className="rounded-full bg-[#FF2D20] px-2.5 py-0.5 text-[11px] font-semibold text-white">New</span>
                Now with Hybrid RAG Search
                <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
              </a>
              <h1 className="mx-auto mt-6 max-w-4xl text-balance text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-neutral-950">
                The AI research agent for <span className="serif-accent font-normal">Pakistani</span> courts and judgments.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-[clamp(1rem,1.8vw,1.2rem)] leading-8 text-neutral-600">Search 232,000+ judgments across 215 courts. Get structured research memos in seconds.</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="min-w-52">Start Researching <ArrowRight className="ml-2 h-4 w-4" /></Button>
                <Button size="lg" variant="outline" className="min-w-44">Read the Docs</Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-neutral-500">
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> 232,000+ judgments</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> 215 courts</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Under 2s answers</span>
              </div>
            </div>

            <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="hero-marquee flex items-center gap-3 whitespace-nowrap py-2 text-[13px] text-neutral-600">
                {[...heroTags, ...heroTags].map((tag, index) => (
                  <span key={`${tag}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF2D20]" />{tag}
                  </span>
                ))}
              </div>
            </div>

          <div className="float-mockup mt-8 lg:mt-10">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/80 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="mx-auto w-full max-w-sm rounded-md bg-white px-3 py-1 text-center font-mono text-[11px] text-neutral-400 ring-1 ring-neutral-200">mizan.ai/research</div>
                <div className="w-10" />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="flex flex-1 items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3"><Search className="h-4 w-4 shrink-0 text-neutral-400" /><div className="truncate font-mono text-[13px] text-neutral-600">Section 302 PPC death penalty reduction grounds</div></div>
                  <div className="flex items-center gap-2 text-xs"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF2D20]/10 px-3 py-1 font-medium text-[#FF2D20]"><Sparkles className="h-3 w-3" />Hybrid RAG</span><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 ring-1 ring-emerald-200">Live court data</span></div>
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-3">
                  {[
                    ['Supreme Court of Pakistan', 'Reduction is more likely when intention is not proved beyond doubt and mitigating facts outweigh aggravating ones.'],
                    ['Lahore High Court', 'Judgments emphasize the factual matrix, prior record, and consistency with recent sentencing precedents.'],
                    ['Sindh High Court', 'The reasoning often turns on whether the accused received a fair opportunity to rebut aggravating evidence.'],
                  ].map(([title, text]) => (
                    <Card key={title} className="card-lift rounded-xl border-neutral-200/80 shadow-none"><CardHeader className="p-4 pb-2"><div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF2D20]"><FileText className="h-3.5 w-3.5" />Judgment Result</div><CardTitle className="mt-2 text-[15px] leading-snug">{title}</CardTitle></CardHeader><CardContent className="p-4 pt-0"><CardDescription className="text-[13px] leading-6">{text}</CardDescription></CardContent></Card>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-xs text-neutral-400">Powering ideas for Pakistan&apos;s best &amp; brightest</p>
          </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Hybrid Search ]</div>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-[2.75rem]">Find relevant judgments, <span className="serif-accent font-normal">not just</span> keyword matches.</h2>
              <h3 className="mt-4 text-lg font-medium text-neutral-800">Semantic + BM25 hybrid retrieval</h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-neutral-600">Mizan AI understands legal intent, citation patterns, and court language so researchers can get the right answer faster than a plain keyword search.</p>
              <ul className="mt-6 grid gap-2.5 text-sm text-neutral-700 sm:grid-cols-2">{hybridBullets.map(({ icon: Icon, label }) => <li key={label} className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 shadow-sm"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF2D20]/10 text-[#FF2D20]"><Icon className="h-3.5 w-3.5" /></span>{label}</li>)}</ul>
              <div className="mt-5 flex flex-wrap gap-2">{hybridChips.map((chip) => <span key={chip} className="rounded-md bg-neutral-900/[0.04] px-2.5 py-1 font-mono text-xs text-neutral-600 ring-1 ring-neutral-900/10">{chip}</span>)}</div>
              <a href="#" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#FF2D20] hover:gap-2">Explore the framework <ArrowRight className="h-4 w-4" /></a>
            </div>
            <CodeWindow filename="search.php" language="PHP" tabs={['search.php', 'Judgment.php']}>{searchQuery}</CodeWindow>
          </Reveal>
        </section>

        <section className="border-y border-neutral-200/80 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <CodeWindow filename="memo.json" language="JSON" tabs={['memo.json', 'citations.json']}>{researchMemo}</CodeWindow>
            <div>
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Research Memos ]</div>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-[2.75rem]">From query to full research memo in <span className="serif-accent font-normal">one click.</span></h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">Turn a legal question into a structured memo with issues, applicable law, precedents, contradictions, and a practical recommendation you can build on immediately.</p>
              <ul className="mt-6 space-y-2.5 text-sm text-neutral-700">{memoSections.map((item) => <li key={item} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-[#fbfbfa] px-4 py-3 shadow-sm"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-900 text-white"><BookOpen className="h-3.5 w-3.5" /></span>{item}<ChevronRight className="ml-auto h-4 w-4 text-neutral-300" /></li>)}</ul>
            </div>
          </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Contradiction Detection ]</div>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]">Catch conflicting judgments <span className="serif-accent font-normal">before</span> they catch you.</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">Compare judgments side by side, see where benches diverge, and flag material conflicts before you rely on a precedent in court.</p>
              <div className="mt-6 flex flex-wrap gap-3"><Button>Start Researching <ArrowRight className="ml-2 h-4 w-4" /></Button><Button variant="outline">Read the Docs</Button></div>
            </div>
            <div className="relative grid gap-3 sm:grid-cols-2 sm:items-stretch">
              {[
                'A later bench held that prior conduct can mitigate sentencing when motive remains unproven.',
                'An earlier bench treated the same conduct as aggravating and refused reduction.',
              ].map((text, index) => <Card key={index} className="card-lift p-5"><div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-semibold text-white">Judgment {index + 1}</span><span className="font-mono text-[11px] text-neutral-400">Ratio excerpt</span></div><p className="text-sm leading-7 text-neutral-700">{text}</p></Card>)}
              <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#FF2D20]/25 bg-white px-4 py-2 text-xs font-semibold text-[#FF2D20] shadow-[0_12px_32px_rgba(255,45,32,0.25)] sm:inline-flex"><AlertTriangle className="h-3.5 w-3.5" />Conflict Detected</div>
              <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-[#FF2D20]/25 bg-white px-4 py-2 text-xs font-semibold text-[#FF2D20] shadow-sm sm:hidden"><AlertTriangle className="h-3.5 w-3.5" />Conflict Detected</div>
            </div>
          </Reveal>
        </section>

        <section className="relative overflow-hidden bg-[#FF2D20]">
          <div className="laravel-dot-bg absolute inset-0 opacity-[0.12]" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-black/15 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-4 py-14 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
            <div>
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">[ Create without limits ]</div>
              <div className="mt-2 text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Research smarter. What will you argue?</div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row"><a href="#" className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-7 text-[15px] font-semibold text-[#FF2D20] shadow-lg transition hover:-translate-y-px">Start Researching</a><a href="#" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 px-7 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:bg-white/10">Read the Docs</a></div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading eyebrow="Loved by legal minds" title={<>Trusted by Pakistan&apos;s advocates, researchers &amp; students</>} />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{testimonials.map((item) => <Card key={item.name} className="card-lift p-6"><div className="serif-accent mb-4 text-4xl leading-none text-[#FF2D20]">“</div><p className="min-h-28 text-[15px] leading-7 text-neutral-700">{item.quote}</p><div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">{item.name.charAt(0)}</div><div><div className="text-sm font-semibold text-neutral-950">{item.name}</div><div className="text-xs text-neutral-500">{item.role} · {item.company}</div></div></div></Card>)}</div></Reveal>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 pb-4 sm:px-6 lg:px-8">
          <Reveal><div className="grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 shadow-sm sm:grid-cols-2 xl:grid-cols-4">{stats.map((item) => <div key={item.label} className="bg-white p-8 text-center"><div className="text-4xl font-semibold tracking-[-0.02em] text-neutral-950"><CountUp value={item.value} /></div><div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">{item.label}</div></div>)}</div></Reveal>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="mb-10 text-left"><div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Supported Courts ]</div><h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl">Coverage built for Pakistan’s core court hierarchy.</h2></div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{courts.map((court) => <Card key={court.name} className="card-lift group p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF2D20]/10 text-[#FF2D20] transition group-hover:bg-[#FF2D20] group-hover:text-white"><Scale className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-semibold tracking-tight text-neutral-950">{court.name}</h3><p className="mt-1.5 text-sm leading-6 text-neutral-600">{court.jurisdiction}</p><Separator className="my-5" /><div className="flex items-center justify-between"><div className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">Coverage years</div><div className="text-sm font-semibold text-neutral-800">{court.years}</div></div></Card>)}</div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="grid items-center gap-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.07)] sm:p-8 lg:grid-cols-2 lg:p-12">
              <div><div className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Early Access ]</div><h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl">Stay updated on Mizan AI&apos;s launch.</h2><p className="mt-4 max-w-md text-base leading-7 text-neutral-600">Get launch updates and product notes as the platform opens up for early users.</p></div>
              <form className="w-full" onSubmit={(e) => e.preventDefault()}><div className="grid gap-3"><div className="grid gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-sm font-medium text-neutral-700">First name</label><Input placeholder="First name" /></div><div><label className="mb-1.5 block text-sm font-medium text-neutral-700">Last name</label><Input placeholder="Last name" /></div></div><div><label className="mb-1.5 block text-sm font-medium text-neutral-700">Email address</label><Input type="email" placeholder="you@example.com" /></div><Button className="w-full" size="lg">Stay updated</Button></div><p className="mt-3 text-center text-[13px] text-neutral-500">No spam. Unsubscribe anytime.</p></form>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="bg-[#0d0d0f] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr]">
            <div>
              <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#FF2D20] text-white"><Scale className="h-5 w-5" /></div><div><div className="text-sm font-semibold text-white">Mizan AI</div><div className="text-xs text-white/50">Pakistan legal research agent</div></div></div>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/60">A premium research layer for Pakistani legal professionals, designed to surface the right judgment, the right context, and the right argument.</p>
              <div className="mt-6 flex items-center gap-2.5 text-white/60">
                <SocialIconButton href="#" label="GitHub"><GitHubMark className="h-4 w-4" /></SocialIconButton>
                <SocialIconButton href="#" label="X / Twitter"><XMark className="h-4 w-4" /></SocialIconButton>
                <SocialIconButton href="#" label="LinkedIn"><LinkedInMark className="h-4 w-4" /></SocialIconButton>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">{[['Product', ['Platform', 'Features', 'Pricing', 'Launch']], ['Resources', ['Docs', 'Guides', 'API', 'Updates']], ['Legal', ['Privacy', 'Terms', 'Security', 'Status']], ['Community', ['GitHub', 'X / Twitter', 'LinkedIn', 'Contact']]].map(([title, items]) => <div key={title}><div className="text-sm font-semibold text-white">{title}</div><ul className="mt-4 space-y-3 text-sm text-white/55">{items.map((item) => <li key={item}><a href="#" className="transition hover:text-white">{item}</a></li>)}</ul></div>)}</div>
          </div>
          <div className="my-8 h-px w-full bg-white/10" />
          <div className="flex flex-col gap-2 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between"><div>© 2025 Mizan AI</div><div className="flex flex-wrap gap-5"><a href="#" className="transition hover:text-white">Privacy</a><a href="#" className="transition hover:text-white">Terms</a><a href="#" className="transition hover:text-white">Status</a></div></div>
        </div>
      </footer>
    </div>
  )
}

export default App
