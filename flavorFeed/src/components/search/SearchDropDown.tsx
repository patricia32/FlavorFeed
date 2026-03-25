import { RestaurantResultSearchBox } from './RestaurantResultSearchBox';

import type Restaurant from '../../models/restaurant';

interface SearchDropDownProps {
  restaurantsList: Restaurant[];
}

export const SearchDropDown = ({ restaurantsList }: SearchDropDownProps) => {
  return (
    <div className="bg-(--bg-color) shadow-xl rounded-b-xl flex flex-col max-h-85 pb-1 overflow-y-hidden">
      {restaurantsList.length === 0 ? (
        <div role="status" className="px-3 pt-4">
          <h1 className="font-bold text-xl text-(--title-gray)">Nothing Here Yet</h1>
          <div className="py-7 text-sm text-(--text-gray)">
            We couldn't find any restaurants for this search. Try adjusting your text.
          </div>
        </div>
      ) : (
        <div
          id="search-results"
          role="listbox"
          aria-label="Search results"
          className="overflow-y-auto px-3 py-2"
        >
          {restaurantsList.map(({ id, name, img, country }) => {
            return (
              <RestaurantResultSearchBox
                key={id}
                restaurantId={id}
                name={name}
                image={img}
                cuisine={country}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
