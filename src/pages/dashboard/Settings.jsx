import { useRef, useState } from 'react'
import {
  Check, Copy, Download, Eye, EyeOff, KeyRound, Laptop, LogOut, MapPin, Monitor, MonitorSmartphone,
  QrCode, RefreshCw, ShieldCheck, Smartphone, User,
} from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Field } from '../../components/auth/AuthLayout'
import { cn } from '../../lib/utils'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Password', icon: KeyRound },
  { id: 'security', label: '2FA', icon: ShieldCheck },
  { id: 'sessions', label: 'Sessions', icon: MonitorSmartphone },
]

const SECRET = 'MIZN JX7Q 4P2A KQ9D 7TVM'
const INITIAL_SESSIONS = [
  { id: 's1', device: 'MacBook Pro · Chrome', icon: Laptop, location: 'Lahore, Pakistan', ip: '103.91.44.12', active: 'Active now', current: true },
  { id: 's2', device: 'iPhone 15 · Safari', icon: Smartphone, location: 'Karachi, Pakistan', ip: '39.44.118.90', active: '2h ago', current: false },
  { id: 's3', device: 'Windows 11 · Edge', icon: Monitor, location: 'Islamabad, Pakistan', ip: '203.99.12.44', active: '3d ago', current: false },
]

const genCodes = () =>
  Array.from({ length: 8 }, () =>
    `${Math.random().toString(16).slice(2, 6)}-${Math.random().toString(16).slice(2, 6)}`.toUpperCase(),
  )

function QRFake() {
  const n = 21
  const finder = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7)
  const cells = []
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      const on = finder(r, c)
        ? !(r % 6 === 0 || r % 6 === 6 || c % 6 === 0 || c % 6 === 6) || (r % 6 >= 2 && r % 6 <= 4 && c % 6 >= 2 && c % 6 <= 4)
          ? !((r + c) % 4 === 0 && !((r % 6 >= 2 && r % 6 <= 4) && (c % 6 >= 2 && c % 6 <= 4)))
          : true
        : (r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0
      cells.push(
        <span key={`${r}-${c}`} className={cn('h-full w-full', on ? 'bg-neutral-950' : 'bg-white')} />,
      )
    }
  return (
    <div className="mx-auto grid w-44 grid-cols-[repeat(21,1fr)] gap-0 overflow-hidden rounded-xl border-4 border-white bg-white shadow-sm">
      {cells}
    </div>
  )
}

function pwScore(pw) {
  let s = 0
  if (pw.length >= 8) s += 1
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s += 1
  if (/\d/.test(pw)) s += 1
  if (/[^A-Za-z0-9]/.test(pw)) s += 1
  if (pw.length >= 12) s += 1
  return Math.min(s, 4)
}

function ProfileTab() {
  const [saved, setSaved] = useState(false)
  return (
    <Card>
      <CardContent className="grid gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF2D20]/12 text-2xl font-bold text-[#c81f14]">A</span>
          <div className="min-w-0">
            <div className="font-semibold">Ayesha Khan</div>
            <div className="truncate text-sm text-neutral-500">ayesha@example.com · Advocate</div>
          </div>
          <Button size="sm" variant="outline" className="ml-auto">Change photo</Button>
        </div>
        <form
          className="grid gap-4"
          onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500) }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name"><Input defaultValue="Ayesha Khan" /></Field>
            <Field label="Email"><Input type="email" defaultValue="ayesha@example.com" /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone" hint="Used for 2FA SMS fallback."><Input defaultValue="+92 300 1234567" /></Field>
            <Field label="Default court"><Input defaultValue="Supreme Court of Pakistan" /></Field>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#FF2D20]" />
            Email me conflict alerts on saved topics
          </label>
          <Button type="submit" className="w-full sm:w-auto">{saved ? 'Saved ✓' : 'Save changes'}</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function PasswordTab() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [show, setShow] = useState({ c: false, n: false, cf: false })
  const [msg, setMsg] = useState('')
  const score = pwScore(form.next)
  const bars = ['bg-neutral-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500']
  const words = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const pwField = (key, label, vis, setVis, value, ph) => (
    <Field label={label}>
      <div className="relative">
        <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          type={vis ? 'text' : 'password'} required minLength={8} placeholder={ph} className="pl-10 pr-11"
          value={value} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
        <button type="button" onClick={() => setVis(!vis)} aria-label="Toggle visibility"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 hover:text-neutral-700">
          {vis ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </Field>
  )
  return (
    <Card>
      <CardContent className="grid gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm leading-6 text-amber-900">
          <KeyRound className="h-5 w-5 shrink-0" />
          Changing your password signs you out of all other devices for safety.
        </div>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (form.next !== form.confirm) { setMsg('New passwords do not match.'); return }
            if (pwScore(form.next) < 2) { setMsg('Choose a stronger password.'); return }
            setMsg('Password updated. Other sessions were signed out.')
            setForm({ current: '', next: '', confirm: '' })
          }}
        >
          {pwField('current', 'Current password', show.c, (v) => setShow({ ...show, c: v }), form.current, 'Enter current password')}
          {pwField('next', 'New password', show.n, (v) => setShow({ ...show, n: v }), form.next, 'At least 8 characters')}
          {form.next && (
            <div>
              <div className="flex gap-1.5">{[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < score ? bars[score] : 'bg-neutral-200')} />
              ))}</div>
              <p className="mt-1.5 text-xs font-medium text-neutral-500">Strength: {words[score] || 'Too short'}</p>
            </div>
          )}
          {pwField('confirm', 'Confirm new password', show.cf, (v) => setShow({ ...show, cf: v }), form.confirm, 'Repeat new password')}
          {msg && (
            <p className={cn('text-sm font-medium', msg.startsWith('Password updated') ? 'text-emerald-600' : 'text-red-600')}>{msg}</p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit">Update password</Button>
            <a href="/forgot-password"><Button type="button" variant="outline" className="w-full sm:w-auto">Forgot current password?</Button></a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function SecurityTab() {
  const [enabled, setEnabled] = useState(false)
  const [step, setStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [codes] = useState(genCodes)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [err, setErr] = useState('')
  const boxes = useRef([])
  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1)
    const next = [...otp]; next[i] = d; setOtp(next); setErr('')
    if (d && i < 5) boxes.current[i + 1]?.focus()
  }
  const copySecret = async () => {
    try { await navigator.clipboard.writeText(SECRET.replaceAll(' ', '')) } catch { /* noop */ }
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-4 sm:p-6">
          <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl', enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-500')}>
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">Two-factor authentication</h3>
              <Badge variant={enabled ? 'default' : 'secondary'}>{enabled ? 'Enabled' : 'Disabled'}</Badge>
            </div>
            <p className="mt-0.5 text-sm text-neutral-500">TOTP via Google Authenticator, Authy or 1Password.</p>
          </div>
          <button
            type="button" role="switch" aria-checked={enabled}
            onClick={() => { setEnabled(!enabled); setStep(enabled ? 0 : 1); setOtp(['', '', '', '', '', '']); setErr('') }}
            className={cn('relative h-7 w-12 shrink-0 rounded-full transition', enabled ? 'bg-emerald-500' : 'bg-neutral-300')}
          >
            <span className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', enabled ? 'left-6' : 'left-1')} />
          </button>
        </CardContent>
      </Card>

      {!enabled && step === 0 && (
        <Card>
          <CardContent className="grid gap-2 p-4 text-sm leading-6 text-neutral-600 sm:p-6">
            <p><b className="text-neutral-900">Why 2FA?</b> Even if someone steals your password, they can&apos;t log in without the 6-digit code from your phone.</p>
            <div className="mt-1"><Button onClick={() => setStep(1)}>Enable 2FA</Button></div>
          </CardContent>
        </Card>
      )}

      {!enabled && step >= 1 && (
        <Card>
          <CardContent className="grid gap-5 p-4 sm:p-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold', step >= s ? 'bg-[#FF2D20] text-white' : 'bg-neutral-200 text-neutral-500')}>{s}</span>
                  {s < 3 && <span className={cn('h-0.5 flex-1 rounded', step > s ? 'bg-[#FF2D20]' : 'bg-neutral-200')} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="grid gap-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-semibold"><QrCode className="h-4 w-4 text-[#FF2D20]" /> Step 1 — Scan this QR code</div>
                <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-5"><QRFake /></div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">Can&apos;t scan? Enter key manually</p>
                  <button type="button" onClick={copySecret} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 font-mono text-sm tracking-widest text-white transition hover:bg-neutral-800">
                    {SECRET} {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 opacity-60" />}
                  </button>
                </div>
                <div><Button onClick={() => setStep(2)}>I&apos;ve scanned it — Continue</Button></div>
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4">
                <p className="text-center text-sm font-semibold">Step 2 — Enter the 6-digit code from your app</p>
                <div className="flex justify-center gap-2" onPaste={(e) => {
                  const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
                  if (t) { setOtp(t.padEnd(6, '').split('')); boxes.current[Math.min(t.length, 5)]?.focus(); e.preventDefault() }
                }}>
                  {otp.map((d, i) => (
                    <input
                      key={i} ref={(el) => { boxes.current[i] = el }} inputMode="numeric" maxLength={1}
                      value={d} onChange={(e) => setDigit(i, e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Backspace' && !otp[i] && i > 0) boxes.current[i - 1]?.focus() }}
                      aria-label={`Digit ${i + 1}`}
                      className="h-12 w-10 rounded-lg border border-neutral-300 bg-white text-center text-lg font-bold outline-none transition focus:border-[#FF2D20] focus:ring-4 focus:ring-[#FF2D20]/10 sm:w-12"
                    />
                  ))}
                </div>
                {err && <p className="text-center text-sm font-medium text-red-600">{err}</p>}
                <div className="flex flex-col justify-center gap-2 sm:flex-row">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button
                    disabled={otp.join('').length < 6}
                    onClick={() => {
                      if (otp.join('') === '000000') { setErr('That code looks wrong — try the current code in your app.'); return }
                      setStep(3)
                    }}
                  >
                    Verify and enable
                  </Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="grid gap-4">
                <p className="text-center text-sm font-semibold">Step 3 — Save your backup codes</p>
                <p className="mx-auto max-w-md text-center text-[13px] leading-6 text-neutral-500">Store these somewhere safe. Each code works once if you lose your phone.</p>
                <div className="grid grid-cols-1 gap-2 rounded-xl bg-neutral-950 p-4 font-mono text-[13px] text-emerald-300 sm:grid-cols-2">
                  {codes.map((c) => <span key={c} className="rounded-md bg-white/5 px-3 py-2 text-center">{c}</span>)}
                </div>
                <div className="flex flex-col justify-center gap-2 sm:flex-row">
                  <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download codes</Button>
                  <Button onClick={() => { setEnabled(true); setStep(0) }}><Check className="mr-2 h-4 w-4" /> Done — enable 2FA</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {enabled && (
        <Card>
          <CardContent className="grid gap-3 p-4 sm:p-6">
            <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-900">
              <Check className="h-5 w-5 shrink-0" /> 2FA is protecting your account. New logins need your authenticator code.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => setStep(1)}><RefreshCw className="mr-2 h-4 w-4" /> Regenerate backup codes</Button>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => { setEnabled(false); setStep(0) }}>Disable 2FA</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function SessionsTab() {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS)
  const [revoking, setRevoking] = useState(null)
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4 sm:p-6">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold">Where you&apos;re logged in</h3>
            <p className="mt-0.5 text-sm text-neutral-500">{sessions.length} active {sessions.length === 1 ? 'session' : 'sessions'}. Revoke any you don&apos;t recognise.</p>
          </div>
          <Button
            size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50"
            disabled={sessions.filter((s) => !s.current).length === 0}
            onClick={() => setSessions((prev) => prev.filter((s) => s.current))}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out others
          </Button>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {sessions.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex flex-wrap items-center gap-3 p-4 sm:p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                <s.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1 basis-40">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-semibold">{s.device}</span>
                  {s.current
                    ? <Badge variant="default">This device</Badge>
                    : <Badge variant="secondary">{s.active}</Badge>}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{s.location}</span>
                  <span className="font-mono">{s.ip}</span>
                </div>
              </div>
              {!s.current && (
                <Button size="sm" variant="outline" className="ml-auto border-red-200 text-red-600 hover:bg-red-50" onClick={() => setRevoking(s)}>
                  Revoke
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        {sessions.length === 0 && (
          <Card><CardContent className="p-8 text-center text-sm text-neutral-500">No active sessions.</CardContent></Card>
        )}
      </div>
      {revoking && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-3 sm:items-center" onClick={() => setRevoking(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold">Revoke this session?</h3>
            <p className="mt-1 text-sm leading-6 text-neutral-600"><b className="text-neutral-900">{revoking.device}</b> ({revoking.ip}) will be signed out immediately.</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setRevoking(null)}>Keep it</Button>
              <Button
                className="flex-1 !bg-red-600 hover:!bg-red-700"
                onClick={() => { setSessions((prev) => prev.filter((x) => x.id !== revoking.id)); setRevoking(null) }}
              >
                Revoke
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Settings() {
  const [tab, setTab] = useState('profile')
  return (
    <div className="grid max-w-3xl gap-4">
      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Settings ]</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Account settings</h1>
        <p className="mt-1 text-sm text-neutral-600">Profile, password, two-factor auth and active sessions.</p>
      </div>
      <div className="grid grid-cols-4 gap-1 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-sm sm:inline-flex sm:w-auto sm:gap-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              'flex min-w-0 flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition sm:flex-row sm:gap-2 sm:px-4 sm:text-sm',
              tab === id ? 'bg-neutral-950 text-white shadow' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
      {tab === 'profile' && <ProfileTab />}
      {tab === 'password' && <PasswordTab />}
      {tab === 'security' && <SecurityTab />}
      {tab === 'sessions' && <SessionsTab />}
    </div>
  )
}

