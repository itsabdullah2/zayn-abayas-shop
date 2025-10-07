import { IoMdNotifications } from "react-icons/io";

type Props = {
  onClick: () => void;
  isOpen?: boolean;
  numOfNotifications: number;
};

const Notifications = ({ onClick, numOfNotifications }: Props) => {
  return (
    <button className="relative cursor-pointer" onClick={onClick}>
      <div className="w-8 h-8 border border-gray-300 rounded-full flex-center">
        <IoMdNotifications size={20} className="text-primary" />
      </div>
      <span className="absolute -top-1 -right-1 bg-red-400 text-xs text-neutral rounded-full px-1">
        {numOfNotifications === 0 ? null : numOfNotifications}
      </span>
    </button>
  );
};

export default Notifications;
