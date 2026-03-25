import type { CuisineOptions } from './filters';
import type Review from './review';

export interface Time {
  hours: number;
  minutes: number;
  period: 'AM' | 'PM';
}

export default interface Restaurant {
  id: number;
  name: string;
  description: string;
  img: string;
  country: CuisineOptions;
  price: '$' | '$$' | '$$$';
  location: string;
  hours: {
    open: Time;
    close: Time;
  };
  reviews: Review[];
}
