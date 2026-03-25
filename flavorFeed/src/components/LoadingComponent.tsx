interface LoadingComponentProps {
  pxHeight: number;
}

export const LoadingComponent = ({ pxHeight }: LoadingComponentProps) => {
  return (
    <div
      style={{ height: `${pxHeight}px` }}
      className="animate-pulse bg-linear-to-r from-(--bg-loading-card-light-gray) to-(--bg-loading-card-dark-gray) rounded-lg"
    />
  );
};
