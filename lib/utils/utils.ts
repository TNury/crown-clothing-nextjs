import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(rawPrice: number, currency: string) {
  let formattedPrice = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
  }).format(Number(rawPrice));

  return `${currency}${formattedPrice}`;
}
