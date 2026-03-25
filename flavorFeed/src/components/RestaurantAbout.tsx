import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { PriceIcon } from '../icons/PriceIcon';
import { formatWorkingHours } from '../utils/restaurant';
import { infoIconSx } from '../utils/styles';

import type { Time } from '../models/restaurant';
import type { ReactElement } from 'react';

interface InfoItemProps {
  icon: ReactElement;
  label: string;
  value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex items-center gap-3 flex-1">
    {icon}
    <div className="text-sm">
      <p className="text-xs text-(--text-gray)">{label}</p>
      <p className="font-semibold text-(--dark-text-color)">{value}</p>
    </div>
  </div>
);

interface RestaurantAboutProps {
  description: string;
  location: string;
  hours: { open: Time; close: Time };
  price: string;
}

export const RestaurantAbout = ({ description, location, hours, price }: RestaurantAboutProps) => {
  return (
    <div
      className="bg-(--container-bg-gray) border border-(--container-border-gray) rounded-xl
    p-5 flex flex-col gap-5"
    >
      <h2 className="font-bold text-lg text-(--dark-text-color)">About</h2>
      <div className="text-sm text-(--text-gray)">{description}</div>
      <div className="flex flex-col gap-3 md:flex-row md:gap-0">
        <InfoItem
          icon={<LocationOnOutlinedIcon sx={infoIconSx} />}
          label="Location"
          value={location}
        />
        <InfoItem
          icon={<AccessTimeIcon sx={infoIconSx} />}
          label="Hours"
          value={formatWorkingHours(hours.open, hours.close)}
        />
        <InfoItem icon={PriceIcon} label="Price Range" value={price} />
      </div>
    </div>
  );
};
