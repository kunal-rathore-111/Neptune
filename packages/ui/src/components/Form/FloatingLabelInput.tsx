import { useState } from "react";

// Floating Label Input Component
export const FloatingLabelInput: React.FC<{
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  icon,
  rightIcon,
  onRightIconClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="group relative">
      <div className="text-muted-foreground group-focus-within:text-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="border-input bg-background ring-offset-background focus-visible:ring-ring peer flex h-10 w-full rounded-md border py-2 pr-10 pl-10 text-sm placeholder-transparent transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        style={
          {
            "--tw-ring-color": "hsl(var(--ring))",
          } as React.CSSProperties
        }
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-10 text-sm font-medium transition-all duration-200 ${
          isFocused || value
            ? "text-foreground -top-2 rounded-sm bg-white px-2 text-xs dark:bg-black"
            : "text-muted-foreground top-2.5"
        }`}
      >
        {placeholder}
      </label>
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="text-muted-foreground hover:text-foreground focus:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors focus:outline-none"
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
};
