import { AuthContext } from "@/context/AuthContext";
import { useContextSelector } from "use-context-selector";
import Notifications from "./Notifications";
import { useEffect, useRef, useState } from "react";
import NotificationItem from "./NotificationItem";
import UserAvatar from "./UserAvatar";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const profile = useContextSelector(AuthContext, (ctx) => ctx?.profile);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  const toggleNotifications = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleAvatar = () => {
    setIsAvatarOpen((prev) => !prev);
  };
  // Close the dropdown if clicked outside & on Escape key press
  useEffect(() => {
    const closeNotificationsOnClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const closeAvatarOnClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target as Node)
      ) {
        setIsAvatarOpen(false);
      }
    };

    const closeOnEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsAvatarOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscapeKey);
    document.addEventListener("mousedown", closeAvatarOnClickOutside);
    document.addEventListener("mousedown", closeNotificationsOnClickOutside);
    return () => {
      document.removeEventListener(
        "mousedown",
        closeNotificationsOnClickOutside
      );
      document.removeEventListener("mousedown", closeAvatarOnClickOutside);
    };
  }, []);
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
        <Notifications
          onClick={toggleNotifications}
          numOfNotifications={2}
          ref={notificationButtonRef}
        />
        <UserAvatar
          profile={profile!}
          onClick={toggleAvatar}
          isAvatarOpen={isAvatarOpen}
          ref={avatarButtonRef}
        />
      </div>

      {isOpen && (
        <div
          className="bg-neutral py-3 px-4 rounded-md absolute left-10 top-full w-96 shadow-lg border border-gray-300"
          ref={dropdownRef}
        >
          <h3 className="text-lg font-medium text-primary mb-3 pb-2 border-b border-gray-300">
            الإشعارات
          </h3>
          <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto">
            <NotificationItem
              customerName={profile?.username!}
              date={new Date().toLocaleDateString()}
              username={profile?.username!}
              onClick={toggleNotifications}
            />
          </ul>
        </div>
      )}

      {isAvatarOpen && (
        <div
          className="text-left flex flex-col gap-1 absolute left-10 top-full bg-neutral border border-gray-300 py-3 px-4 rounded-md shadow-lg"
          ref={avatarRef}
        >
          <span>{profile?.username}</span>
          <span>{profile?.email}</span>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
