import { MessageArea } from '../MessageArea';

import { ReviewBox } from './ReviewBox';

import type Review from '../../models/review';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-xl text-(--title-gray)">
        {reviews.length > 0 ? (
          `Reviews (${reviews.length})`
        ) : (
          <div className="text-center p-3">
            No reviews yet — your opinion matters. Be the first to share it!
          </div>
        )}
      </h2>
      <div className="flex flex-col gap-2.5">
        {reviews.length === 0 ? (
          <MessageArea title="" content="" showLoadingGif={true} />
        ) : (
          reviews.map(({ id, userName, content, rating, timestamp }) => (
            <ReviewBox
              key={id}
              userName={userName}
              content={content}
              rating={rating}
              timestamp={timestamp}
            />
          ))
        )}
      </div>
    </div>
  );
};
