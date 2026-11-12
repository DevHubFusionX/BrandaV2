import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes and conditional class names cleanly
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export type Currency = "NGN" | "USD";

/**
 * Formats a numeric price into a localized currency string.
 * Default currency is Nigerian Naira (NGN).
 *
 * Examples:
 * - formatPrice(4500, 'NGN') => "₦4,500"
 * - formatPrice(12, 'USD') => "$12.00"
 */
export function formatPrice(
  amount: number,
  currency: Currency = "NGN",
  options?: Intl.NumberFormatOptions
): string {
  const locale = currency === "NGN" ? "en-NG" : "en-US";
  const defaultFractionDigits = currency === "NGN" ? (amount % 1 === 0 ? 0 : 2) : 2;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: options?.minimumFractionDigits ?? defaultFractionDigits,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    ...options,
  }).format(amount);
}
