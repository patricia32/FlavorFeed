export default interface Review {
  id: string;
  userName: string;
  rating: number;
  content: string;
  timestamp: string;
}

export type ReviewsSortType =
  | 'date-ascending'
  | 'date-descending'
  | 'rating-ascending'
  | 'rating-descending';
