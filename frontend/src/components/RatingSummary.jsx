import StarRating from "./StarRating";

const RatingSummary = ({ reviews }) => {
  const total = reviews.length;

  const avg =
    total === 0
      ? 0
      : (
          reviews.reduce((acc, r) => acc + r.rating, 0) / total
        ).toFixed(1);

  const percent = (star) => {
    const count = reviews.filter(r => Math.floor(r.rating) === star).length;
    return total === 0 ? 0 : Math.round((count / total) * 100);
  };

  return (
    <div className="w-full sm:w-1/3">
      <h2 className="text-xl font-semibold">Customer reviews</h2>

      <div className="flex items-center gap-2 mt-2">
        <StarRating rating={avg} />
        <span>{avg} out of 5</span>
      </div>

      <p className="text-sm text-gray-500">{total} global ratings</p>

      {[5,4,3,2,1].map(star => (
        <div key={star} className="flex items-center gap-2 mt-2">
          <span>{star} star</span>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-orange-500 h-2 rounded"
              style={{ width: `${percent(star)}%` }}
            />
          </div>
          <span>{percent(star)}%</span>
        </div>
      ))}
    </div>
  );
};

export default RatingSummary;
