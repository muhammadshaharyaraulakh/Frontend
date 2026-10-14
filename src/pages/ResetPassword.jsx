import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Eye, EyeOff, Lock } from 'lucide-react'
import AuthLayout, { Field } from '../components/auth/AuthLayout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [done, setDone] = useState(false)

  return (
    <AuthLayout
      eyebrow="Set new password"
      title="Reset your password."
      lead="Choose a new strong password for your Mizan AI account."
    >
      {done ? (
        <div className="grid gap-4 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">Password updated</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">You can now log in with your new password.</p>
          </div>
          <Button size="lg" className="w-full" onClick={() => navigate('/login')}>
            Go to log in
          </Button>
        </div>
      ) : (
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            setDone(true)
          }}
        >
          <Field label="New password" hint="At least 8 characters, include a number and symbol.">
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type={show ? 'text' : 'password'}
                required
                minLength={8}
                placeholder="Enter new password"
                className="pl-10 pr-11"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 transition hover:text-neutral-700"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>
          <Field label="Confirm new password">
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input type={show ? 'text' : 'password'} required minLength={8} placeholder="Repeat new password" className="pl-10" />
            </div>
          </Field>
          <Button type="submit" size="lg" className="w-full">
            Reset password
          </Button>
          <Link to="/login" className="text-center text-sm font-semibold text-neutral-900 hover:text-[#FF2D20]">
            ← Back to log in
          </Link>
        </form>
      )}
    </AuthLayout>
  )
}
