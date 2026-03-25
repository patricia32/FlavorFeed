import { useOutletContext } from 'react-router-dom';

import { FilterOption } from './FilterOption';

import type { OutletContextType } from '../../layouts/Layout';
import type { Filter, FilterOptions, OptionType } from '../../models/filters';

interface ActiveFilterTabComponentProps {
  activeFilterTab: Exclude<Filter, 'All'>; // omit - objects, exclude - unions
  filterOptions: FilterOptions;
}

export const ActiveFilterTabComponent = ({
  activeFilterTab,
  filterOptions,
}: ActiveFilterTabComponentProps) => {
  const { activeFilters, setActiveFilters } = useOutletContext<OutletContextType>();

  const selectedFilterOptions = activeFilters[activeFilterTab];
  const availableFilterOptions = filterOptions[activeFilterTab];

  const isOptionSelected = (option: OptionType): boolean => {
    const areAllActive = selectedFilterOptions.length === availableFilterOptions.length;
    const noneActive = selectedFilterOptions.length === 0;

    if (areAllActive || noneActive) return option === 'All';

    const prevSelected = activeFilters[activeFilterTab as keyof FilterOptions] as OptionType[];
    const selectedOption: OptionType = option;
    const isSelected = prevSelected.includes(selectedOption);

    return isSelected;
  };

  // Mark the selected option as checked and handle 'All selected' case
  const selectOption = (option: OptionType) => {
    const areAllActive =
      selectedFilterOptions.length === availableFilterOptions.length || option === 'All';

    if (areAllActive || selectedFilterOptions.length === availableFilterOptions.length - 1)
      setActiveFilters((prev) => ({
        ...prev,
        [activeFilterTab]: [],
      }));
    else {
      setActiveFilters((prev) => ({
        ...prev,
        [activeFilterTab]: isOptionSelected(option)
          ? selectedFilterOptions.filter((item) => item !== option) // toggle
          : [...selectedFilterOptions, option],
      }));
    }
  };

  const displayFilterOptions = () => {
    return (
      <div className="flex flex-wrap gap-1">
        <FilterOption
          text={'All'}
          checked={isOptionSelected('All')}
          setCheckedOptions={selectOption}
        />
        {availableFilterOptions.map((filterOption, index) => (
          <FilterOption
            key={index}
            text={filterOption}
            checked={isOptionSelected(filterOption)}
            setCheckedOptions={selectOption}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id={activeFilterTab}
      className="bg-white flex flex-wrap gap-1 p-3 w-fit md:max-w-2/3
        border border-t-0 border-(--border-review-cicle) rounded-lg shadow-sm max-h-40 overflow-y-auto"
    >
      {availableFilterOptions.length > 0 ? (
        displayFilterOptions()
      ) : (
        <div className="px-5 py-3 text-(--text-gray) text-sm">No filters available yet</div>
      )}
    </div>
  );
};
