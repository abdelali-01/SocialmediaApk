import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Routes , Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Check } from "./redux/auth/authHandler";
import Verify from "./pages/verify/Verify";

function App() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    dispatch(Check());
  },[])

  return (
        <Routes>
          <Route exact path="/" element={user ? <Home/> : <Login/>}/>
          <Route path="/signup" element={user ? <Navigate to="/"/> : <Signup/> }/>
          <Route path="/login" element={user ? <Navigate to="/"/> :<Login/>}/>
          <Route path="/verify" element={user ? <Navigate to="/"/> :<Verify/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>
        </Routes>
  );
}

export default App;
