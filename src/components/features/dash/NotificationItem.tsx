import { Link } from "react-router-dom";

type Props = {
  customerName: string;
  date: string;
  username: string;
};

const NotificationItem = ({ customerName, date, username }: Props) => {
  return (
    <li className=" border-b border-gray-300 pb-3 last:border-0 hover:bg-gray-200 duration-200 px-2 rounded-md pt-3 w-full">
      <Link to="/admin/orders" className="flex items-center gap-3">
        <div className="flex-center w-10 h-10 text-neutral bg-blue-300 rounded-full">
          {username.charAt(0).toUpperCase() || "A"}
        </div>

        <div className="">
          <div className="flex gap-1 items-center">
            <span className="text-sm font-medium text-gray-400">
              تم شراء منتج جديد من قبل
            </span>{" "}
            <span className="text-lg font-medium text-primary inline-block first-letter:capitalize">
              {customerName}
            </span>{" "}
          </div>
          <span className="text-sm text-gray-400">{date}</span>
        </div>
      </Link>
    </li>
  );
};

export default NotificationItem;
