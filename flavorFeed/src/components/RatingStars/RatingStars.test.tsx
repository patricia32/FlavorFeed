import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { RatingStars } from './RatingStars';

const renderRatingStarsWithReview = (
  rating: number,
  label: string = '',
  readOnly: boolean = true,
  onChange?: (value: number) => void,
) => {
  render(
    <BrowserRouter>
      <RatingStars rating={rating} label={label} readOnly={readOnly} onChange={onChange} />
    </BrowserRouter>,
  );
};

describe('RatingStars tests', () => {
  it('renders 4 full stars for rating 4', () => {
    renderRatingStarsWithReview(4, '(2 reviews)');

    const starsGroup = screen.getByRole('group');
    const fullStars = within(starsGroup).getAllByLabelText('Full star');
    const emptyStars = within(starsGroup).getAllByLabelText('Empty star');

    expect(fullStars).toHaveLength(4);
    expect(emptyStars).toHaveLength(1);
  });

  it('does not render rating value when there are no reviews', () => {
    renderRatingStarsWithReview(0, '(No reviews)');

    expect(screen.queryByRole('contentinfo', { name: /rating/i })).not.toBeInTheDocument();
    expect(screen.getByText('(No reviews)')).toBeInTheDocument();
  });

  it('renders date instead of rating and reviews number', () => {
    renderRatingStarsWithReview(4, '2 days ago');

    expect(screen.getByText('2 days ago')).toBeInTheDocument();
    expect(screen.queryByRole('contentinfo', { name: /rating/i })).not.toBeInTheDocument();
  });

  it('does not render rating number when readOnly is false and label is empty', () => {
    renderRatingStarsWithReview(4, '', false);

    expect(screen.queryByRole('contentinfo', { name: /rating/i })).not.toBeInTheDocument();
  });

  it('disables stars when readOnly is true', () => {
    renderRatingStarsWithReview(3, '(1 review)', true);

    const buttonsGroup = screen.getByRole('group');
    const buttons = within(buttonsGroup).getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('updates rating to 4 after click', async () => {
    //Create a virtual user
    const user = userEvent.setup();

    const Wrapper = () => {
      //This is how you can use hooks
      const [rating, setRating] = React.useState(3);
      return (
        <BrowserRouter>
          <RatingStars rating={rating} readOnly={false} onChange={setRating} label="(1 review)" />
        </BrowserRouter>
      );
    };
    render(<Wrapper />);

    const fourthStar = screen.getByLabelText('Set rating to 4 stars');
    await user.click(fourthStar);

    expect(screen.getByRole('contentinfo', { name: 'Rating 4 stars' })).toBeInTheDocument();
  });
});
