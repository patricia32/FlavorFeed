import clsx from 'clsx';
import { useState } from 'react';
import { useId } from 'react';

import { createReview } from '../../api/restaurantsApi';
import { displayAlertFor5s } from '../../utils/alerts';
import { Button } from '../Button';
import { OriginBox } from '../OriginBox';
import { RatingStars } from '../RatingStars/RatingStars';

import type Review from '../../models/review';

interface ReviewFormProps {
  restaurantId: number;
  onSubmitReview: (newReview: Review) => void;
}

export const ReviewForm = ({ restaurantId, onSubmitReview }: ReviewFormProps) => {
  const MAX_CONTENT_LENGTH = 500;

  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const [formState, setFormState] = useState({
    fieldErrors: { name: '', rating: '', content: '' },
    submitError: '',
    isLoading: false,
    reviewSent: false,
  });

  const isFormValid =
    userName.trim().length > 0 &&
    rating > 0 &&
    content.trim().length > 0 &&
    !formState.fieldErrors.name &&
    !formState.fieldErrors.rating &&
    !formState.fieldErrors.content;

  const idPrefix = useId();
  const nameId = `${idPrefix}-name`;
  const ratingId = `${idPrefix}-rating`;
  const contentId = `${idPrefix}-content`;

  const validateUserName = (userNameValue: string): boolean => {
    if (userNameValue.trim().length <= 0) {
      setFormState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          name: 'Username required',
        },
      }));
      return false;
    }

    const regex = /^(?=.*[A-Za-z])[A-Za-z0-9 ]+$/;
    if (!regex.test(userNameValue)) {
      setFormState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          name: 'Please use only letters, numbers and spaces.',
        },
      }));
      return false;
    }

    setFormState((prev) => ({
      ...prev,
      fieldErrors: {
        ...prev.fieldErrors,
        name: '',
      },
    }));
    return true;
  };

  const validateRating = (ratingValue: number): boolean => {
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      setFormState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          rating: 'Rating required',
        },
      }));
      return false;
    }

    setFormState((prev) => ({
      ...prev,
      fieldErrors: {
        ...prev.fieldErrors,
        rating: '',
      },
    }));
    return true;
  };

  const validateContent = (contentValue: string): boolean => {
    if (contentValue.trim().length <= 0) {
      setFormState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          content: 'Content required',
        },
      }));
      return false;
    }

    if (contentValue.trim().length > 500) {
      setFormState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          content: 'Content cannot be longer than 500 characters.',
        },
      }));
      return false;
    }

    setFormState((prev) => ({
      ...prev,
      fieldErrors: {
        ...prev.fieldErrors,
        content: '',
      },
    }));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormState((prev) => ({
      ...prev,
      submitError: '',
      isLoading: true,
      reviewSent: false,
    }));

    const setReviewSent = (value: boolean) => {
      setFormState((prev) => ({
        ...prev,
        reviewSent: value,
      }));
    };

    createReview(restaurantId, userName, content, rating)
      .then((newReview) => {
        onSubmitReview(newReview);
        displayAlertFor5s(setReviewSent);

        setUserName('');
        setRating(0);
        setContent('');
      })
      .catch(() => {
        setFormState((prev) => ({
          ...prev,
          submitError: 'Something went wrong. Please try again later.',
        }));
      })
      .finally(() => {
        setFormState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      });
  };

  const handleChangeName = (userNameValue: string) => {
    validateUserName(userNameValue);
    setUserName(userNameValue);
  };

  const handleChangeRating = (ratingValue: number) => {
    validateRating(ratingValue);
    setRating(ratingValue);
  };

  const handleChangeContent = (contentValue: string) => {
    validateContent(contentValue);
    setContent(contentValue);
  };

  const renderFieldError = (errorField: keyof typeof formState.fieldErrors) => {
    return (
      <div className="min-h-8">
        {formState.fieldErrors[errorField] && (
          <div id={`${errorField}-error`} role="alert" className="text-xs text-(--accent-color)">
            {formState.fieldErrors[errorField]}
          </div>
        )}
      </div>
    );
  };

  const renderUserField = () => {
    return (
      <div className="flex flex-col gap-2.5">
        <label htmlFor={nameId} className="text-xs font-semibold">
          Your Name
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id={nameId}
          name="nameField"
          type="text"
          required
          aria-describedby="name-error"
          aria-invalid={!!formState.fieldErrors.name}
          value={userName}
          placeholder="Enter your name"
          onChange={(e) => handleChangeName(e.target.value)}
          className="p-2 border border-(--light-gray) rounded-md text-sm focus:ring-0 focus:outline-none"
        />
        {renderFieldError('name')}
      </div>
    );
  };

  const renderRatingField = () => {
    return (
      <div className="flex flex-col gap-2.5">
        <label htmlFor={ratingId} className="text-xs font-semibold">
          Your Rating
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <div id={ratingId} aria-describedby="rating-error">
          <RatingStars
            readOnly={false}
            rating={rating}
            onChange={(value) => {
              handleChangeRating(value);
            }}
          />
        </div>
        {renderFieldError('rating')}
      </div>
    );
  };

  const renderContentField = () => {
    return (
      <div className="flex flex-col gap-2.5">
        <label htmlFor={contentId} className="text-xs font-semibold">
          Your Review
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id={contentId}
          name="content"
          required
          aria-invalid={!!formState.fieldErrors.content}
          aria-describedby="content-error"
          value={content}
          placeholder="Share your experience at this restaurant..."
          onChange={(e) => handleChangeContent(e.target.value)}
          className="p-2 border border-(--light-gray) rounded-md text-sm focus:ring-0 focus:outline-none h-28"
        />
        <div className="flex justify-between">
          <div>{renderFieldError('content')}</div>
          <div
            className={clsx('text-xs pb-5', {
              'text-(--text-gray)': content.trim().length < MAX_CONTENT_LENGTH,
              'text-(--accent-color)': content.trim().length > MAX_CONTENT_LENGTH,
            })}
          >
            [{content.trim().length}/{MAX_CONTENT_LENGTH}]
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-(--container-bg-gray) border border-(--container-border-gray) rounded-xl
    p-5 flex flex-col gap-5 text-(--title-gray)"
    >
      <h2 className="font-bold text-xl">Write a Review</h2>
      <form aria-describedby="submit-error" onSubmit={handleSubmit} className="flex flex-col">
        {renderUserField()}
        {renderRatingField()}
        {renderContentField()}
        <Button
          children={formState.isLoading ? 'Loading... ' : 'Submit Review'}
          type="submit"
          disabled={!isFormValid || formState.isLoading}
          aria-busy={formState.isLoading}
        />
        <div className="mx-auto min-h-10 pt-2">
          {formState.reviewSent && (
            <div role="status">
              <OriginBox country="Thank you for your review!" />
            </div>
          )}
          {formState.submitError && (
            <div id="submit-error" role="alert" className="text-xs text-(--accent-color)">
              {formState.submitError}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
