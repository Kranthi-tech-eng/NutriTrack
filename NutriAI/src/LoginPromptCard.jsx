import { useNavigate } from "react-router-dom";
function LoginPromptCard() {
  const navigate=useNavigate();
  return (
    <div className="max-w-xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">

      <h2 className="text-2xl font-bold mb-3">
        Start Your Fitness Journey
      </h2>

      <p className="text-gray-600 mb-6">
        Login or create an account to track meals,
        monitor calories, protein intake, and view
        your progress over time.
      </p>

      <div className="flex justify-center gap-4">

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg" onClick={()=>navigate("/login")}>
          Login
        </button>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg" onClick={()=>navigate("/signup")}>
          Signup
        </button>

      </div>

    </div>
  );
}

export default LoginPromptCard;