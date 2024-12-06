import { createContext, useReducer } from "react";
import { AuthReducer } from "./authReducer";

const ENITIAL_STATE = {
  user: {
    _id: "674db5a195d4a4d0d36894cd",
    username: "abdo001",
    email: "abidou@gmail.com",
  },
  isFetching: false,
  error: false,
};

export const authContext = createContext(ENITIAL_STATE);

export const AuthContextProvide = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, ENITIAL_STATE);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
