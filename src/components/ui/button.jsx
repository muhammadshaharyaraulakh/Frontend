import { cn } from '../../lib/utils'

const variants = {
  default:
    'bg-[#B8860B] text-white shadow-[0_16px_40px_rgba(184,134,11,0.25)] hover:bg-[#9e7308]',
  outline:
    'border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50',
  ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
}

const sizes = {
  default: 'h-11 px-5 text-sm',
  sm: 'h-9 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }) {
  const Comp = asChild ? 'span' : 'button'

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
