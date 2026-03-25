import { APIError } from '../utils/APIError';

import type Restaurant from '../models/restaurant';
import type Review from '../models/review';

const BASE_URL = import.meta.env.VITE_BASE_URL;

//Fetches the full list of restaurants from the API.
export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${BASE_URL}/restaurants`);
  if (!response.ok) throw new APIError(response.status);

  const data: Restaurant[] = await response.json();
  return data;
}

// Fetches detailed data for a specific restaurant by ID.
export async function getRestaurantData(id: number): Promise<Restaurant> {
  const response = await fetch(`${BASE_URL}/getRestaurant/${id}`);
  if (!response.ok) throw new APIError(response.status);

  const data: Restaurant = await response.json();
  return data;
}

// Creates a new review for a restaurant and returns it
export async function createReview(
  id: number,
  userName: string,
  content: string,
  rating: number,
): Promise<Review> {
  const response = await fetch(`${BASE_URL}/restaurants/${id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, content, rating }),
  });

  if (!response.ok) throw new APIError(response.status);

  const data: Review = await response.json();
  return data;
}
