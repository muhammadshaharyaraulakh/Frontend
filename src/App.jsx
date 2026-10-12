import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Code2,
  FileText,
  Globe,
  Scale,
  Search,
  Network,
  Shield,
  Zap,
} from 'lucide-react'
import { gsap } from 'gsap'
import { Badge } from './components/ui/badge'
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
    if (value.includes('<')) {
      setCount(value)
      return undefined
    }

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

function CodeWindow({ filename, language, children, className = '' }) {
  return (
    <Card className={`overflow-hidden border-neutral-800 bg-[#1e1e2e] text-neutral-100 shadow-[0_28px_80px_rgba(0,0,0,0.14)] ${className}`.trim()}>
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 text-xs text-neutral-300">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px]">{filename}</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">{language}</span>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-6 text-neutral-200"><code className="font-mono">{children}</code></pre>
    </Card>
  )
}

function SocialIconButton({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
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
    <div className="min-h-screen bg-white text-neutral-950">
      <header className={`sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl transition-shadow ${scrolled ? 'shadow-[0_12px_30px_rgba(0,0,0,0.06)]' : ''}`}>
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B8860B]/10 text-[#B8860B]"><Scale className="h-5 w-5" /></div>
            <div>
              <div className="text-sm font-semibold tracking-tight">Mizan AI</div>
              <div className="text-xs text-neutral-500">Pakistan legal research</div>
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

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://github.com" className="hidden items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 md:inline-flex">
              <GitHubMark className="h-4 w-4" /> GitHub
            </a>
            <Button className="px-5" variant="default">Get Early Access</Button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6">Now with Hybrid RAG Search</Badge>
            <h1 className="mx-auto max-w-5xl text-[clamp(2.9rem,6vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-neutral-950">The AI research agent for Pakistani courts and judgments.</h1>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.8vw,1.25rem)] leading-8 text-neutral-600">Search 232,000+ judgments across 215 courts. Get structured research memos in seconds.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="min-w-48">Start Researching <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button size="lg" variant="outline" className="min-w-40">Read the Docs <BookOpen className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>

          <div className="mt-10 overflow-hidden">
            <div className="hero-marquee flex items-center gap-4 whitespace-nowrap py-3 text-sm text-neutral-700">
              {[...heroTags, ...heroTags].map((tag, index) => <span key={`${tag}-${index}`} className="rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">{tag}</span>)}
            </div>
          </div>

          <div className="float-mockup mt-10 lg:mt-12">
            <Card className="mx-auto max-w-6xl overflow-hidden border-neutral-200 bg-neutral-50 p-4 shadow-[0_40px_100px_rgba(0,0,0,0.08)] sm:p-6">
              <div className="rounded-[28px] border border-neutral-200 bg-white p-4 sm:p-6">
                <div className="flex flex-col gap-4 border-b border-neutral-200 pb-4 lg:flex-row lg:items-center">
                  <div className="flex flex-1 items-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-3"><Search className="h-4 w-4 text-neutral-500" /><div className="text-sm text-neutral-500">Section 302 PPC death penalty reduction grounds</div></div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500"><span className="rounded-full bg-[#f7f1df] px-3 py-1 text-[#8d6710]">Hybrid RAG</span><span className="rounded-full bg-neutral-100 px-3 py-1">Live court data</span></div>
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  {[
                    ['Supreme Court of Pakistan', 'Reduction is more likely when intention is not proved beyond doubt and mitigating facts outweigh aggravating ones.'],
                    ['Lahore High Court', 'Judgments emphasize the factual matrix, prior record, and consistency with recent sentencing precedents.'],
                    ['Sindh High Court', 'The reasoning often turns on whether the accused received a fair opportunity to rebut aggravating evidence.'],
                  ].map(([title, text]) => (
                    <Card key={title} className="border-neutral-200 bg-white"><CardHeader className="p-5 pb-2"><div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8d6710]"><FileText className="h-3.5 w-3.5" />Judgment Result</div><CardTitle className="mt-3 text-base">{title}</CardTitle></CardHeader><CardContent className="p-5 pt-0"><CardDescription>{text}</CardDescription></CardContent></Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <Badge className="mb-5">Hybrid Search</Badge>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">Find relevant judgments, not just keyword matches.</h2>
              <h3 className="mt-4 text-xl font-medium text-neutral-800">Semantic + BM25 hybrid retrieval</h3>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">Mizan AI understands legal intent, citation patterns, and court language so researchers can get the right answer faster than a plain keyword search.</p>
              <ul className="mt-6 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">{hybridBullets.map(({ icon: Icon, label }) => <li key={label} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3"><Icon className="h-4 w-4 text-[#B8860B]" />{label}</li>)}</ul>
              <div className="mt-6 flex flex-wrap gap-2">{hybridChips.map((chip) => <Badge key={chip}>{chip}</Badge>)}</div>
            </div>
            <CodeWindow filename="search.php" language="PHP">{searchQuery}</CodeWindow>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <CodeWindow filename="memo.json" language="JSON">{researchMemo}</CodeWindow>
            <div>
              <Badge className="mb-5">Research Memos</Badge>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">From query to full research memo in one click.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">Turn a legal question into a structured memo with issues, applicable law, precedents, contradictions, and a practical recommendation you can build on immediately.</p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700">{memoSections.map((item) => <li key={item} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3"><BookOpen className="h-4 w-4 text-[#B8860B]" />{item}</li>)}</ul>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Badge className="mb-5">Contradiction Detection</Badge>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">Catch conflicting judgments before they catch you.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">Compare judgments side by side, see where benches diverge, and flag material conflicts before you rely on a precedent in court.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              {[
                'A later bench held that prior conduct can mitigate sentencing when motive remains unproven.',
                'An earlier bench treated the same conduct as aggravating and refused reduction.',
              ].map((text, index) => <Card key={index} className="border-neutral-200 bg-white p-5"><div className="mb-4 flex items-center justify-between"><Badge>Judgment {index + 1}</Badge><span className="text-xs text-neutral-500">Ratio excerpt</span></div><p className="text-sm leading-7 text-neutral-700">{text}</p></Card>)}
              <div className="mx-auto flex h-14 w-40 items-center justify-center rounded-full border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-700 shadow-sm"><AlertTriangle className="mr-2 h-4 w-4" />Conflict Detected</div>
            </div>
          </Reveal>
        </section>

        <section className="border-y border-[#ead9a6] bg-[#f7f1df]"><div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-4 py-12 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left"><div><div className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">Research smarter. What will you argue?</div></div><div className="flex flex-col gap-3 sm:flex-row"><Button size="lg">Start Researching</Button><Button size="lg" variant="outline">Read the Docs</Button></div></div></section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{testimonials.map((item) => <Card key={item.name} className="p-6"><div className="mb-6 text-5xl leading-none text-[#B8860B]">“</div><p className="min-h-28 text-sm leading-7 text-neutral-700">{item.quote}</p><div className="mt-6 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">{item.name.charAt(0)}</div><div><div className="text-sm font-semibold text-neutral-950">{item.name}</div><div className="text-xs text-neutral-500">{item.role} · {item.company}</div></div></div></Card>)}</div></Reveal>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Reveal><div className="grid gap-4 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 sm:grid-cols-2 xl:grid-cols-4 xl:p-8">{stats.map((item) => <div key={item.label} className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm"><div className="text-4xl font-semibold tracking-tight text-neutral-950"><CountUp value={item.value} /></div><div className="mt-2 text-sm text-neutral-600">{item.label}</div></div>)}</div></Reveal>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4"><div><Badge className="mb-5">Supported Courts</Badge><h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">Coverage built for Pakistan’s core court hierarchy.</h2></div></div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{courts.map((court) => <Card key={court.name} className="p-6"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f1df] text-[#8d6710]"><Scale className="h-6 w-6" /></div><h3 className="mt-5 text-lg font-semibold text-neutral-950">{court.name}</h3><p className="mt-2 text-sm leading-6 text-neutral-600">{court.jurisdiction}</p><Separator className="my-5" /><div className="text-xs uppercase tracking-[0.18em] text-neutral-500">Coverage years</div><div className="mt-2 text-sm font-medium text-neutral-800">{court.years}</div></Card>)}</div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="grid gap-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.05)] lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
              <div><Badge className="mb-5">Early Access</Badge><h2 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">Stay updated on Mizan AI&apos;s launch.</h2><p className="mt-4 text-base leading-7 text-neutral-600">Get launch updates and product notes as the platform opens up for early users.</p></div>
              <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]"><Input placeholder="First name" /><Input type="email" placeholder="Email" /><Button className="w-full lg:w-auto" size="lg">Join Waitlist</Button><p className="sm:col-span-2 lg:col-span-3 text-sm text-neutral-500">No spam. Unsubscribe anytime.</p></form>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#B8860B]/10 text-[#B8860B]"><Scale className="h-5 w-5" /></div><div><div className="text-sm font-semibold text-neutral-950">Mizan AI</div><div className="text-xs text-neutral-500">Pakistan legal research agent</div></div></div>
              <p className="mt-4 max-w-md text-sm leading-7 text-neutral-600">A premium research layer for Pakistani legal professionals, designed to surface the right judgment, the right context, and the right argument.</p>
              <div className="mt-6 flex items-center gap-3 text-neutral-500">
                <SocialIconButton href="#" label="GitHub"><GitHubMark className="h-4 w-4" /></SocialIconButton>
                <SocialIconButton href="#" label="X / Twitter"><XMark className="h-4 w-4" /></SocialIconButton>
                <SocialIconButton href="#" label="LinkedIn"><LinkedInMark className="h-4 w-4" /></SocialIconButton>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">{[['Product', ['Platform', 'Features', 'Pricing', 'Launch']], ['Resources', ['Docs', 'Guides', 'API', 'Updates']], ['Legal', ['Privacy', 'Terms', 'Security', 'Status']], ['Community', ['GitHub', 'X / Twitter', 'LinkedIn', 'Contact']]].map(([title, items]) => <div key={title}><div className="text-sm font-semibold text-neutral-950">{title}</div><ul className="mt-4 space-y-3 text-sm text-neutral-600">{items.map((item) => <li key={item}><a href="#" className="transition hover:text-neutral-950">{item}</a></li>)}</ul></div>)}</div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col gap-2 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between"><div>© 2025 Mizan AI</div><div className="flex flex-wrap gap-4"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Status</a></div></div>
        </div>
      </footer>
    </div>
  )
}

export default App
