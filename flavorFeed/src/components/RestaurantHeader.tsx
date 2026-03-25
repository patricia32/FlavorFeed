import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

import { avgRating, getReviewsLabel } from '../utils/restaurant';

import { OriginBox } from './OriginBox';
import { RatingStars } from './RatingStars/RatingStars';

import type Review from '../models/review';

interface RestaurantHeaderProps {
  name: string;
  imageUrl: string;
  country: string;
  reviews: Review[];
}

export const RestaurantHeader = ({ name, imageUrl, country, reviews }: RestaurantHeaderProps) => {
  const avgRatingValue = avgRating(reviews);
  const reviewsLabel = getReviewsLabel(reviews);

  return (
    <div
      className="w-screen relative h-88 bg-cover bg-position-[50%_60%]"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/0 ">
        <div className="max-w-[81vw] h-full mx-auto pb-7 flex flex-col justify-end gap-2">
          <Link
            to="/"
            aria-label="Go back to main page"
            className="w-42 py-1 mb-2 bg-(--bg-color) 
                flex items-center rounded-md
                text-xs font-semibold text-(--rating-gray)"
          >
            <ArrowBackIcon className="mx-3 " fontSize="small" />
            <div>Back to restaurants</div>
          </Link>
          <h1 className="text-white text-4xl font-bold">{name}</h1>
          <div
            className="flex items-center gap-2
                        text-white text-sm"
          >
            <div className="mr-2">
              <OriginBox country={country} variant="secondary" />
            </div>
            <RatingStars rating={avgRatingValue} label={reviewsLabel} />
          </div>
        </div>
      </div>
    </div>
  );
};
