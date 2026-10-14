import { useState } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Field } from '../../components/auth/AuthLayout'

export default function Settings() {
  const [saved, setSaved] = useState(false)
  return (
    <div className="grid max-w-2xl gap-4">
      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF2D20]">[ Settings ]</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Account settings</h1>
        <p className="mt-1 text-sm text-neutral-600">Manage your profile and preferences.</p>
      </div>
      <Card>
        <CardContent className="grid gap-4 p-4 sm:p-5">
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              setSaved(true)
              setTimeout(() => setSaved(false), 2500)
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <Input defaultValue="Ayesha Khan" />
              </Field>
              <Field label="Email">
                <Input type="email" defaultValue="ayesha@example.com" />
              </Field>
            </div>
            <Field label="Default court" hint="Used to prioritise results in hybrid search.">
              <Input defaultValue="Supreme Court of Pakistan" />
            </Field>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#FF2D20]" />
              Email me conflict alerts on saved topics
            </label>
            <Button type="submit" className="w-full sm:w-auto">
              {saved ? 'Saved ✓' : 'Save changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
