import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText, Gavel, Library, Search } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

const stats = [
  { label: 'Memos generated', value: '18', hint: '+4 this week' },
  { label: 'Saved judgments', value: '132', hint: 'across 6 courts' },
  { label: 'Searches run', value: '246', hint: 'avg. 1.8s each' },
  { label: 'Conflicts flagged', value: '7', hint: 'needs review' },
]

const recent = [
  { title: 'Bail u/s 497 CrPC — post-arrest principles', meta: 'Supreme Court · 12 cites · 2m ago' },
  { title: 'Order XXXVII CPC summary suits in Karachi', meta: 'Sindh High Court · 8 cites · 1h ago' },
  { title: 'Article 199 maintainability — alternate remedy', meta: 'Lahore High Court · 15 cites · yesterday' },
]

export default function Overview() {
  return (
    <div className="grid gap-4 sm:gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Overview ]</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Assalam-o-Alaikum, Ayesha.</h1>
          <p className="mt-1 text-sm leading-6 text-neutral-600">Pick up research where you left off.</p>
        </div>
        <Link to="/dashboard/search">
          <Button>
            <Search className="mr-2 h-4 w-4" />
            New search
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input placeholder='Try: "pre-arrest bail 498 CrPC Supreme Court"' className="pl-10" />
            </div>
            <Button className="shrink-0">Ask Mizan</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 sm:p-5">
              <div className="text-[13px] font-medium text-neutral-500">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-neutral-500">{s.hint}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] xl:gap-5">
        <Card>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Recent research</h2>
              <Link to="/dashboard/memos" className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF2D20]">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-3 divide-y divide-neutral-100">
              {recent.map((r) => (
                <li key={r.title} className="flex items-start gap-3 py-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-neutral-900">{r.title}</span>
                    <span className="mt-0.5 block text-xs text-neutral-500">{r.meta}</span>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-5">
            <h2 className="text-[15px] font-semibold">Quick actions</h2>
            <div className="mt-3 grid gap-2">
              {[
                { to: '/dashboard/search', icon: Search, t: 'Hybrid judgment search', d: 'Vector + BM25 + RRF' },
                { to: '/dashboard/memos', icon: FileText, t: 'Draft a memo', d: 'Issue · Law · Precedents' },
                { to: '/dashboard/library', icon: Library, t: 'Open library', d: 'Saved courts & topics' },
              ].map(({ to, icon: Icon, t, d }) => (
                <Link
                  key={to + t}
                  to={to}
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3 transition hover:-translate-y-px hover:border-neutral-300 hover:shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FF2D20]/10 text-[#c81f14]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{t}</span>
                    <span className="block truncate text-xs text-neutral-500">{d}</span>
                  </span>
                  <Gavel className="ml-auto h-4 w-4 shrink-0 text-neutral-300" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
