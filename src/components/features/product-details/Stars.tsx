import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Stars = ({ className }: { className?: string }) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        return (
          <FaStar
            key={i}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              setRating(star);
              // Send to the backend
            }}
            className={`${
              star <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
            } cursor-pointer duration-200`}
          />
        );
      })}
    </div>
  );
};

export default Stars;
