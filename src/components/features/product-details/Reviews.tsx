import { useState } from "react";
import PlacedReviews from "./PlacedReviews";
import AddReview from "./AddReview";

const Reviews = () => {
  const [isReviews, setIsReviews] = useState("reviews");

  let content;
  if (isReviews === "reviews") {
    content = <PlacedReviews />;
  } else if (isReviews === "add-review") {
    content = <AddReview />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center pb-2 border-b border-gray-400 gap-4">
        <button
          className={`text-[15px] cursor-pointer ${
            isReviews === "reviews" ? "text-primary font-medium" : "text-text "
          }`}
          onClick={() => setIsReviews("reviews")}
        >
          Reviews
        </button>
        <button
          className={`text-[15px] cursor-pointer ${
            isReviews === "add-review"
              ? "text-primary font-medium"
              : "text-text "
          }`}
          onClick={() => setIsReviews("add-review")}
        >
          Add a Review
        </button>
      </div>

      {content}
    </div>
  );
};

export default Reviews;
