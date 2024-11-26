import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}

export function formatName(fullName: string): string {
  const names = fullName.trim().split(' ');
  if (names.length === 1) return names[0];
  
  const firstName = names[0];
  const lastInitial = names[names.length - 1][0];
  return `${firstName} ${lastInitial}.`;
}

export function searchContent(query: string, content: string): boolean {
  const searchTerms = query.toLowerCase().split(' ');
  const contentLower = content.toLowerCase();
  
  return searchTerms.every(term => contentLower.includes(term));
}

export const IMAGE_SOURCES = [
  {
    name: 'Unsplash',
    url: 'https://unsplash.com',
    description: 'Ücretsiz yüksek kaliteli fotoğraflar',
  },
  {
    name: 'Pexels',
    url: 'https://pexels.com',
    description: 'Ücretsiz stok fotoğraflar ve videolar',
  },
  {
    name: 'Pixabay',
    url: 'https://pixabay.com',
    description: 'Telifsiz görseller ve videolar',
  },
];