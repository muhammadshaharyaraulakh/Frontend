import { cn } from '../../lib/utils'

export function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
