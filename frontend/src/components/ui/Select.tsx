import type { ChangeEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  className?: string;
  disabled?: boolean;
}

export default function Select({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  name,
  className = "",
  disabled = false,
}: SelectProps) {
  return (
    <select
      className={`bg-transparent border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
