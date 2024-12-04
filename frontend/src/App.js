import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Routes , Route, Navigate } from "react-router-dom"
import { useContext } from "react";
import { authContext } from "./context/authContext";

function App() {
  const {user} = useContext(authContext); 
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
