import { useState } from "react";
import Stars from "./Stars";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addReview } from "@/supabase";

type Props = {
  productId: string;
  refreshReviews: () => void;
};

const AddReview = ({ productId, refreshReviews }: Props) => {
  const [error, setError] = useState("");
  const [reviewData, setReviewData] = useState({
    reviewVal: "",
    rating: 0,
  });

  const { isAuthenticated, user } = useContextSelector(AuthContext, (ctx) => ({
    isAuthenticated: ctx?.isAuthenticated,
    user: ctx?.user,
  }));
  const navigate = useNavigate();

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData((prev) => ({
      ...prev,
      reviewVal: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }

    if (reviewData.reviewVal.trim() === "") {
      setError("Please add a review!");
      return;
    }

    // save in DB - later
    if (user && isAuthenticated) {
      const data = {
        product_id: productId,
        user_id: user.id,
        comment: reviewData.reviewVal,
        rating: reviewData.rating,
      };
      await addReview(data);
      refreshReviews();
    }
    setError("");
    setReviewData({ reviewVal: "", rating: 0 });
  };

  const handleRating = (star: number) => {
    setReviewData((prev) => ({
      ...prev,
      rating: star,
    }));
    // DB Logic goes here
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 xl:gap-10">
      <form className="md:flex-1 flex flex-col gap-2" onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a review..."
          maxLength={600}
          className="bg-light-gray h-[180px] resize-none py-2 px-4 focus:outline-none focus:placeholder:opacity-0 placeholder:duration-200 caret-accentA text-primary text-[15px]"
          value={reviewData.reviewVal}
          onChange={handleTextareaChange}
        />

        {/* Render The Number of Characters Here... */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="py-2 px-12 w-fit text-medium text-neutral cursor-pointer bg-primary ml-auto overflow-hidden relative group"
        >
          Submit
          <span className="shine-effect group-hover:animate-shine" />
        </button>
      </form>
      <Stars
        className="md:basis-58 text-3xl"
        rating={reviewData.rating}
        onClick={handleRating}
      />
    </div>
  );
};

export default AddReview;
