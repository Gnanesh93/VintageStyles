import StarRating from "./StarRating";

const RatingSummary = ({reviews})=>{
  const total = reviews.length;

  const avg = total === 0 ? 0 : (reviews.reduce((acc, r) => acc + r.rating,0) / total).toFixed(1);

  const percent = (star)=>{
    const count = reviews.filter(r => Math.floor(r.rating) === star).length;
    return total === 0 ? 0 : Math.round((count / total) * 100);
  };

  return (
    <div className="w-full sm:w-[28%] md:w-[26%] lg:w-[24%]">
      <h2 className="text-lg font-semibold">Customer Reviews</h2>
      <div className="flex items-center gap-2 mt-2 flex-nowrap">
        <StarRating rating={avg} />
        <span className="text-sm text-gray-700">{avg} out of 5</span>
      </div>

      <p className="text-xs text-gray-500 mt-1">{total} global ratings</p>

      <div className="mt-4 space-y-2">
        {[5,4,3,2,1].map(star=>(
          <div key={star} className="flex items-center gap-2">
            <span className="w-10 text-sm">{star}{"\u2605"}</span>
            <div className="flex-1 bg-gray-200 h-2 rounded">
              <div className="bg-orange-500 h-2 rounded" style={{width:`${percent(star)}%`}} />
            </div>
            <span className="w-8 text-xs text-gray-600 text-right">{percent(star)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
