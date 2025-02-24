import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
}

export const getToken = () => localStorage.getItem("token");

export const isLogin = () => !!localStorage.getItem("token");