import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { avgRating } from '../../utils/restaurant';

import { RestaurantCard } from './RestaurantCard';

import type Restaurant from '../../models/restaurant';

const mockRestaurant: Restaurant = {
  id: 1,
  name: 'Pizza Plaza',
  description: 'Best pizza in town',
  img: '1.png',
  country: 'Italian',
  price: '$',
  location: 'Romanei 43',
  hours: {
    open: { hours: 12, minutes: 0, period: 'PM' },
    close: { hours: 23, minutes: 0, period: 'PM' },
  },
  reviews: [
    {
      id: 'review-1',
      userName: 'John Snow',
      rating: 4,
      content: 'Really nice place!',
      timestamp: new Date().toString(),
    },
    {
      id: 'review-2',
      userName: 'Arya Stark',
      rating: 5,
      content: 'Amazing!',
      timestamp: new Date().toString(),
    },
  ],
};

const renderCard = () =>
  render(
    <BrowserRouter>
      <RestaurantCard restaurant={mockRestaurant} />
    </BrowserRouter>,
  );

describe('RestaurantCard tests', () => {
  it('renders restaurant name', () => {
    renderCard();

    const card = screen.getByRole('link', { name: 'Pizza Plaza' });
    const heading = within(card).getByRole('heading', { level: 2, name: 'Pizza Plaza' });

    expect(heading).toBeInTheDocument();
  });

  it('renders restaurant image', () => {
    renderCard();

    const card = screen.getByRole('link', { name: 'Pizza Plaza' });
    const image = within(card).getByRole('img', { name: 'Pizza Plaza' });
    expect(image).toHaveAttribute('src', '1.png');
  });

  it('renders restaurant cuisine', () => {
    renderCard();

    const card = screen.getByRole('link', { name: 'Pizza Plaza' });
    const cuisineSpan = within(card).getByLabelText('Cuisine');
    expect(cuisineSpan).toHaveTextContent('Italian');
  });

  it('renders restaurant total rating', () => {
    renderCard();

    const expectedRating = avgRating(mockRestaurant.reviews);
    const ratingDivLabel = `Rating ${expectedRating} ${expectedRating === 1 ? 'star' : 'stars'}`;

    if (expectedRating > 0) {
      const ratingDiv = screen.getByLabelText(ratingDivLabel);
      expect(ratingDiv).toBeInTheDocument();
    }
  });

  it('renders restaurant location', () => {
    renderCard();

    const card = screen.getByRole('link', { name: 'Pizza Plaza' });
    const locationDiv = within(card).getByLabelText('Location');
    expect(locationDiv).toHaveTextContent('Romanei 43');
  });

  it('links to restaurant details page', () => {
    renderCard();

    const card = screen.getByRole('link', { name: 'Pizza Plaza' });
    expect(card).toHaveAttribute('href', '/restaurants/1');
  });
});
