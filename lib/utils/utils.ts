import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(rawPrice: number, currency: string = '€') {
  let price = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
  }).format(Number(rawPrice));

  let formattedPrice: string;

  if (currency === 'R$') {
    formattedPrice = `${currency} ${price}`;
  } else {
    formattedPrice = `${price} ${currency}`;
  }

  return formattedPrice;
}
