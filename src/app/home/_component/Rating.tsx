import React, { useEffect } from "react";
import { Rating } from "react-daisyui";

interface CustomRatingProps {
  value: number;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const CustomRating: React.FC<CustomRatingProps> = ({
  value,
  rating,
  setRating,
}) => {
  useEffect(() => {
    setRating(value);
  }, [value, setRating]);

  // Directly use the newRating number provided by the onChange event
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <Rating value={rating} onChange={handleRatingChange}>
      {Array.from({ length: 5 }, (_, index) => (
        <Rating.Item
          key={index}
          name={`rating-${index + 1}`}
          className={
            index < rating
              ? "mask mask-star-2 bg-orange-400"
              : "mask mask-star-2"
          }
        />
      ))}
    </Rating>
  );
};

export default CustomRating;
