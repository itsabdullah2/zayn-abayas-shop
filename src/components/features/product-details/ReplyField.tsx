import React from "react";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ReplyField = ({ value, onChange, onSubmit }: Props) => {
  return (
    <form className="flex flex-col gap-2 mt-3" onSubmit={onSubmit}>
      <input
        type="text"
        id="reply-field"
        placeholder="Reply..."
        value={value}
        onChange={onChange}
        className="input border border-soft-gray text-sm py-1 px-2"
      />
      <button
        type="submit"
        className="py-1 px-6 w-fit text-sm text-medium text-neutral cursor-pointer bg-primary ml-auto overflow-hidden relative group"
      >
        Add
        <span className="shine-effect group-hover:animate-shine" />
      </button>
    </form>
  );
};

export default React.memo(ReplyField);
