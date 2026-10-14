import { cn } from '../../lib/utils'

export function Badge({ className, variant = 'secondary', children, ...props }) {
  const styles = {
    default: 'border-[#FF2D20]/25 bg-[#FF2D20]/10 text-[#c81f14]',
    secondary: 'border-neutral-200 bg-neutral-100 text-neutral-700',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm',
        styles[variant] ?? styles.secondary,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
