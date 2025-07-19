import { getUsers } from "@/supabase/db/users";
import type { ReviewsTableType, UserTableType } from "@/supabase/types";
import { useEffect, useState } from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";

type Props = {
  reviews: ReviewsTableType[];
  userId?: string;
};

const PlacedReviews = ({ reviews }: Props) => {
  const [like, setLike] = useState(false);
  const [users, setUsers] = useState<UserTableType[]>([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const result = await getUsers({}, "id,username");
      setUsers(result);
    };

    fetchUsernames();
  }, []);

  return reviews.length <= 0 ? (
    <div className="text-text text-xl text-center">No Reviews Placed</div>
  ) : (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {reviews.map((r) => (
        <div key={r.id} className="flex gap-4 pb-4 border-b border-soft-gray">
          <div
            className={`bg-accentA rounded-full w-10 h-10 flex-center text-neutral text-[18px]`}
          >
            AO
          </div>
          <div className="flex flex-col">
            <h3 className="first-letter:capitalize">
              {users.find((u) => u.id === r.user_id)?.username || "Unknown"}
            </h3>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < r.rating ? "text-yellow-400" : "text-soft-gray"
                  }
                />
              ))}
            </div>
            <p className="text-text text-sm mt-2 w-[25rem] lg:w-[32rem]">
              {r.comment}
            </p>

            <div className="flex items-center gap-5 mt-3">
              <button
                className={`cursor-pointer ${
                  like
                    ? "text-primary"
                    : "text-text hover:text-primary duration-200"
                } font-medium text-sm`}
                onClick={() => setLike((prev) => !prev)}
              >
                <FaThumbsUp />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PlacedReviews;
