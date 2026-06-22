import { useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg rounded-2xl px-6 py-4 mb-6">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          NutriTrack
        </div>

        {/* Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Dashboard
        </button>

      </div>
    </nav>
  );
}

export default UserNavbar;