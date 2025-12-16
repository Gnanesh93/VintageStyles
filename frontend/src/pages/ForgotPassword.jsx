import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import ResetPassword from "./ResetPassword";

const ForgotPassword = () => {
  const { backendUrl } = useContext(ShopContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/user/forgot-password",
        { email }
      );

      if (res.data.success) {
        toast.success("OTP sent");
        setStep(2);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/user/verify-otp",
        { email, otp }
      );

      if (res.data.success) {
        toast.success("OTP verified");
        setStep(3);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4">
      <h2 className="text-2xl font-semibold">Forgot Password</h2>

      {step === 1 && (
        <>
          <input
            className="w-full px-3 py-2 border"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp} className="btn-black">
            Request OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            className="w-full px-3 py-2 border"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} className="btn-black">
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && <ResetPassword email={email} />}
    </div>
  );
};

export default ForgotPassword;
