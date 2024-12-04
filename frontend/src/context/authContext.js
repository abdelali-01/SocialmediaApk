import { createContext, useReducer } from "react";
import { AuthReducer } from "./authReducer";

const ENITIAL_STATE = {
  user: null,
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
        dispatch
      }}
    >
      {children}
    </authContext.Provider>
  );
};
