import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { getRestaurants } from '../api/restaurantsApi';
import { Navbar } from '../components/Navbar';

import type { FilterOptions } from '../models/filters';
import type Restaurant from '../models/restaurant';

export type OutletContextType = {
  restaurantsOriginalList: Restaurant[];
  filteredRestaurants: Restaurant[];
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  restaurantsError: boolean;
  setRestaurantsError: React.Dispatch<React.SetStateAction<boolean>>;
  activeFilters: FilterOptions;
  setActiveFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

export const Layout = () => {
  const isHome = useLocation().pathname === '/';
  const [isLoading, setLoading] = useState(false);
  const [restaurantsError, setRestaurantsError] = useState(false);
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([]);

  // A custom object that can be extended to support multiple filters
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({ Cuisine: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setRestaurantsError(false);
      setRestaurantsList([]);
      getRestaurants()
        .then((data) => {
          setRestaurantsList(data);
        })
        .catch(() => {
          setRestaurantsError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [isHome]);

  const matchesFilters = (restaurant: Restaurant, filters: FilterOptions): boolean => {
    const matchesCuisine = !filters.Cuisine.length || filters.Cuisine.includes(restaurant.country);
    // Future filters
    return matchesCuisine;
  };

  const filteredRestaurants = useMemo(() => {
    return restaurantsList.filter((restaurant) => matchesFilters(restaurant, activeFilters));
  }, [activeFilters, restaurantsList]);

  return (
    <div className="min-h-screen w-full bg-(--bg-color) flex overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-10 border-b border-gray-200 bg-(--bg-color) py-5 md:py-0">
        <div className="max-w-[80vw] h-14 w-full mx-auto flex items-center justify-center">
          <Navbar restaurantsList={restaurantsList} />
        </div>
      </header>

      <main className="mx-auto flex flex-1 justify-center pt-24 md:pt-14 max-w-[80vw]">
        <Outlet
          context={
            {
              filteredRestaurants,
              restaurantsOriginalList: restaurantsList,
              isLoading,
              setLoading,
              restaurantsError,
              setRestaurantsError,
              activeFilters,
              setActiveFilters,
            } satisfies OutletContextType
          }
        />
      </main>
    </div>
  );
};
