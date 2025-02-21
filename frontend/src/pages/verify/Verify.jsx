import React, { useRef, useState } from "react";
import OtpInput from "react-otp-input";
import AuthStyle from "../../components/AuthStyle";
import { useDispatch, useSelector } from "react-redux";
import { Verify as VerifyUser } from "../../redux/auth/authHandler";
import { useNavigate } from "react-router-dom";
import { resetResponse } from "../../redux/auth/authSlice";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {response} = useSelector(state => state.auth) ;
  

  const handleChange = (value) => {
    setOtp(value);
    dispatch(resetResponse());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(VerifyUser(otp , navigate));
  };
  

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
      }}
    >
      {/* <AuthStyle /> */}
      <form
        onSubmit={handleSubmit}
        className="auth-content p-3 rounded-3"
        style={{
          background: "#e1e1e1",
        }}
      >
        <h4>Enter Your Code :</h4>
        <p className="text-black-50">Check your email</p>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus
          isInputNum
          containerStyle={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
          inputStyle={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid #ced4da",
          }}
          renderInput={(props) => <input {...props} />}
        />
        <p className="text-danger">{response}</p>
        <div className="mt-3 text-center">
          <button className="btn btn-primary" disabled={otp.length !== 6}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
