import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "./api";


function Signup() {
  const navigate=useNavigate();
 const [name, setName] = useState(""); 
 const [email, setEmail] = useState(""); 
 const [password, setPassword] = useState(""); 
 const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignup = async () => {
    console.log("signup button clicked brotherrr");
    if (!name || !email || !password || !confirmPassword) { alert("Please fill all fields"); return; } 
    if (password !== confirmPassword) { alert("Passwords do not match"); return; }
  try {
    const response = await fetch(
      `${BASE_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    alert(data.message);

    navigate("/login");

  } catch (err) {
    console.log(err);
  }
};
    
  return (
    <div className="max-w-5xl mx-auto px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

       <h1 className="text-4xl font-bold text-center text-blue-600">
  NutriTrack
</h1>

        <p className="text-center text-gray-500 mb-6">
          Start your fitness journey today
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"onClick={handleSignup}>
            Sign Up
          </button>

        </div>

        <p className="text-center mt-6 text-gray-500">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-blue-600 font-semibold cursor-pointer hover:underline"
      >
        Login
      </span>
    </p>

      </div>
    </div>
  );
}

export default Signup;