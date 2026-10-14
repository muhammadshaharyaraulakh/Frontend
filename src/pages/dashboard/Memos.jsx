import { FileText, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'

const memos = [
  { t: 'Bail memo — 497 CrPC further enquiry', m: 'Supreme Court · 12 cites · updated 2m ago', s: 'Ready' },
  { t: 'Order XXXVII leave-to-defend strategy', m: 'SHC · 8 cites · updated 1h ago', s: 'Draft' },
  { t: 'Art. 199 maintainability note', m: 'LHC · 15 cites · updated yesterday', s: 'Ready' },
  { t: 'Sentencing trends — 9-C CNSA cases', m: 'PHC · 6 cites · updated 2d ago', s: 'Review' },
]

export default function Memos() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Memos ]</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Research memos</h1>
          <p className="mt-1 text-sm text-neutral-600">Issue · Law · Precedents · Conflicts · Recommendation.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New memo
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {memos.map((m) => (
          <Card key={m.t} className="card-lift">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                  <FileText className="h-5 w-5" />
                </span>
                <Badge variant={m.s === 'Ready' ? 'default' : 'secondary'}>{m.s}</Badge>
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-6">{m.t}</h3>
              <p className="mt-1 text-[13px] text-neutral-500">{m.m}</p>
              <Link to="/dashboard/search" className="mt-3 inline-block text-sm font-semibold text-[#FF2D20]">
                Open memo →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
