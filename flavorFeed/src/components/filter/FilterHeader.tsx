import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import clsx from 'clsx';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { hasNoActiveFilters, resetFilters } from '../../utils/filters';

import { ActiveFilterTabComponent } from './ActiveFilterTabComponent';

import type { OutletContextType } from '../../layouts/Layout';
import type { CuisineOptions, Filter, FilterOptions } from '../../models/filters';

export const FilterHeader = () => {
  const { restaurantsOriginalList, activeFilters, setActiveFilters } =
    useOutletContext<OutletContextType>();

  const [activeFilterTab, setActiveFilterTab] = useState<Filter>('All');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ Cuisine: [] });
  const [expanded, setExpanded] = useState(false);

  const tabCanBeExpanded = expanded && activeFilterTab !== 'All';

  const getFilterOptions = () => {
    // Only Cuisine options for now
    const options: CuisineOptions[] = [
      ...new Set(restaurantsOriginalList.map((r) => r.country as CuisineOptions)),
    ];

    setFilterOptions({
      Cuisine: options,
    });
  };

  // Derive available filter options from data
  const toggleExpandFilter = (filterHeader: Filter) => {
    if (filterHeader === 'All') {
      setExpanded(false);
      resetFilters(setActiveFilters);
      return;
    }

    setActiveFilterTab(filterHeader);

    if (filterHeader === activeFilterTab) {
      setExpanded((prev) => !prev);
      return;
    }

    setExpanded(true);
    getFilterOptions();
  };

  const displayFilterHeader = (filterHeader: Filter) => {
    const isActive = activeFilterTab === filterHeader && expanded;
    const isTabActiveNotAll = isActive && filterHeader !== 'All';

    return (
      <button
        type="button"
        aria-expanded={expanded}
        aria-label={activeFilterTab === 'All' ? 'Show all items' : `Filter by ${activeFilterTab}`}
        aria-controls={activeFilterTab}
        onClick={() => toggleExpandFilter(filterHeader)}
        className={clsx(
          'flex px-4 py-1 cursor-pointer transition-all duration-200 relative',
          'hover:text-(--accent-color) ',

          isActive ? 'text-(--accent-color) font-bold' : 'text-(--text-gray)',

          isTabActiveNotAll &&
            'font-bold bg-white border border-b-0 border-(--border-review-cicle) rounded-t-lg',

          !isTabActiveNotAll && 'border-r border-(--light-gray) last:border-none',
        )}
      >
        {filterHeader}
        {filterHeader !== 'All' && <KeyboardArrowDownIcon />}
      </button>
    );
  };

  const displayFilterSelectedOptions = (filterHeader: keyof FilterOptions) => {
    return activeFilters[filterHeader].map((item) => (
      <div key={item} className="text-(--text-gray) font-normal">
        {item}
      </div>
    ));
  };

  return (
    <div>
      <div className="flex">
        {displayFilterHeader('All')}
        {displayFilterHeader('Cuisine')}
      </div>
      {tabCanBeExpanded && (
        <ActiveFilterTabComponent activeFilterTab={activeFilterTab} filterOptions={filterOptions} />
      )}
      {!hasNoActiveFilters(activeFilters) && (
        <div className="pt-2 flex gap-1 text-sm text-(--accent-color) font-bold">
          Filters
          {displayFilterSelectedOptions('Cuisine')}
        </div>
      )}
    </div>
  );
};
