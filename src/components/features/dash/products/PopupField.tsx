type Props = {
  label: string;
  labelIcon?: string;
  type?: string;
  name: string;
  placeholder?: string;
  labelClasses?: string;
  inputClasses?: string;
  inputVal: number | string | File;
  onValChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextarea?: boolean;
  isFileInput?: boolean;
};

const filedStyles =
  "text-sm border border-light-gray focus:outline-none focus:placeholder:opacity-0 placeholder:duration-140 py-[6px] px-2 rounded-md";

const PopupField = ({
  label,
  labelIcon,
  type,
  name,
  placeholder,
  inputClasses,
  labelClasses,
  inputVal,
  onValChange,
  isTextarea,
  isFileInput,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={`${labelClasses} text-sm font-medium text-dark-gray w-fit`}
      >
        <span>{label}</span>
        {labelIcon ? (
          <img src={labelIcon} alt="labe-icon" className="w-14" />
        ) : null}
      </label>
      {!isTextarea ? (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          {...(!isFileInput && { value: inputVal as string })}
          onChange={onValChange}
          className={`${inputClasses} ${filedStyles}`}
          accept={`${
            type === "file"
              ? "image/png, image/jpeg, image/webp, image/avif"
              : null
          }`}
        />
      ) : (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={inputVal as string}
          onChange={onValChange}
          className={`${filedStyles} h-40 resize-none`}
        />
      )}
    </div>
  );
};

export default PopupField;
