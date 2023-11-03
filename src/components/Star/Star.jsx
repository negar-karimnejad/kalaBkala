import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ rating, setRating }) => {
  const [hoverFill, setHoverFill] = useState(null);
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            onMouseEnter={() => setHoverFill(ratingValue)}
            onMouseLeave={() => setHoverFill(null)}
            onClick={() => setRating(ratingValue)}
          >
            <FaStar
              size={15}
              className={
                ratingValue <= (hoverFill || rating)
                  ? "text-[#ffe101]"
                  : "text-[#ccc]"
              }
              onChange={() => setRating(ratingValue)}
              value={ratingValue}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Star;
