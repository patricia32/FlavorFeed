import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom';

import { avgRating, getReviewsLabel } from '../../utils/restaurant';
import { OriginBox } from '../OriginBox';
import { RatingStars } from '../RatingStars/RatingStars';

import type Restaurant from '../../models/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const { id, img, name, price, country, location, reviews } = restaurant;
  const avgRatingValue = avgRating(reviews);

  return (
    <Link
      to={`/restaurants/${id}`}
      aria-label={name}
      className="h-110 lg:h-125 flex flex-col rounded-lg shadow-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-103 focus:scale-103 focus:outline-none"
    >
      <img className="h-3/4 w-full object-cover " src={img} alt={name} />
      <div className="h-1/4 p-3 flex flex-col justify-between text-[0.85rem]">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg text-(--title-gray)">{name}</h2>
          <div className="text-sm">{price}</div>
        </div>
        <OriginBox country={country} />
        <div className="flex">
          <RatingStars rating={avgRatingValue} label={getReviewsLabel(reviews)} />
        </div>
        <div aria-label="Location" className="flex items-center text-(--text-gray)">
          <LocationOnOutlinedIcon color="action" sx={{ fontSize: '0.85rem' }} />
          <div className="mx-1">{location}</div>
        </div>
      </div>
    </Link>
  );
};
