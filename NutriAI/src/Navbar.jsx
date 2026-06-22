import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
function Navbar() {
  const navigate=useNavigate();
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          N
        </div>
        <span className="text-xl font-bold">
          NutriTrack
        </span>
      </div>
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={()=>navigate("/login")}>
          Login
        </button>

        <button className=" bg-blue-600 text-white px-4 py-2 rounded-md" onClick={()=>navigate("/signup")}>
          Signup
        </button>
      </div>

    </nav>
  );
}

export default Navbar;