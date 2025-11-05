import { useNotifications } from "@/hooks/useNotifications";
import { IoMdNotifications } from "react-icons/io";

type Props = {
  onClick: () => void;
  isOpen?: boolean;
  ref: React.Ref<HTMLButtonElement>;
};

const Notifications = ({ onClick, ref }: Props) => {
  const { notificationsData } = useNotifications();
  const allRead = notificationsData.every((notify) => notify.is_read);
  return (
    <button className="relative cursor-pointer" onClick={onClick} ref={ref}>
      <div className="w-8 h-8 border border-gray-300 rounded-full flex-center">
        <IoMdNotifications size={20} className="text-primary" />
      </div>
      <span className="absolute -top-1 -right-1 bg-red-400 text-xs text-neutral rounded-full px-1">
        {allRead || notificationsData.length === 0
          ? null
          : notificationsData.filter((n) => !n.is_read).length}
      </span>
    </button>
  );
};

export default Notifications;
