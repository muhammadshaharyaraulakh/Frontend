import { cn } from '../../lib/utils'

export function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-[#e6d7ac] bg-[#f7f1df] px-3 py-1 text-xs font-medium text-[#8d6710]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
