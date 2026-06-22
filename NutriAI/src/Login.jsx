import { useNavigate } from "react-router-dom";
import BASE_URL from "./api";
import { useState } from "react";
function Login() {
    const navigate=useNavigate();
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
      if (!email || !password) { 
        alert("Please fill all fields"); return; }
  try {

    const response = await fetch(
      `${BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) { localStorage.setItem("token", data.token);
      if (data.hasProfile) {
        navigate("/dashboard");
      } else {
        navigate("/completeprofile");
      }
     }
     else { alert(data.message); } } 
     catch (err) { console.log(err); alert("Unable to connect to server"); }
};
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex items-center justify-center">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-600">
                 NutriTrack
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Continue your fitness journey
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold" onClick={handleLogin}>
            Login
          </button>

        </div>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account? {" "}
          <span
        onClick={() => navigate("/Signup")}
        className="text-blue-600 font-semibold cursor-pointer hover:underline"
      >
        Signup
      </span>
        </p>

      </div>

    </div>
  );
}

export default Login;