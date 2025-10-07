import type { UserTableType } from "@/supabase/types";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  profile: UserTableType;
  onClick: () => void;
  isAvatarOpen: boolean;
};

const UserAvatar = ({ profile, onClick, isAvatarOpen }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 border border-gray-400 pl-1 rounded-full cursor-pointer"
    >
      <div className="bg-accentA rounded-full w-8 h-8 flex-center text-neutral text-[18px]">
        {profile?.username.charAt(0).toUpperCase() || "A"}
      </div>
      <IoIosArrowDown
        className={`transition-transform ${
          isAvatarOpen ? "" : "rotate-180"
        } duration-150`}
      />
    </button>
  );
};

export default UserAvatar;
