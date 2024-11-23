import { clsx, type ClassValue } from "clsx"
import { addMonths, format } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN"
});

export const formatDateRange = (date?: DateFilters) => {
  const defaultFrom = new Date();
  const defaultTo = addMonths(defaultFrom, 1);

  if (!date?.from) {
    return `${format(defaultFrom, 'LLL dd')} - ${format(defaultTo, "LLL dd, y")}`
  }

  if (date.to) {
    return `${format(date.from, 'LLL dd')} - ${format(date.to, "LLL dd, y")}`
  }

  return format(date.from, 'LLL dd, y')
}