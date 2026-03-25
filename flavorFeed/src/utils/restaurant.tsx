import type { Time } from '../models/restaurant';
import type { ReviewsSortType } from '../models/review';
import type Review from '../models/review';

// Returns a formatted string representing opening and closing hours (HH:MM AM/PM).
export const formatWorkingHours = (open: Time, close: Time): string => {
  const format = (value: number) => String(value).padStart(2, '0');
  let strHours = `${format(open.hours)}:${format(open.minutes)} ${open.period}`;
  strHours += ' - ';
  strHours += `${format(close.hours)}:${format(close.minutes)} ${close.period}`;
  return strHours;
};

// Returns a human-readable label for the number of reviews.
export const getReviewsLabel = (reviews: Review[]): string => {
  if (!Array.isArray(reviews)) return '(No reviews)';

  const count = reviews.length;
  if (count === 0) return '(No reviews)';
  if (count === 1) return '(1 review)';
  return `(${count} reviews)`;
};

// Returns first and last initials
export const getAvatarInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);

  const firstInitial = words[0]?.[0] ?? '';
  const lastInitial = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : '';

  return (firstInitial + lastInitial).toUpperCase();
};

// Calculates the average rating of a restaurant.
export const avgRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

// Sorts reviews based on sorting type (using spread => prevents state value changes)
export const reviewsSort = (reviews: Review[], sortType: ReviewsSortType) => {
  switch (sortType) {
    case 'date-descending':
      return [...reviews].sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

    default:
      return reviews;
  }
};

// Returns a human-friendly relative time string based on the given date.
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff: number = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just Now';
  else if (minutes < 60) return `${minutes} min ago`;
  else if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  else if (days === 1) return 'Yesterday';
  else if (days < 7) return `${days} days ago`;
  else {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
};
