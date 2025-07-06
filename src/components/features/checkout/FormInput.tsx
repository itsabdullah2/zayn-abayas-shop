interface Props {
  label: string;
  labelFor: string;
  type: string;
  placeholder: string;
  labelClassName?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const FormInput = ({
  label,
  labelFor,
  type,
  placeholder,
  className = "",
  labelClassName = "",
  onChange,
  value,
}: Props) => {
  return (
    <div className="w-full">
      <label
        htmlFor={labelFor}
        className={`${labelClassName} text-sm font-medium text-primary`}
      >
        {label}
      </label>
      <input
        id={labelFor}
        type={type}
        placeholder={placeholder}
        className={`${className} w-full p-2 rounded border border-gray`}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormInput;
