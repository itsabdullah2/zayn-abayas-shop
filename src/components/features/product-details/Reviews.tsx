import { useCallback, useEffect, useState } from "react";
import PlacedReviews from "./PlacedReviews";
import AddReview from "./AddReview";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "@/context/AuthContext";
import type { ReviewsTableType } from "@/supabase/types";
import { getReviews } from "@/supabase";

const Reviews = ({ productId }: { productId: string }) => {
  const [isReviews, setIsReviews] = useState("reviews");
  const [reviewsData, setReviewsData] = useState<ReviewsTableType[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);

  const fetchReviews = useCallback(async () => {
    try {
      const result = await getReviews(productId);
      setReviewsData(result);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  let content;
  if (isReviews === "reviews") {
    content = <PlacedReviews reviews={reviewsData} userId={user?.id} />;
  } else if (isReviews === "add-review") {
    content = <AddReview productId={productId} refreshReviews={fetchReviews} />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center pb-2 border-b border-soft-gray gap-4">
        <button
          className={`text-[15px] cursor-pointer ${
            isReviews === "reviews" ? "text-primary font-medium" : "text-text "
          }`}
          onClick={() => setIsReviews("reviews")}
        >
          التقييمات
        </button>
        <button
          className={`text-[15px] cursor-pointer ${
            isReviews === "add-review"
              ? "text-primary font-medium"
              : "text-text "
          }`}
          onClick={() => setIsReviews("add-review")}
        >
          أضف تقييم
        </button>
      </div>

      {content}
    </div>
  );
};

export default Reviews;
