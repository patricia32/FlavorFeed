import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './Button';
import { SearchRestaurantComponent } from './search/SearchRestaurantComponent';

import type Restaurant from '../models/restaurant';

interface NavbarProps {
  restaurantsList: Restaurant[];
}

export const Navbar = ({ restaurantsList }: NavbarProps) => {
  const [lightTheme, setLightTheme] = useState(true);

  function toggleTheme() {
    setLightTheme(!lightTheme);
  }

  return (
    <nav className="w-full grid items-center gap-2 md:gap-4 grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] grid-rows-2 md:grid-rows-1">
      <Link
        to="/"
        aria-label="Redirect to main page"
        className="flex items-center cursor-pointer gap-3 focus:outline-(--accent-color)"
      >
        <img className="w-8" src="/logo.png" alt="Logo" />
        <h1 className="font-bold text-xl text-(--title-gray)">FlavorFeed</h1>
      </Link>
      <div className="relative order-3 col-span-2 md:order-2 md:col-span-1">
        <SearchRestaurantComponent restaurantsList={restaurantsList} />
      </div>
      <div className="flex items-center justify-end gap-4 order-2 md:order-3">
        {lightTheme ? (
          <button aria-label="Activate dark mode" className="focus:outline-(--accent-color)">
            <DarkModeOutlinedIcon
              className="cursor-pointer"
              color="action"
              fontSize="small"
              onClick={toggleTheme}
            />
          </button>
        ) : (
          <button aria-label="Deactivate dark mode" className="focus:outline-(--accent-color)">
            <DarkModeIcon
              className="cursor-pointer"
              color="action"
              fontSize="small"
              onClick={toggleTheme}
            />
          </button>
        )}
        <Button children="Browse" onClick={() => {}} variant="secondary" />
      </div>
    </nav>
  );
};
