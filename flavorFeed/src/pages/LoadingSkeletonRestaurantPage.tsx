import { LoadingComponent } from '../components/LoadingComponent';

export const LoadingSkeletonRestaurantPage = () => {
  return (
    <div>
      {/* RestaurantHeader */}
      <div className="w-screen">
        <LoadingComponent pxHeight={350} />
      </div>

      <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 py-4 items-start">
        <div className="flex flex-col gap-5">
          {/* RestaurantAbout */}
          <LoadingComponent pxHeight={200} />

          {/* ReviewForm - Mobile */}
          <div className="md:hidden">
            <LoadingComponent pxHeight={500} />
          </div>

          {/* ReviewsList */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <LoadingComponent key={index} pxHeight={100} />
            ))}
          </div>
        </div>

        {/* ReviewForm - Desktop */}
        <div className="hidden md:block">
          <LoadingComponent pxHeight={500} />
        </div>
      </div>
    </div>
  );
};
