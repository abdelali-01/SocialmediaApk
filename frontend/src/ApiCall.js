import axios from "axios";

const LoginCall = async (userTrying, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userTrying);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error });
  }
};

export default LoginCall;
