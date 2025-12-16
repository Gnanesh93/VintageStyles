import {Resend} from "resend";

const resend=new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail=async (email,otp)=>{
  await resend.emails.send({
    from:"Your App <onboarding@resend.dev>",
    to:email,
    subject:"Password Reset OTP",
    html: 
      `<h2>Password Reset</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes</p>`
  });
};

export default sendOtpEmail;
