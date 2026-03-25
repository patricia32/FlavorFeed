import { LoadingComponent } from './LoadingComponent';
import { MessageArea } from './MessageArea';
import { RestaurantCard } from './RestaurantCard/RestaurantCard';

import type Restaurant from '../models/restaurant';

interface RestaurantsGridProps {
  restaurantsList: Restaurant[];
  isLoadingScreen: boolean;
}

export const RestaurantsGrid = ({ restaurantsList, isLoadingScreen }: RestaurantsGridProps) => {
  if (isLoadingScreen)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {Array.from({ length: 6 }).map((_, index) => {
          return <LoadingComponent key={index} pxHeight={550} />;
        })}
      </div>
    );

  if (restaurantsList.length === 0)
    return (
      <div className="flex-1">
        <MessageArea
          title="No restaurants found"
          content="We couldn't find any restaurants at the moment."
          showLoadingGif={true}
        />
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
      {restaurantsList.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};
