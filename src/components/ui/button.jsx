import { cn } from '../../lib/utils'

const variants = {
  default:
    'bg-[#FF2D20] text-white shadow-[0_10px_30px_rgba(255,45,32,0.35)] hover:-translate-y-px hover:bg-[#f02418] hover:shadow-[0_14px_36px_rgba(255,45,32,0.4)] active:translate-y-0',
  outline:
    'border border-neutral-300 bg-white text-neutral-900 shadow-sm hover:-translate-y-px hover:border-neutral-400 hover:bg-neutral-50',
  ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
}

const sizes = {
  default: 'h-10 px-5 text-sm',
  sm: 'h-9 px-4 text-sm',
  lg: 'h-12 px-7 text-[15px]',
}

export function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }) {
  const Comp = asChild ? 'span' : 'button'

  return (
    <Comp
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D20]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
