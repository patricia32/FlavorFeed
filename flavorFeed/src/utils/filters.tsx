import type { FilterOptions } from '../models/filters';

export const hasNoActiveFilters = (activeFilters: FilterOptions): boolean => {
  return activeFilters.Cuisine.length === 0;
};

export const resetFilters = (setActiveFilters: (value: FilterOptions) => void) => {
  setActiveFilters({ Cuisine: [] });
};
