import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(date:string) {
    return new Date(date).toLocaleDateString('en-US',{
        year:'numeric',
        month:'long',
        day:'numeric',
    });
}

export function formatRuntime(minutes:number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}

export function formatCurrency(amount:number) {
  return new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD',
    minimumFractionDigits:2,
    maximumFractionDigits:2,
  }).format(amount);
}