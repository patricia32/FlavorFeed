import { getAvatarInitials } from '../utils/restaurant';

interface InitialsAvatarProps {
  name: string;
}

export const InitialsAvatar = ({ name }: InitialsAvatarProps) => {
  const initials = getAvatarInitials(name);
  return (
    <div aria-label={name}>
      <div className="bg-(--bg-review-circle) w-10 h-10 border border-(--border-review-cicle) rounded-4xl flex justify-center items-center text-(--accent-color) font-semibold">
        {initials || <img src="/userIcon.png" className="h-7 w-7" />}
      </div>
    </div>
  );
};
