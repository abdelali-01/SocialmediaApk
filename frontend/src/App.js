import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Routes , Route, Navigate, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const {user} = useSelector(state => state.auth);
    
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
  },[user , navigate]);

  return (
        <Routes>
          <Route exact path="/" element={user ? <Home/> : <Signup/>}/>
          <Route path="/signup" element={user ? <Navigate to="/"/> : <Signup/> }/>
          <Route path="/login" element={user ? <Navigate to="/"/> :<Login/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>
        </Routes>
  );
}

export default App;
