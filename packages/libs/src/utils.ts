import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAndCleanUrl = (inputUrl: string): string => {
  let cleanUrl = inputUrl.trim();
  // If the user forgot http:// or https://, add it automatically!
  if (cleanUrl && !/^https?:\/\//i.test(cleanUrl)) {
    cleanUrl = 'https://' + cleanUrl;
  }
  return cleanUrl;
};
