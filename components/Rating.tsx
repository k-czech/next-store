interface RatingProps {
  rating: number;
  className?: string;
}

export const Rating = ({ rating, className }: RatingProps) => {
  return <div className={`font-bold text-blue-500 ${className}`}>{rating}</div>;
};
