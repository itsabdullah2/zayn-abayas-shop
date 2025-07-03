import { type InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  labelClassName?: string;
  type: string;
  placeholder: string;
}

const InputField = ({
  label,
  className = "",
  labelClassName = "",
  type,
  placeholder,
  ...props
}: InputFieldProps) => {
  return (
    <div>
      <label
        className={`flex text-sm font-medium text-text mb-2 ${labelClassName}`}
      >
        {label}
      </label>
      <input
        type={type}
        className={`w-full px-4 py-3 bg-light-gray rounded-lg focus:outline-none placeholder:duration-200 focus:placeholder:opacity-0 ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputField;
