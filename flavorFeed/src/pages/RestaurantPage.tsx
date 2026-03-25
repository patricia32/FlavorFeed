import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getRestaurantData } from '../api/restaurantsApi';
import { MessageArea } from '../components/MessageArea';
import { RestaurantAbout } from '../components/RestaurantAbout';
import { RestaurantHeader } from '../components/RestaurantHeader';
import { ReviewsList } from '../components/Review/ReviewsList';
import { ReviewForm } from '../components/ReviewForm/ReviewForm';
import { APIError } from '../utils/APIError';
import { reviewsSort } from '../utils/restaurant';

import { LoadingSkeletonRestaurantPage } from './LoadingSkeletonRestaurantPage';

import type Restaurant from '../models/restaurant';
import type Review from '../models/review';
import type { ReviewsSortType } from '../models/review';

export const RestaurantPage = () => {
  const idParams = useParams<{ id: string }>().id;
  const numericId = Number(idParams);
  const isValidId = !!idParams && !Number.isNaN(numericId);
  const sortType: ReviewsSortType = 'date-descending';

  const [isLoading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (!isValidId) return;

    const fetchData = async () => {
      setLoading(true);
      setFetchError(false);
      setRestaurant(null);
      getRestaurantData(numericId)
        .then((data: Restaurant) => {
          setRestaurant(data);
        })
        .catch((error) => {
          if (error instanceof APIError && (error.status === 404 || error.status === 400))
            setRestaurant(null);
          else setFetchError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [numericId, isValidId]);

  if (fetchError)
    return (
      <MessageArea
        title="Oops!"
        content="Something went wrong. Please try again later."
        showLoadingGif={true}
      />
    );
  if (isLoading && isValidId) return <LoadingSkeletonRestaurantPage />;

  if (!restaurant || !isValidId)
    return (
      <MessageArea
        title="Restaurant not found"
        content="This restaurant does not exist."
        showLoadingGif={true}
      />
    );

  const handleSubmitReview = (newReview: Review) => {
    setRestaurant((prev) => {
      if (!prev) return prev;

      return { ...prev, reviews: [...(prev.reviews ?? []), newReview] };
    });
  };

  const { id, name, img, description, country, location, hours, price, reviews } = restaurant;
  const sortedReviews = reviewsSort(reviews, sortType);

  return (
    <div>
      <RestaurantHeader name={name} imageUrl={img} country={country} reviews={reviews} />
      <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 py-4 items-start">
        <div className="flex flex-col gap-5">
          <RestaurantAbout
            description={description}
            location={location}
            hours={hours}
            price={price}
          />
          {/* Mobile view */}
          <div className="md:hidden">
            <ReviewForm restaurantId={id} onSubmitReview={handleSubmitReview} />
          </div>
          <ReviewsList reviews={sortedReviews} />
        </div>
        {/* Desktop view */}
        <div className="hidden md:block">
          <ReviewForm restaurantId={id} onSubmitReview={handleSubmitReview} />
        </div>
      </div>
    </div>
  );
};
