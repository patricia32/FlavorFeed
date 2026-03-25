import clsx from 'clsx';

interface OriginBoxProps {
  country: string;
  variant?: 'primary' | 'secondary';
}

export const OriginBox = ({ country, variant = 'primary' }: OriginBoxProps) => {
  return (
    <span
      aria-label="Cuisine"
      className={clsx(
        ' px-[0.55rem] py-[0.05rem] w-fit rounded-md text-center font-medium text-xs',
        {
          'bg-[#E8E1D8] text-(--title-gray) ': variant === 'primary',
          'bg-white/25  text-white border border-white/20 ': variant === 'secondary',
        },
      )}
    >
      {country}
    </span>
  );
};
