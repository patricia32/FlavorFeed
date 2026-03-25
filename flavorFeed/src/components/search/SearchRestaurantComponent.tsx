import SearchIcon from '@mui/icons-material/Search';
import clsx from 'clsx';
import { useState } from 'react';

import { SearchDropDown } from './SearchDropDown';

import type Restaurant from '../../models/restaurant';

interface SearchRestaurantComponentProps {
  restaurantsList: Restaurant[];
}

export const SearchRestaurantComponent = ({ restaurantsList }: SearchRestaurantComponentProps) => {
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);

  const searchResults: Restaurant[] = restaurantsList.filter(
    (restaurant) =>
      searchText !== '' && restaurant.name.trim().toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleChangeSearch = (text: string) => {
    setSearchText(text.trim().toLowerCase());
    if (text.trim()) setVisible(true);
  };

  const closeDropDown = () => {
    setSearchText('');
    setVisible(false);
  };

  return (
    <div onBlur={closeDropDown} className="relative flex flex-col items-center justify-center">
      <div className="relative w-full flex items-center justify-center transition-all duration-300 focus-within:-translate-y-0.5 focus-within:shadow-lg">
        <SearchIcon className="absolute left-2" color="action" />
        <input
          name="searchText"
          value={searchText}
          aria-label="Search restaurants"
          placeholder="Search restaurants..."
          className=" w-full h-8.5 pl-10 pr-6 leading-10 border border-(--light-gray) rounded-lg focus:ring-1 focus:ring-(--accent-color) focus:outline-none"
          onChange={(e) => {
            handleChangeSearch(e.target.value);
          }}
        />
      </div>
      {visible && (
        <div
          className={clsx(
            'absolute top-full mt-3  min-w-full md:w-2xl transition-all duration-300 ease-out',
            searchText
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 -translate-y-3 scale-95 pointer-events-none',
          )}
        >
          <SearchDropDown restaurantsList={searchResults} />
        </div>
      )}
    </div>
  );
};
