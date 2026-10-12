import { cn } from '../../lib/utils'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-full border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20',
        className,
      )}
      {...props}
    />
  )
}
