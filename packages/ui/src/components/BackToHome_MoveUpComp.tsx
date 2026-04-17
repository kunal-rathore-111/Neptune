import { BackToHomeButton } from './custom_buttons/BackToHomeButton';
import MoveUpButton from './custom_buttons/MoveUpButton';

export function BackToHome_MoveUpComp() {
  return (
    <div className="flex w-full items-center justify-between">
      <BackToHomeButton />
      <MoveUpButton />
    </div>
  );
}
