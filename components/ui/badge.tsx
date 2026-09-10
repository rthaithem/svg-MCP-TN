import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900',
        secondary: 'border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
        outline: 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
        success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        sky: 'border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400',
        amber: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
        purple: 'border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}
