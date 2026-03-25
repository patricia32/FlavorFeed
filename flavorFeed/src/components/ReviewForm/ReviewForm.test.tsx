import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as api from '../../api/restaurantsApi';

import { ReviewForm } from './ReviewForm';

import type Review from '../../models/review';

const mockRestaurantId = 1;

// Create a mock function
const onSubmitReview = vi.fn();

const renderReviewForm = () => {
  render(
    <BrowserRouter>
      <ReviewForm restaurantId={1} onSubmitReview={onSubmitReview} />
    </BrowserRouter>,
  );
};

let user: ReturnType<typeof userEvent.setup>;

// Consistent test setup
beforeEach(() => {
  user = userEvent.setup();
});

// Clear mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

describe('ReviewForm validation tests', () => {
  it('should call createReview only once with correct parameters when submit is clicked multiple times quickly', async () => {
    // spyOn - replaces the actual function implementation
    // mockResolvedValue - returns the Promise (called an async function)
    const mockedCreateReview = vi.spyOn(api, 'createReview').mockResolvedValue({} as Review);

    renderReviewForm();

    // userEvent 90% cases
    await user.type(screen.getByPlaceholderText('Enter your name'), 'John');
    await user.type(
      screen.getByPlaceholderText('Share your experience at this restaurant...'),
      'Great food!',
    );

    await user.click(screen.getByLabelText('Set rating to 4 stars'));

    const submitButton = screen.getByRole('button', { name: 'Submit Review' });

    // use fireEvent for special cases: fast simulation (it is synchrounous)
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(mockedCreateReview).toHaveBeenCalledTimes(1);
    expect(mockedCreateReview).toHaveBeenCalledWith(mockRestaurantId, 'John', 'Great food!', 4);
  });

  it('should show "Username required" error when name is empty', async () => {
    renderReviewForm();

    const nameInput = screen.getByPlaceholderText('Enter your name');

    // The user types something and then he deletes it
    await user.type(nameInput, 'John');
    await user.clear(nameInput);

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Username required');

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('should show "Username required" when name contains only spaces', async () => {
    renderReviewForm();

    const nameInput = screen.getByPlaceholderText('Enter your name');

    await user.type(nameInput, '     ');

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Username required');

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');

    const submitButton = screen.getByRole('button', { name: 'Submit Review' });
    expect(submitButton).toBeDisabled();
  });

  it('should show error if name contains no letters (only numbers)', async () => {
    renderReviewForm();

    const nameInput = screen.getByPlaceholderText('Enter your name');

    await user.type(nameInput, '123456');

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Add at least one letter. Numbers and spaces are okay');

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('should show "Content required" error when content is empty', async () => {
    renderReviewForm();

    const contentTextarea = screen.getByPlaceholderText(
      'Share your experience at this restaurant...',
    );

    await user.type(contentTextarea, 'Nice place');
    await user.clear(contentTextarea);

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Content required');

    expect(contentTextarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should show "Content required" when content contains only spaces', async () => {
    renderReviewForm();

    const contentTextarea = screen.getByPlaceholderText(
      'Share your experience at this restaurant...',
    );

    await user.type(contentTextarea, '     ');
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Content required');

    expect(contentTextarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should show error when content exceeds 500 characters', async () => {
    renderReviewForm();

    const contentTextarea = screen.getByPlaceholderText(
      'Share your experience at this restaurant...',
    );

    const longText = 'a'.repeat(501);

    // Use fireEvent for long strings (a lot of events - keyUp, keyDown etc)
    fireEvent.change(contentTextarea, {
      target: { value: longText },
    });

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Content cannot be longer than 500 characters.');

    expect(contentTextarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should NOT show error when content is exactly 500 characters', () => {
    renderReviewForm();

    const contentTextarea = screen.getByPlaceholderText(
      'Share your experience at this restaurant...',
    );

    const validText = 'a'.repeat(500);

    fireEvent.change(contentTextarea, {
      target: { value: validText },
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(contentTextarea).toHaveAttribute('aria-invalid', 'false');
  });
});
