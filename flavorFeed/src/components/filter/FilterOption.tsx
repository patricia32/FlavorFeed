import type { OptionType } from '../../models/filters';

interface FilterOptionProps {
  text: OptionType;
  checked: boolean;
  setCheckedOptions: (value: OptionType) => void;
}

export const FilterOption = ({ text, checked, setCheckedOptions }: FilterOptionProps) => {
  const handleCheckOption = (text: OptionType) => {
    setCheckedOptions(text);
  };

  return (
    // use <label> to connect UI (span) and checkbox (input)
    <label className="cursor-pointer my-1">
      <input
        type="checkbox"
        className="peer hidden"
        onChange={() => handleCheckOption(text)}
        checked={checked}
      />
      <span
        className="px-3 py-1 rounded-full border border-(--light-gray) text-xs text-(--text-gray)
            transition-all duration-200
            peer-not-checked:hover:bg-(--bg-review-circle)
            peer-not-checked:hover:border-(--border-review-cicle)
            peer-not-checked:hover:text-(--accent-color)
            peer-checked:bg-(--accent-color)
            peer-checked:font-bold
            peer-checked:border-none
            peer-checked:text-white"
      >
        {text}
      </span>
    </label>
  );
};
