import User from "../models/User.js";
import Meal from "../models/Meal.js";

export const getDashboard = async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    const meals = await Meal.find({
      userId: req.userId
    });

    let totalCalories = 0;
    let totalProtein = 0;

    meals.forEach((meal) => {
      meal.items.forEach((item) => {
        totalCalories += item.calories || 0;
        totalProtein += item.protein || 0;
      });
    });

    res.json({
      calorieTarget: user.calorieTarget,
      proteinTarget: user.proteinTarget,

      caloriesConsumed: totalCalories,
      proteinConsumed: totalProtein,

      caloriesRemaining:
        user.calorieTarget - totalCalories,

      proteinRemaining:
        user.proteinTarget - totalProtein
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};