import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUniqueID() {
  return Date.now().toString();
}

export function getDaysDifference(date) {
  const today = new Date();
  const diffInMs = new Date(date) - today;
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}
