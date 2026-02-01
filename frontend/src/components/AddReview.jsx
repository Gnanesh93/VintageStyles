import {useState,useContext } from "react";
import axios from "axios";
import {ShopContext} from "../context/ShopContext";
import {toast} from "react-toastify";

const AddReview = ({productId, onSuccess})=>{
  const {backendUrl,token} = useContext(ShopContext);

  const [rating,setRating] = useState("");
  const [comment,setComment] = useState("");
  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(false);

  const handleRatingChange = (e)=>{
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)){
      setRating(value);
    }
  };

  const handleImages = (e)=>{
    const files = Array.from(e.target.files);
    if (files.length > 4){
      toast.error("Maximum 4 images allowed");
      return;
    }
    setImages(files);
  };

  const submitReview = async ()=>{
    if (!rating || Number(rating) < 1 || Number(rating) > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("rating", Number(rating));
      formData.append("comment", comment);
      images.forEach((img) => formData.append("images", img));

      const res = await axios.post(`${backendUrl}/api/product/${productId}/review`,formData,{headers:{token}});

      if (res.data.success) {
        toast.success("Review added successfully");
        setRating("");
        setComment("");
        setImages([]);
        onSuccess();
      } 
      else {
        toast.error(res.data.message);
      }
    } 
    catch {
      toast.error("Failed to submit review");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-5 mt-6 bg-gray-50">
      <h3 className="font-semibold text-lg mb-4">Write a review</h3>
      <label className="text-sm font-medium text-gray-700">Rating (1-5)</label>
      <input type="text" placeholder="4.5" value={rating} onChange={handleRatingChange} 
        className="border px-2 py-1.5 w-20 text-sm mt-1 mb-3 rounded focus:outline-none focus:border-orange-500"/>

      <label className="text-sm font-medium text-gray-700">Your review</label>
      <textarea placeholder="Share your experience with this product"
        className="border px-3 py-2 w-full mt-1 mb-3 rounded resize-none h-28 overflow-y-auto focus:outline-none focus:border-orange-500"
        value={comment} onChange={(e) => setComment(e.target.value)} />

      <label className="text-sm font-medium text-gray-700">Upload images</label>
      <input type="file" multiple accept="image/*" onChange={handleImages} className="mt-2" />

      {images.length > 0 && (
        <div className="flex gap-3 mt-3">
          {images.map((img,i)=>(
            <img key={i} src={URL.createObjectURL(img)} className="w-16 h-16 object-cover rounded border" alt="preview"/>
          ))}
        </div>
      )}

      <button onClick={submitReview} disabled={loading} 
        className={`mt-4 px-5 py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed":"bg-black hover:bg-gray-800"}`}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default AddReview;
