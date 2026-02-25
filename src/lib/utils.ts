import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format amount as LKR (Sri Lankan Rupees) for display across the app */
export function formatCurrency(amount: number): string {
  return "LKR " + amount.toLocaleString();
}
