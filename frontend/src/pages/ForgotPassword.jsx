import {useState} from "react";
import OtpInput from "../components/OtpInput";
import ResetPassword from "./ResetPassword";
import axios from "axios";
import {toast} from "react-toastify";

const ForgotPassword =()=>{
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState(Array(6).fill(""));
  const [step,setStep] = useState(1);

  const sendOtp = async () => {
    const res = await axios.post("/api/user/forgot-password", {email});
    res.data.success ? setStep(2) : toast.error(res.data.message);
  };

  const verifyOtp = async ()=>{
    const otpValue = otp.join("");
    const res = await axios.post("/api/user/verify-otp", {email,otp:otpValue,});
    res.data.success ? setStep(3) : toast.error(res.data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg p-5 sm:p-6">
        <p className="prata-regular text-xl sm:text-2xl text-center mb-6">Forgot Password</p>
        {step === 1 && (
          <>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-800 rounded-md mb-4 focus:outline-none focus:ring-1 focus:ring-black"/>

            <button onClick={sendOtp} className="w-full bg-black text-white py-2 rounded-md text-sm sm:text-base">Request OTP </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 text-center">Enter the 6-digit OTP sent to your email</p>

            <div className="flex justify-center">
              <OtpInput otp={otp} setOtp={setOtp} />
            </div>

            <button onClick={verifyOtp} className="w-full bg-black text-white py-2 rounded-md mt-4 text-sm sm:text-base"> Verify OTP</button>
          </>
        )}
        
        {step === 3 && <ResetPassword email={email} />}
      </div>
    </div>
  );
};

export default ForgotPassword;
