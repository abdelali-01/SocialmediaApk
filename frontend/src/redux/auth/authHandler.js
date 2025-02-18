import { authError, authLogin, authRequest } from "./authSlice"
import axios from 'axios'



export const Signup = (data , dispatch)=>{
    dispatch(authRequest());

    try {
        
    } catch (error) {
        console.log(error);
        dispatch(authError());
    }
}

export const Login = (data) => async (dispatch) =>{
    dispatch(authRequest());

    try {
        const response = await axios.post("/auth/login" , {
            email : data.email ,
            pass : data.pass ,
        });
        dispatch(authLogin(response.data));
        
    } catch (error) {
        console.log(error);
        dispatch(authError);
    }
}