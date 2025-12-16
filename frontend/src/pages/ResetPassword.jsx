import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ email }) => {
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/user/reset-password",
        { email, password, confirmPassword }
      );

      if (res.data.success) {
        toast.success("Password reset successful");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <input
        className="w-full px-3 py-2 border"
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="w-full px-3 py-2 border"
        type="password"
        placeholder="Confirm password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={resetPassword} className="btn-black">
        Reset Password
      </button>
    </>
  );
};

export default ResetPassword;
