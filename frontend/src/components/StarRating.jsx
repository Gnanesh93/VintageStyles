const StarRating = ({rating = 0})=>{
  return (
    <div className="flex gap-1 text-orange-500">
      {[1, 2, 3, 4, 5].map((star)=>{
        if(rating >= star){
          return <span key={star}>{"\u2605"}</span>;
        } 
        else if (rating >= star - 0.5){
          return <span key={star}>{"\u2606"}</span>;
        } 
        else{
          return <span key={star} className="text-gray-300">{"\u2605"}</span>;
        }
      })}
    </div>
  );
};

export default StarRating;
