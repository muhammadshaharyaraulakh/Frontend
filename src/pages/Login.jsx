import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import AuthLayout, { Divider, Field } from '../components/auth/AuthLayout'
import { GoogleButton } from '../components/auth/GoogleButton'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function Login() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to Mizan AI."
      lead="Access your research workspace, saved memos and court coverage."
    >
      <div className="grid gap-4">
        <GoogleButton onClick={() => navigate('/dashboard')}>Continue with Google</GoogleButton>
        <Divider />
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/dashboard')
          }}
        >
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
          <Field label="Password">
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type={show ? 'text' : 'password'}
                required
                placeholder="Enter your password"
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
          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-neutral-600">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 accent-[#FF2D20]" defaultChecked />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-semibold text-[#FF2D20] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" size="lg" className="w-full">
            Log in
          </Button>
        </form>
        <p className="text-center text-sm text-neutral-600">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-neutral-950 hover:text-[#FF2D20]">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
