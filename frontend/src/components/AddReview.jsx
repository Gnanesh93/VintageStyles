import { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const AddReview = ({ productId, onSuccess }) => {
  const { backendUrl, token } = useContext(ShopContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);

  const handleImages = (e) => {
    if (e.target.files.length > 4) {
      toast.error("Max 4 images allowed");
      return;
    }
    setImages([...e.target.files]);
  };

  const submitReview = async () => {
    try {
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);
      images.forEach(img => formData.append("images", img));

      const res = await axios.post(
        `${backendUrl}/api/product/${productId}/review`,
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success("Review added");
        onSuccess();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="border p-4 mt-6">
      <h3 className="font-semibold mb-2">Write a review</h3>

      <input
        type="number"
        step="0.5"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 w-full mb-2"
      />

      <textarea
        placeholder="Your review"
        className="border p-2 w-full mb-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <input type="file" multiple accept="image/*" onChange={handleImages} />

      <button
        onClick={submitReview}
        className="bg-black text-white px-4 py-2 mt-3"
      >
        Submit Review
      </button>
    </div>
  );
};

export default AddReview;
