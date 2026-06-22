import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import BASE_URL from "./api";




function AddMeal() {
  const location = useLocation();
  const navigate = useNavigate();
 

  const [mealType, setMealType] = useState("Breakfast");

  const [foodItems, setFoodItems] = useState(
  location.state?.aiItems || [
    {
      foodName: "",
      quantity: "",
      calories: "",
      protein: "",
    },
  ]
);

  const addItem = () => {
  setFoodItems([
    ...foodItems,
    {
      foodName: "",
      quantity: "",
      calories: "",
      protein: "",
    },
  ]);
};

  const removeItem = (index) => {
    if (foodItems.length === 1) return;

    const updated = [...foodItems];
    updated.splice(index, 1);
    setFoodItems(updated);
  };

  const updateItem = (index, field, value) => {
    const updated = [...foodItems];
    updated[index][field] = value;
    setFoodItems(updated);
  };

  const handleSave = async () => {
  const token = localStorage.getItem("token");

  const hasEmptyFields = foodItems.some(
    (item) => !item.foodName || !item.quantity
  );

  if (hasEmptyFields) {
    alert("Please fill food name and quantity");
    return;
  }

  try {
    // Step 1: Create query for AI
    const query = foodItems
      .map((item) => `${item.quantity} ${item.foodName}`)
      .join(", ");

    // Step 2: Get nutrition data from AI
    const aiResponse = await fetch(
      `${BASE_URL}/api/ai/nutrition/text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ query }),
      }
    );

    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      alert(aiData.message);
      return;
    }

    // Step 3: Save meal with AI data
    const response = await fetch(
      `${BASE_URL}/api/meals/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          mealType,
          items: aiData.map((item) => ({
            foodName: item.foodName,
            quantity: item.quantity,
            calories: Number(item.calories),
            protein: Number(item.protein),
          })),
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setFoodItems(aiData);

      alert("Meal saved successfully");

      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
    alert("Unable to save meal");
  }
};

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <UserNavbar />

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2">
            Add Meal
          </h1>

          <p className="text-gray-500 mb-8">
            Add the foods you consumed for this meal.
          </p>

          {/* Meal Type */}

          <div className="mb-8">
            <label className="block font-medium mb-2">
              Meal Type
            </label>

            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full md:w-64 border rounded-lg px-4 py-3"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Snacks</option>
              <option>Dinner</option>
            </select>
          </div>

          {/* Food Items */}

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Food Items
            </h2>

            {foodItems.map((item, index) => (
              <div
                key={index}
                className="grid md:grid-cols-5 gap-4 mb-4"
              >
                <input
                  type="text"
                  placeholder="Food Name"
                  value={item.foodName}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "foodName",
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "quantity",
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-4 py-3"
                />

                {/* <input
                  type="number"
                  placeholder="Calories"
                  value={item.calories}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "calories",
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-4 py-3"
                /> */}

                {/* <input
                  type="number"
                  placeholder="Protein (g)"
                  value={item.protein}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "protein",
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-4 py-3"
                /> */}

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white rounded-lg px-4 py-3 hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={addItem}
              className="mt-2 text-blue-600 font-medium hover:underline"
            >
              + Add Another Item
            </button>
          </div>

          {/* Save Button */}

          <div className="mt-8">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Save Meal
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMeal;