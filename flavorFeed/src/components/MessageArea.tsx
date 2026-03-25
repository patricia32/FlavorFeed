import clsx from 'clsx';

interface MessageAreaProps {
  title: string;
  content: string;
  showLoadingGif: boolean;
}

export const MessageArea = ({ title, content, showLoadingGif }: MessageAreaProps) => {
  return (
    <div
      className={clsx(`h-full flex flex-col items-center text-center`, {
        'justify-start': showLoadingGif,
        'justify-center': !showLoadingGif,
      })}
    >
      {showLoadingGif && <img src="/loadingGif.gif" alt="loadingGif" className="h-80" />}
      <h1 className="font-bold text-xl md:text-2xl text-(--title-gray)">{title}</h1>
      <div className="py-7 text-base sm:text-md md:text-lg text-(--text-gray)">{content}</div>
    </div>
  );
};
