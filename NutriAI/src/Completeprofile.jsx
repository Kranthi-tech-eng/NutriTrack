import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./api";

function Completeprofile() {
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");

  const calculate = async () => {
    let bmr;

    if (!age || !weight || !height || !gender || !goal) {
      alert("Please fill all fields");
      return;
    }

    if (height <= 0 || weight <= 0 || age <= 0) {
      alert("Please enter valid values");
      return;
    }

    if (gender === "Male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let calories = bmr;
    let protein = 0;

    if (goal === "Weight Loss") {
      calories -= 500;
      protein = weight * 1.8;
    }

    if (goal === "Weight Gain") {
      calories += 300;
      protein = weight * 1.6;
    }

    if (goal === "Maintain Weight") {
      protein = weight * 1.2;
    }

    if (goal === "Muscle Gain") {
      calories += 400;
      protein = weight * 2;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${BASE_URL}/api/profile/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            age,
            gender,
            height,
            weight,
            goal,
            calorieTarget: Math.round(calories),
            proteinTarget: Math.round(protein),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Unable to save profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">
        Calculate Your Nutrition Goals
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full border rounded-lg px-4 py-3"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full border rounded-lg px-4 py-3"
        />

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Goal</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Weight Gain">Weight Gain</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Maintain Weight">Maintain Weight</option>
        </select>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          onClick={calculate}
        >
          Add Details
        </button>
      </div>
    </div>
  );
}

export default Completeprofile;