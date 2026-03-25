import { useOutletContext } from 'react-router-dom';

import { FilterHeader } from '../components/filter/FilterHeader';
import { MessageArea } from '../components/MessageArea';
import { RestaurantsGrid } from '../components/RestaurantsGrid';

import type { OutletContextType } from '../layouts/Layout';

export const MainPage = () => {
  const { filteredRestaurants, isLoading, restaurantsError } =
    useOutletContext<OutletContextType>();

  if (restaurantsError)
    return (
      <MessageArea
        title="Oops!"
        content="Something went wrong. Please try again later."
        showLoadingGif={true}
      />
    );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-center p-8">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl pb-5 text-(--title-gray)">
          Discover Amazing Restaurants
        </h1>
        <div className="text-sm sm:text-md md:text-lg text-(--text-gray)">
          Read honest reviews and share your dining experiences with our community
        </div>
      </div>
      <FilterHeader />
      <RestaurantsGrid restaurantsList={filteredRestaurants} isLoadingScreen={isLoading} />
    </div>
  );
};
