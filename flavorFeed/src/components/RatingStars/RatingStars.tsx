import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

import { grayStarSx, yellowStarSx } from '../../utils/styles';

interface RatingStarsProps {
  rating: number;
  label?: string;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

export const RatingStars = ({
  rating,
  label = '',
  readOnly = true,
  onChange,
}: RatingStarsProps) => {
  const isHome = useLocation().pathname === '/';
  const safeRating = Math.min(5, Math.max(0, rating));

  const labelIsDate =
    !Number.isNaN(Date.parse(label)) || label.includes('ago') || label === 'Just Now';
  const labelIsReview = label.toLowerCase().includes('review');
  const showRating = labelIsReview && rating > 0;

  const renderStars = (currentRating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;

          const isFull = currentRating >= starValue;
          const isHalf = currentRating >= starValue - 0.5 && currentRating < starValue;

          const Icon = isFull
            ? StarRoundedIcon // full
            : isHalf
              ? StarHalfRoundedIcon // half
              : StarOutlineRoundedIcon; // empty

          const starType = isFull ? 'Full star' : isHalf ? 'Half star' : 'Empty star';

          const sx = isFull || isHalf ? yellowStarSx : grayStarSx;

          return (
            <button
              type="button"
              key={index}
              disabled={readOnly}
              aria-label={
                readOnly
                  ? `${starType}`
                  : `Set rating to ${starValue} star${starValue > 1 ? 's' : ``}`
              }
              className={clsx('p-0 leading-none', {
                'cursor-pointer focus:outline-(--accent-color)': !readOnly,
              })}
              onClick={() => {
                if (!readOnly && onChange) {
                  onChange(starValue); // index
                }
              }}
            >
              <Icon sx={sx} className="-mr-0.5" fontSize={readOnly ? 'small' : 'large'} />
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-1.5">
      <div role="group">{renderStars(safeRating)}</div>
      {showRating && (
        <div
          role="contentinfo"
          aria-label={`Rating ${rating} ${rating === 1 ? 'star' : 'stars'}`}
          className={clsx('font-semibold text-base text-(--rating-gray)', {
            'text-white': !isHome,
          })}
        >
          {rating}
        </div>
      )}
      <div
        className={clsx('text-(--reviewsText-gray)', {
          'text-sm': labelIsDate,
        })}
      >
        {label}
      </div>
    </div>
  );
};
