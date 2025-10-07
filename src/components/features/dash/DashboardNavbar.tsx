import { AuthContext } from "@/context/AuthContext";
import { useContextSelector } from "use-context-selector";
import Notifications from "./Notifications";
import { useState } from "react";
import NotificationItem from "./NotificationItem";
import UserAvatar from "./UserAvatar";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const profile = useContextSelector(AuthContext, (ctx) => ctx?.profile);

  const toggleNotifications = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleAvatar = () => {
    setIsAvatarOpen((prev) => !prev);
  };
  return (
    <nav className="flex-between py-4 px-6 border-b border-gray-400 relative">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-medium text-primary">
          مرحبًا بك في لوحة التحكم,{" "}
          <span className="first-letter:capitalize inline-block">
            {profile?.username}
          </span>
        </h2>
        <p className="text-[0.8em] font-medium">إليك ما يحدث مع متجرك اليوم</p>
      </div>

      <div className="flex items-center gap-2">
        <Notifications onClick={toggleNotifications} numOfNotifications={2} />
        <UserAvatar
          profile={profile!}
          onClick={toggleAvatar}
          isAvatarOpen={isAvatarOpen}
        />
      </div>

      {isOpen && (
        <div className="bg-neutral py-3 px-4 rounded-md absolute left-10 top-full w-96 shadow-lg border border-gray-300">
          <h3 className="text-lg font-medium text-primary mb-3 pb-2 border-b border-gray-300">
            الإشعارات
          </h3>
          <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto">
            <NotificationItem
              customerName={profile?.username!}
              date={new Date().toLocaleDateString()}
              username={profile?.username!}
            />
          </ul>
        </div>
      )}

      {isAvatarOpen && (
        <div className="text-left flex flex-col gap-1 absolute left-10 top-full bg-neutral border border-gray-300 py-3 px-4 rounded-md shadow-lg">
          <span>{profile?.username}</span>
          <span>{profile?.email}</span>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
