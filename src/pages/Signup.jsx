import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import AuthLayout, { Divider, Field } from '../components/auth/AuthLayout'
import { GoogleButton } from '../components/auth/GoogleButton'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function Signup() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account."
      lead="Start researching 232,000+ Pakistani judgments with hybrid AI search."
    >
      <div className="grid gap-4">
        <GoogleButton onClick={() => navigate('/dashboard')}>Sign up with Google</GoogleButton>
        <Divider />
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/dashboard')
          }}
        >
          <Field label="Full name">
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                required
                placeholder="e.g. Ayesha Khan"
                className="pl-10"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </Field>
          <Field label="Email address">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="email"
                required
                placeholder="you@example.com"
                className="pl-10"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </Field>
          <Field label="Password" hint="Must be at least 8 characters with a number.">
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type={show ? 'text' : 'password'}
                required
                minLength={8}
                placeholder="Create a strong password"
                className="pl-10 pr-11"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
          <label className="flex cursor-pointer items-start gap-2 text-sm leading-6 text-neutral-600">
            <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-neutral-300 accent-[#FF2D20]" />
            <span>
              I agree to the <span className="font-semibold text-neutral-900">Terms</span> and{' '}
              <span className="font-semibold text-neutral-900">Privacy Policy</span>.
            </span>
          </label>
          <Button type="submit" size="lg" className="w-full">
            Create account
          </Button>
        </form>
        <p className="text-center text-sm text-neutral-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-neutral-950 hover:text-[#FF2D20]">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
