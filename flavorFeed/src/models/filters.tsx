export type Filter = 'All' | 'Cuisine';

export type FilterOptions = { Cuisine: CuisineOptions[] };

export type CuisineOptions = 'Japanese' | 'Italian' | 'Spanish' | 'Greek';
export type OptionType = 'All' | CuisineOptions;
