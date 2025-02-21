import {
  authCheck,
  authError,
  authLogin,
  authRequest,
  authResponse,
} from "./authSlice";
import axios from "axios";

const serverUri = process.env.REACT_APP_SERVER_URI;

export const Check = (navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/data`, {
      withCredentials: true,
    });
    if (res.data.verified) {
      dispatch(authCheck(res.data));
      navigate("/");
    } else navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch(authError(error.message));
  }
};

export const Verify = (otp, navigate) => async (dispatch) => {
  dispatch(authRequest());

  try {
    await axios.post("/auth/verify", {otp}, { withCredentials: true });
    dispatch(Check(navigate));
  } catch (error) {
    // dispatch(authResponse(error.response.data));
    console.log(error);
    dispatch(authError(error.message));
  }
};

export const Signup = (data, navigate) => async (dispatch) => {
  dispatch(authRequest());

  try {
    await axios.post("/auth/signup", data);
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch(authError(error.message));
  }
};

export const Login = (data, navigate) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const response = await axios.post(
      "/auth/login",
      {
        username: data.username,
        pass: data.pass,
      },
      { withCredentials: true }
    );
    const user = response.data;
    if (user.verified) dispatch(authLogin(response.data));
    else navigate("/verify");
  } catch (error) {
    console.log(error);
    dispatch(authError(error.message));
  }
};
