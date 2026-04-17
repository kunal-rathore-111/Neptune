import { HomeButton } from './custom_buttons/HomeButton';
import { ThemeToggleButton } from './custom_buttons/ThemeButton';

export function ThemeHomeComp() {
  return (
    <div className="flex w-full items-center justify-between">
      <ThemeToggleButton />
      <HomeButton />
    </div>
  );
}
