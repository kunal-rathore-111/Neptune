import { AnimatedThemeToggler } from '../animated-theme-toggler';
import { ButtonsClass } from '../utils/styles';
import { cn } from '@repo/libs';

export function ThemeToggleButton({ className }: { className?: string }) {
  return <AnimatedThemeToggler className={cn(ButtonsClass, className)} />;
}
