import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date) {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (diffInSeconds < 0) return 'in the future'
  if (diffInSeconds < 5) return 'just now'
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`
  if (diffInSeconds < 63072000) return '1yr ago'
  return `${Math.floor(diffInSeconds / 31536000)}yrs ago`
}

export function calculateNPS(ratings: number[]): number | string {
  if (ratings.length === 0) return "N/A"
  
  // Adjusted for 1-5 scale: 5=Promoter, 1-3=Detractor, 4=Passive
  const promoters = ratings.filter(r => r === 5).length
  const detractors = ratings.filter(r => r <= 3).length
  const total = ratings.length
  
  const score = Math.round(((promoters - detractors) / total) * 100)
  return score > 0 ? `+${score}` : score.toString()
}

export function calculateSentiment(feedbacks: { rating: number | null }[]): {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
} {
  const ratings = feedbacks.map(f => f.rating || 0).filter(r => r > 0);
  const total = ratings.length;
  if (total === 0) return { positive: 0, neutral: 0, negative: 0, total: 0 };

  const positive = ratings.filter(r => r >= 4).length;
  const neutral = ratings.filter(r => r === 3).length;
  const negative = ratings.filter(r => r <= 2).length;

  return {
    positive: Math.round((positive / total) * 100),
    neutral: Math.round((neutral / total) * 100),
    negative: Math.round((negative / total) * 100),
    total
  };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-GB').format(num)
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return num.toString()
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}
