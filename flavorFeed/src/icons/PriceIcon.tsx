import type { ReactElement } from 'react';

export const PriceIcon: ReactElement = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-6 h-6 text-(--accent-color)"
    fill="none"
    stroke="currentColor" // margins
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v16" />
    <g transform="translate(0 2)">
      <path d="M17 7c0-2-2.2-3-5-3s-5 1-5 3 2.2 3 5 3 5 1 5 3-2.2 3-5 3-5-1-5-3" />
    </g>
  </svg>
);
