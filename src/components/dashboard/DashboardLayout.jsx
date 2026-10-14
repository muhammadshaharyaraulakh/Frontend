import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, BookOpen, FileText, Home, LogOut, Menu, Scale, Search, Settings, Sparkles, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Input } from '../ui/input'

const links = [
  { to: '/dashboard', end: true, icon: Home, label: 'Overview' },
  { to: '/dashboard/search', icon: Search, label: 'Search' },
  { to: '/dashboard/memos', icon: FileText, label: 'Memos' },
  { to: '/dashboard/library', icon: BookOpen, label: 'Library' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

function SidebarContent({ onNavigate }) {
  const navigate = useNavigate()
  return (
    <div className="flex h-full flex-col">
      <Link to="/" className="flex items-center gap-2.5 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FF2D20] text-white">
          <Scale className="h-[18px] w-[18px]" />
        </span>
        <span className="leading-none">
          <span className="block text-[15px] font-semibold tracking-tight">Mizan AI</span>
          <span className="mt-0.5 block text-[11px] text-neutral-500">Research workspace</span>
        </span>
      </Link>
      <nav className="mt-6 grid gap-1">
        {links.map(({ to, end, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                isActive ? 'bg-[#FF2D20]/10 text-[#c81f14]' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950',
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-[#FF2D20]" />
          Early access
        </div>
        <p className="mt-1.5 text-[13px] leading-5 text-neutral-600">25 memo credits left this month.</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full w-2/3 rounded-full bg-[#FF2D20]" />
        </div>
      </div>
      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Log out
        </button>
      </div>
    </div>
  )
}


export default function DashboardLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen min-w-[320px] bg-[#fbfbfa] text-neutral-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-neutral-200 bg-white p-4 lg:block">
        <SidebarContent />
      </aside>
      <div className={cn('fixed inset-0 z-40 lg:hidden', open ? '' : 'pointer-events-none')}>
        <div onClick={() => setOpen(false)} className={cn('absolute inset-0 bg-black/40 transition-opacity', open ? 'opacity-100' : 'opacity-0')} />
        <aside className={cn('absolute inset-y-0 left-0 w-[280px] max-w-[85vw] bg-white p-4 shadow-2xl transition-transform duration-300', open ? 'translate-x-0' : '-translate-x-full')}>
          <div className="mb-4 flex justify-end">
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-lg border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <SidebarContent onNavigate={() => setOpen(false)} />
        </aside>
      </div>
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-5">
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-lg border border-neutral-200 p-2 text-neutral-700 hover:bg-neutral-100 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden min-w-0 flex-1 items-center sm:flex">
              <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-neutral-400" />
              <Input placeholder="Search judgments, sections, courts…" className="h-10 max-w-md pl-10" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button type="button" aria-label="Notifications" className="relative rounded-lg border border-neutral-200 p-2 text-neutral-600 transition hover:bg-neutral-100">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FF2D20]" />
              </button>
              <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200 py-1.5 pl-1.5 pr-2 sm:pr-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF2D20]/12 text-sm font-bold text-[#c81f14]">A</span>
                <span className="hidden leading-tight sm:block">
                  <span className="block text-[13px] font-semibold">Ayesha Khan</span>
                  <span className="block text-[11px] text-neutral-500">Advocate</span>
                </span>
              </div>
            </div>
          </div>
          <div className="px-3 pb-3 sm:hidden">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input placeholder="Search judgments…" className="h-10 pl-10" />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1100px] p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
