import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const fraction = rating - fullStars; // e.g. 0.3
  const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full yellow stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500" />
      ))}

      {/* Partially filled star */}
      {fraction > 0 && (
        <div className="relative inline-block">
          {/* Base gray star */}
          <FaStar className="text-gray-300" />
          {/* Yellow overlay clipped by fraction */}
          <div
            className="absolute top-0 right-0 overflow-hidden"
            style={{ width: `${fraction * 100}%` }}
          >
            <FaStar className="text-yellow-500" />
          </div>
        </div>
      )}

      {/* Empty gray stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-gray-300" />
      ))}

      {/* Rating number */}
      <span className="ml-2 text-sm text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
