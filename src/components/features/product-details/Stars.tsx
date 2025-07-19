import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

type Props = {
  className?: string;
  onClick?: (star: number) => void;
  rating?: number;
};

const Stars = ({ className, onClick, rating = 0 }: Props) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        return (
          <FaStar
            key={i}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onClick?.(star)}
            className={`${
              star <= (hover || rating) ? "text-yellow-400" : "text-soft-gray"
            } cursor-pointer duration-200`}
          />
        );
      })}
    </div>
  );
};

export default React.memo(Stars);
