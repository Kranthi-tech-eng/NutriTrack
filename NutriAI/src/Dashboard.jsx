import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./api";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageMealType, setImageMealType] = useState("Lunch");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch profile
        const profileResponse = await fetch(
          `${BASE_URL}/api/profile/get`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const profileData = await profileResponse.json();

        // Fetch meals
       const mealsResponse = await fetch(
  `${BASE_URL}/api/meals/today`,
  {
    headers: {
      Authorization: token,
    },
  }
);

        const mealsData = await mealsResponse.json();

        if (profileResponse.ok) {
          setUser(profileData);
        } else {
          alert(profileData.message);
        }

        if (mealsResponse.ok) {
          setMeals(mealsData);
        } else {
          setMeals([]);
        }
      } catch (err) {
        console.log(err);
        alert("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);
  const handleImageUpload = async (event) => {
  const image = event.target.files[0];

  if (!image) return;

  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append("image", image);

    // Step 1: Analyze image with AI
    const aiResponse = await fetch(
      `${BASE_URL}/api/ai/nutrition/image`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      }
    );

    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      alert(aiData.message);
      return;
    }

    // Step 2: Save meal automatically
    const mealResponse = await fetch(
      `${BASE_URL}/api/meals/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          mealType: imageMealType,
          items: aiData,
        }),
      }
    );

    const mealData = await mealResponse.json();

    if (mealResponse.ok) {
      alert("Meal added successfully");

      // Refresh dashboard data
      window.location.reload();
    } else {
      alert(mealData.message);
    }
  } catch (err) {
    console.log(err);
    alert("Failed to analyze image");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  const consumedCalories = meals.reduce((mealTotal, meal) => {
    return (
      mealTotal +
      meal.items.reduce(
        (itemTotal, item) => itemTotal + item.calories,
        0
      )
    );
  }, 0);

  const consumedProtein = meals.reduce((mealTotal, meal) => {
    return (
      mealTotal +
      meal.items.reduce(
        (itemTotal, item) => itemTotal + item.protein,
        0
      )
    );
  }, 0);

  const caloriePercentage = user?.calorieTarget
    ? Math.min(
        (consumedCalories / user.calorieTarget) * 100,
        100
      )
    : 0;

  const proteinPercentage = user?.proteinTarget
  ? Math.min(
      (consumedProtein / user.proteinTarget) * 100,
      100
    )
  : 0;

const getInsightMessage = () => {
  const calorieTarget = user?.calorieTarget || 0;
  const proteinTarget = user?.proteinTarget || 0;

  const caloriesDone = consumedCalories >= calorieTarget;
  const proteinDone = consumedProtein >= proteinTarget;

  if (caloriesDone && proteinDone) {
    return "🎉 Congratulations! You've achieved both your calorie and protein goals today. Keep up the great work!";
  }

  if (caloriesDone && !proteinDone) {
    return `💪 Great job reaching your calorie goal! You still need ${Math.max(
      proteinTarget - consumedProtein,
      0
    )}g of protein today.`;
  }

  if (!caloriesDone && proteinDone) {
    return `🔥 Excellent protein intake! You need ${Math.max(
      calorieTarget - consumedCalories,
      0
    )} more calories to reach your target.`;
  }

  return `🚀 Keep going! You need ${Math.max(
    calorieTarget - consumedCalories,
    0
  )} kcal and ${Math.max(
    proteinTarget - consumedProtein,
    0
  )}g protein to reach today's goals.`;
};

const insightBgColor =
  consumedCalories >= (user?.calorieTarget || 0) &&
  consumedProtein >= (user?.proteinTarget || 0)
    ? "bg-green-600"
    : "bg-blue-600";



  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome back, {user?.name} 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Track your nutrition and stay consistent with your fitness goals.
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-2xl px-4 py-3">
            🔥 Keep Going!
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              🔥 Daily Calories
            </h2>

            <p className="text-3xl font-bold">
              {consumedCalories} / {user?.calorieTarget} kcal
            </p>

            <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${caloriePercentage}%` }}
              ></div>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {Math.max(
                user?.calorieTarget - consumedCalories,
                0
              )} kcal remaining
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              💪 Daily Protein
            </h2>

            <p className="text-3xl font-bold">
              {consumedProtein} / {user?.proteinTarget} g
            </p>

            <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{ width: `${proteinPercentage}%` }}
              ></div>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {Math.max(
                user?.proteinTarget - consumedProtein,
                0
              )} g remaining
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700"
              onClick={() => navigate("/addmeal")}
            >
              ➕ Add Meal
            </button>

           <div className="flex-1">
  <select
    value={imageMealType}
    onChange={(e) => setImageMealType(e.target.value)}
    className="w-full border rounded-xl px-4 py-3 mb-3"
  >
    <option>Breakfast</option>
    <option>Lunch</option>
    <option>Snacks</option>
    <option>Dinner</option>
  </select>

  <label className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 text-center cursor-pointer">
    📷 Upload Meal Image

    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="hidden"
    />
  </label>
</div>
          </div>
        </div>

        {/* Meals Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Today's Meals
          </h2>

          {meals.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {meals.map((meal) => {
                const totalCalories = meal.items.reduce(
                  (sum, item) => sum + item.calories,
                  0
                );

                const totalProtein = meal.items.reduce(
                  (sum, item) => sum + item.protein,
                  0
                );

                return (
                  <div
                    key={meal._id}
                    className="bg-white rounded-2xl shadow-md p-5"
                  >
                    <h3 className="font-bold text-lg">
                      {meal.mealType}
                    </h3>

                    <ul className="mt-3 text-gray-600">
                      {meal.items.map((item) => (
                        <li key={item._id}>
                          • {item.foodName} ({item.quantity})
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex justify-between text-sm">
                      <span>{totalCalories} kcal</span>
                      <span>{totalProtein} g protein</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
              No meals added yet.
            </div>
          )}
        </div>

        {/* AI Insight */}
        <div
  className={`mt-8 ${insightBgColor} text-white rounded-2xl p-6`}
>
  <h2 className="font-bold text-xl mb-3">
    🤖 Daily Insight
  </h2>

  <p>{getInsightMessage()}</p>
</div>

      </div>

      <footer className="text-center text-gray-500 text-xs pb-4">
        NutriTrack · Stay consistent, stay healthy 💙
      </footer>
    </div>
  );
}

export default Dashboard;