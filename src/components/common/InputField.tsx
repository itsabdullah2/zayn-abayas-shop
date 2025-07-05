import { type InputHTMLAttributes } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  labelClassName?: string;
  type: string;
  placeholder: string;
  showPassWBtn?: boolean;
  showPasswordFn?: () => void;
  toggleIcon?: boolean;
}

const InputField = ({
  label,
  className = "",
  labelClassName = "",
  type,
  placeholder,
  showPassWBtn,
  showPasswordFn,
  toggleIcon,
  ...props
}: InputFieldProps) => {
  return (
    <div>
      <label
        className={`flex text-sm font-medium text-text mb-2 ${labelClassName}`}
      >
        {label}
      </label>
      {showPassWBtn ? (
        <div className="relative">
          <input
            type={type}
            className={`w-full px-4 py-3 bg-light-gray rounded-lg focus:outline-none placeholder:duration-200 focus:placeholder:opacity-0 ${className}`}
            placeholder={placeholder}
            {...props}
          />
          <button
            type="button"
            onClick={showPasswordFn}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-primary cursor-pointer"
          >
            {toggleIcon ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-3 bg-light-gray rounded-lg focus:outline-none placeholder:duration-200 focus:placeholder:opacity-0 ${className}`}
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
};

export default InputField;
