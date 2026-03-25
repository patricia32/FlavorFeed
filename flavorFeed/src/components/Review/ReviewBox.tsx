import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { displayAlertFor5s } from '../../utils/alerts';
import { formatTimeAgo } from '../../utils/restaurant';
import { InitialsAvatar } from '../InitialsAvatar';
import { RatingStars } from '../RatingStars/RatingStars';

interface ReviewBoxProps {
  userName: string;
  content: string;
  rating: number;
  timestamp: string;
}

export const ReviewBox = ({ userName, content, rating, timestamp }: ReviewBoxProps) => {
  const [expanded, setExpanded] = useState(false);
  const [longReview, setLongReview] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [alert, setAlert] = useState(false);
  const timeLabel = formatTimeAgo(timestamp);

  useEffect(() => {
    if (ref.current) setLongReview(ref.current.scrollHeight > ref.current.clientHeight);
  }, [content]);

  useEffect(() => {
    if (timeLabel.includes('Just Now')) displayAlertFor5s(setAlert);
  }, [timeLabel]);

  function toggleSeeMore() {
    setExpanded(!expanded);
  }

  return (
    <div
      className={clsx(
        'border border-(--container-border-gray) rounded-xl px-5 py-4 grid grid-cols-[0.07fr_0.93fr] gap-5 transition-all duration-600 ease-in-out',
        {
          'bg-(--alert-bg)': alert,
          'bg-(--container-bg-gray) ': !alert,
        },
      )}
    >
      <InitialsAvatar name={userName} />
      <div onClick={toggleSeeMore}>
        <div className="flex flex-col md:flex-row gap-0.5 md:gap-3">
          <div className="font-semibold text-(--title-gray)">{userName}</div>
          <RatingStars rating={rating} label={timeLabel} />
        </div>
        <div
          ref={ref}
          className={clsx('text-sm text-(--text-gray)', { 'line-clamp-2': !expanded })}
        >
          {content}
        </div>
        {longReview && (
          <button type="button" className="text-xs">
            {expanded ? 'See less' : 'See more'}
          </button>
        )}
      </div>
    </div>
  );
};
