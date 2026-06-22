import Meal from "../models/Meal.js";

export const addMeal = async (req, res) => {
  try {

    const { mealType, items } = req.body;

    const meal = await Meal.create({
      userId: req.userId,
      mealType,
      items
    });

    res.status(201).json({
      message: "Meal Added Successfully",
      meal
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getTodayMeals = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId: req.userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};