import {useState} from "react";
import OtpInput from "../components/OtpInput";
import ResetPassword from "./ResetPassword";
import axios from "axios";
import {toast} from "react-toastify";

const ForgotPassword =()=>{
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState(Array(6).fill(""));
  const [step,setStep] = useState(1);

  const sendOtp=async ()=>{
    const res = await axios.post("/api/user/forgot-password",{email});
    res.data.success ? setStep(2) : toast.error(res.data.message);
  };

  const verifyOtp = async()=>{
    const otpValue = otp.join("");
    const res = await axios.post("/api/user/verify-otp",{email,otp: otpValue,});
    res.data.success ? setStep(3) : toast.error(res.data.message);
  };

  return (
    <div className="form">
      {step === 1 && (
        <>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <button onClick={sendOtp}>Request OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <OtpInput otp={otp} setOtp={setOtp} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {step === 3 && <ResetPassword email={email} />}
    </div>
  );
};

export default ForgotPassword;
