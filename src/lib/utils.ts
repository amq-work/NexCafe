import { twMerge } from 'tailwind-merge';

type ClassValue = string | number | null | false | undefined | ClassValue[];

function flatten(input: ClassValue[]): string[] {
  const out: string[] = [];
  for (const item of input) {
    if (!item) continue;
    if (Array.isArray(item)) {
      out.push(...flatten(item));
    } else {
      out.push(String(item));
    }
  }
  return out;
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(flatten(inputs).join(' '));
}
