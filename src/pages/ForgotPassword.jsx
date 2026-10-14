import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Mail, Send } from 'lucide-react'
import AuthLayout, { Field } from '../components/auth/AuthLayout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Forgot your password?"
      lead="Enter the email linked to your account and we'll send you a secure reset link."
    >
      {sent ? (
        <div className="grid gap-4 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">Check your inbox</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">
              We sent a reset link to <span className="font-semibold text-neutral-900">{email || 'your email'}</span>.
              It expires in 30 minutes.
            </p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
            Try a different email
          </Button>
          <Link to="/login" className="text-sm font-semibold text-neutral-900 hover:text-[#FF2D20]">
            ← Back to log in
          </Link>
        </div>
      ) : (
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <Field label="Email address" hint="Use the Gmail / email you signed up with.">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="email"
                required
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Field>
          <Button type="submit" size="lg" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send reset link
          </Button>
          <Link to="/login" className="text-center text-sm font-semibold text-neutral-900 hover:text-[#FF2D20]">
            ← Back to log in
          </Link>
        </form>
      )}
    </AuthLayout>
  )
}
