import { useState } from "react";
import PlacedReviews from "./PlacedReviews";
import AddReview from "./AddReview";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "@/context/AuthContext";

const Reviews = () => {
  const [isReviews, setIsReviews] = useState("reviews");
  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);

  const reviews: string[] = []; // Just a Placeholder til connecting to DB

  let content;
  if (isReviews === "reviews") {
    const username = user?.user_metadata?.username;
    content = <PlacedReviews reviews={reviews} username={username} />;
  } else if (isReviews === "add-review") {
    content = <AddReview />;
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
