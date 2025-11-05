import { useNotifications } from "@/hooks/useNotifications";
import { formateDate } from "@/utils/formateDate";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  onClick?: () => void;
};

const NotificationItem = ({ onClick }: Props) => {
  const { notificationsData, isLoading } = useNotifications();

  if (!notificationsData.length) {
    return (
      <div className="text-base font-medium text-secondary text-center">
        لا يوجد إشعارات
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto">
      {notificationsData.map((notify) => (
        <li
          key={notify.id}
          className={`border-b border-gray-300 pb-3 last:border-0 ${
            notify.is_read ? "" : "bg-gray-200"
          } hover:bg-gray-200 duration-200 px-2 rounded-md pt-3 w-full`}
        >
          <Link
            to="/admin/orders"
            onClick={onClick}
            className="flex items-center gap-3"
          >
            <div className="flex-center w-10 h-10 text-neutral bg-blue-300 rounded-full">
              {notify.user_name.charAt(0).toUpperCase() || "NU"}
            </div>

            <div className="">
              <div className="flex gap-1 items-center">
                <span className="text-base font-medium text-primary inline-block first-letter:capitalize">
                  {notify.user_name}
                </span>{" "}
                <span className="text-sm font-medium text-gray-400">
                  {notify.message}
                </span>{" "}
              </div>
              <span className="text-sm text-gray-400">
                {formateDate(notify.created_at)}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(NotificationItem);
