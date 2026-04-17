import { cn } from '@repo/libs';

export function DotComp({ className }: { className?: string }) {
  return <div className={cn('h-1 w-1 rounded-full bg-orange-500 dark:bg-blue-500', className ?? '')} />;
}
