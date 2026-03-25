import { useNavigate } from 'react-router-dom';

interface RestaurantResultSearchBoxProps {
  restaurantId: number;
  name: string;
  image: string;
  cuisine: string;
}
export const RestaurantResultSearchBox = ({
  restaurantId,
  name,
  image,
  cuisine,
}: RestaurantResultSearchBoxProps) => {
  const navigate = useNavigate();

  return (
    <button
      role="option"
      onMouseDown={() => {
        navigate(`/restaurants/${restaurantId}`);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          navigate(`/restaurants/${restaurantId}`);
        }
      }}
      className="flex gap-3 p-2 rounded-lg cursor-pointer z-10 w-full
        border-b border-(--light-gray) last:border-b-0
        transition-all duration-400 ease-out
        hover:text-(--accent-color) hover:bg-(--bg-review-circle)
        focus:text-(--accent-color) focus:bg-(--bg-review-circle) focus: outline-none"
    >
      <img className="h-13 w-10 rounded-sm" src={image} alt={name} />
      <div className="flex flex-col justify-center items-start">
        <h2 className="font-semibold">{name}</h2>
        <div className="text-sm text-(--text-gray)">{cuisine}</div>
      </div>
    </button>
  );
};
