import { cn } from '@repo/libs';
import { ArrowBigLeftDashIcon } from '@repo/icons';
import { useRef } from 'react';
import { animateIconUsingRef, type IconHandle } from '../utils/IconAnimateRef';
import { ButtonsClass } from '../utils/styles';

import { useNavigate } from 'react-router';

export function BackToHomeButton({ className }: { className?: string }) {
  const AnimateRef = useRef<IconHandle>(null);
  const navigate = useNavigate();
  return (
    <div
      className={cn(ButtonsClass, 'flex cursor-pointer gap-2 px-2 py-1 text-sm', className)}
      {...animateIconUsingRef(AnimateRef)}
      onClick={() => {
        navigate('/');
      }}>
      <ArrowBigLeftDashIcon size={18} ref={AnimateRef} /> Back to Home
    </div>
  );
}
