import { useState } from 'react'
import { Filter, Scale, Search } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'

const results = [
  { court: 'Supreme Court', cite: 'PLD 2023 SC 45', title: 'Post-arrest bail — further enquiry u/s 497(2) CrPC', year: '2023', tag: 'Bail' },
  { court: 'Lahore High Court', cite: '2022 LHC 1180', title: 'Pre-arrest bail — mala fide and ulterior motive', year: '2022', tag: 'Bail' },
  { court: 'Sindh High Court', cite: 'PLD 2021 Sindh 302', title: 'Summary suits — leave to defend under Order XXXVII', year: '2021', tag: 'Civil' },
  { court: 'Peshawar High Court', cite: '2020 PHC 88', title: 'Article 199 — alternate remedy and maintainability', year: '2020', tag: 'Constitutional' },
]

export default function SearchPage() {
  const [q, setQ] = useState('')
  const filtered = results.filter((r) => (r.title + r.court + r.cite).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="grid gap-4">
      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Search ]</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Judgment search</h1>
        <p className="mt-1 text-sm text-neutral-600">Hybrid retrieval over 232,000+ judgments.</p>
      </div>
      <Card>
        <CardContent className="grid gap-3 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by facts, section, citation…" className="pl-10" />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All courts', 'Supreme Court', 'LHC', 'SHC', 'PHC', 'IHC'].map((c, i) => (
              <Badge key={c} variant={i === 0 ? 'default' : 'secondary'}>
                {c}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {filtered.map((r) => (
          <Card key={r.cite} className="card-lift">
            <CardContent className="flex items-start gap-3 p-4 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF2D20]/10 text-[#c81f14]">
                <Scale className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{r.tag}</Badge>
                  <span className="font-mono text-xs text-neutral-500">{r.cite} · {r.year}</span>
                </div>
                <h3 className="mt-1.5 text-[15px] font-semibold leading-6">{r.title}</h3>
                <p className="mt-0.5 text-sm text-neutral-500">{r.court} of Pakistan</p>
              </div>
              <Button size="sm" variant="outline" className="hidden shrink-0 sm:inline-flex">
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-sm text-neutral-500">
              No judgments match “{q}”. Try a citation or section number.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
