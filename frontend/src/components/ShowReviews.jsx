import StarRating from "./StarRating";

const ShowReviews = ({reviews})=>{
  if (reviews.length === 0){
    return <p className="text-gray-500">No reviews yet</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {reviews.map((review, i) => (
        <div key={i} className="border-b pb-4">
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} />
            <span className="font-medium">{review.name}</span>
          </div>

          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toDateString()}
          </p>

          <p className="mt-2">{review.comment}</p>

          {review.images?.length > 0 && (
            <div className="flex gap-2 mt-2">
              {review.images.map((img,idx)=>(
                <img key={idx} src={img} className="w-20 h-20 object-cover border rounded" />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowReviews;
