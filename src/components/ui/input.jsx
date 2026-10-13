import { cn } from '../../lib/utils'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#FF2D20]/60 focus:ring-4 focus:ring-[#FF2D20]/10',
        className,
      )}
      {...props}
    />
  )
}
