import { BookOpen, Bookmark } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'

const groups = [
  { t: 'Bail & Criminal Procedure', n: '48 saved', d: '497 · 498 · 439 CrPC' },
  { t: 'Constitutional — Art. 199', n: '31 saved', d: 'Maintainability & remedy' },
  { t: 'Civil — Order XXXVII', n: '27 saved', d: 'Summary suits, Karachi' },
  { t: 'Narcotics — CNSA s. 9', n: '26 saved', d: 'Sentencing & bail trends' },
]

export default function Library() {
  return (
    <div className="grid gap-4">
      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Library ]</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Your library</h1>
        <p className="mt-1 text-sm text-neutral-600">Collections of saved judgments and topics.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {groups.map((g) => (
          <Card key={g.t} className="card-lift">
            <CardContent className="p-4 sm:p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF2D20]/10 text-[#c81f14]">
                <BookOpen className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-[15px] font-semibold">{g.t}</h3>
              <p className="mt-1 text-[13px] text-neutral-500">{g.d}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
                <Bookmark className="h-3.5 w-3.5" /> {g.n}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
