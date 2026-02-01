import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import RatingSummary from "./RatingSummary";
import ShowReviews from './ShowReviews';
import AddReview from "./AddReview";
import axios from "axios";

const ProductReviews = ({productId})=>{
  const {backendUrl,token} = useContext(ShopContext);
  const [reviews,setReviews] = useState([]);
  const [canReview,setCanReview] = useState(false);

  const fetchReviews = async ()=>{
    const res = await axios.post(`${backendUrl}/api/product/single`, {productId});
    if (res.data.success){
      setReviews(res.data.product.reviews || []);
      }
  };

  const checkEligibility = async () => {
    if (!token) return;
    const res = await axios.post(`${backendUrl}/api/order/userorders`,{},{headers:{token}});

    const delivered = res.data.orders?.some(order => order.status === "Delivered" && order.items.some(item => item._id === productId));
    setCanReview(delivered);
  };

  useEffect(()=>{
    fetchReviews();
    checkEligibility();
  },[productId]);

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-10">
      <RatingSummary reviews={reviews} />
      <div className="flex-1">
        <ShowReviews reviews={reviews} />
        {canReview && <AddReview productId={productId} onSuccess={fetchReviews} />}
      </div>
    </div>
  );
};

export default ProductReviews;
