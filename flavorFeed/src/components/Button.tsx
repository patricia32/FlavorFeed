import clsx from 'clsx';

import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button = ({
  fullWidth = false,
  variant = 'primary',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'text-sm md:text-base px-3 py-1.5 rounded-md focus:outline-(--accent-color)',
        {
          'bg-(--accent-color) text-white hover:bg-(--accent-color-hover)': variant === 'primary',
          'bg-(--gray) border border-(--dark-gray) hover:bg-(--gray-color-hover)':
            variant === 'secondary',
          'w-full': fullWidth,
          'opacity-50 cursor-not-allowed': props.disabled,
          'cursor-pointer': !props.disabled,
        },
      )}
    >
      {children}
    </button>
  );
};
