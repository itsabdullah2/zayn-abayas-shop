import { AuthContext } from "@/context/AuthContext";
import { addLike, deleteLike, getLikes } from "@/supabase/db/reviews";
import { getUsers } from "@/supabase/db/users";
import type { ReviewsTableType, UserTableType } from "@/supabase/types";
import { useEffect, useState } from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import { toast } from "sonner";
import { useContextSelector } from "use-context-selector";

type Props = {
  reviews: ReviewsTableType[];
};

const PlacedReviews = ({ reviews }: Props) => {
  const [users, setUsers] = useState<UserTableType[]>([]);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});

  const { isAuthenticated, user } = useContextSelector(AuthContext, (ctx) => ({
    isAuthenticated: ctx?.isAuthenticated,
    user: ctx?.user,
  }));

  // Fetch usernames
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers({}, "id,username");
      setUsers(result);
    };
    fetchUsers();
  }, []);

  // Fetch likes for all reviews
  useEffect(() => {
    const fetchAllLikes = async () => {
      const counts: Record<string, number> = {};
      const liked: Record<string, boolean> = {};

      for (const review of reviews) {
        const likes = await getLikes(review.id);
        counts[review.id] = likes.length;

        if (user) {
          liked[review.id] = likes.some((l) => l.user_id === user.id);
        }
      }

      setLikesCount(counts);
      setLikedReviews(liked);
    };

    fetchAllLikes();
  }, [reviews, user]);

  const handleLikedReviews = async (reviewId: string) => {
    if (!isAuthenticated || !user) {
      toast.error("يرجى تسجيل الدخول للإعجاب", {
        className: "bg-primary! text-neutral! w-fit!",
      });
      return;
    }

    const isLiked = likedReviews[reviewId];

    try {
      if (isLiked) {
        await deleteLike(user.id, reviewId);
        setLikesCount((prev) => ({
          ...prev,
          [reviewId]: (prev[reviewId] ?? 1) - 1,
        }));
      } else {
        await addLike(user.id, reviewId);
        setLikesCount((prev) => ({
          ...prev,
          [reviewId]: (prev[reviewId] ?? 0) + 1,
        }));
      }

      setLikedReviews((prev) => ({
        ...prev,
        [reviewId]: !isLiked,
      }));
    } catch (err) {
      console.error("Error updating like:", err);
    }
  };

  if (reviews.length <= 0) {
    return <div className="text-text text-xl text-center">لا يوجد تقييمات</div>;
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex gap-4 pb-4 border-b border-soft-gray"
        >
          <div className="bg-accentA rounded-full w-10 h-10 flex-center text-neutral text-[18px]">
            AO
          </div>
          <div className="flex flex-col">
            <h3 className="first-letter:capitalize">
              {users.find((u) => u.id === review.user_id)?.username ||
                "Unknown"}
            </h3>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < review.rating ? "text-yellow-400" : "text-soft-gray"
                  }
                />
              ))}
            </div>

            <p className="text-text text-sm mt-2 w-[25rem] lg:w-[32rem]">
              {review.comment}
            </p>

            <div className="flex items-center gap-1 mt-3">
              <p className="text-sm text-primary">
                {likesCount[review.id] ?? 0}
              </p>
              <button
                aria-label="like button"
                className={`cursor-pointer ${
                  likedReviews[review.id]
                    ? "text-primary"
                    : "text-text hover:text-primary duration-200"
                } font-medium text-sm`}
                onClick={() => handleLikedReviews(review.id)}
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
