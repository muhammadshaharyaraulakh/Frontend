import { ChevronDown } from 'lucide-react'

export function NavigationMenu({ children }) {
  return <nav className="hidden items-center gap-1 lg:flex">{children}</nav>
}

export function NavigationMenuList({ children }) {
  return <div className="flex items-center gap-1">{children}</div>
}

export function NavigationMenuItem({ children }) {
  return <div className="relative group">{children}</div>
}

export function NavigationMenuTrigger({ children }) {
  return (
    <button className="flex h-10 items-center gap-1 rounded-full px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950">
      {children}
      <ChevronDown className="h-4 w-4" />
    </button>
  )
}

export function NavigationMenuContent({ children }) {
  return (
    <div className="invisible absolute left-1/2 top-full z-20 mt-3 w-64 -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-3 opacity-0 shadow-[0_24px_60px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
      {children}
    </div>
  )
}

export function NavigationMenuLink({ href = '#', children }) {
  return (
    <a
      href={href}
      className="block rounded-xl px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
    >
      {children}
    </a>
  )
}
