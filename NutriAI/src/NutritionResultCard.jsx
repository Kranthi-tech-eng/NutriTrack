function NutritionResultCard({calories,protein}) {
  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-lg rounded-2xl p-8">

      <h2 className="text-2xl font-bold mb-6">
        Your Daily Targets
      </h2>

      <div className="flex justify-between items-center mb-4">
        <span className="text-lg">
          🔥 Calories
        </span>

        <span className="font-bold text-xl">
         {calories} kcal
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg">
          💪 Protein
        </span>

        <span className="font-bold text-xl">
          {protein} g
        </span>
      </div>

    </div>
  );
}

export default NutritionResultCard;