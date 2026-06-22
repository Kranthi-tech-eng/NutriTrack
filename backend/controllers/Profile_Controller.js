import User from "../models/User.js";

export const saveProfile = async (req, res) => {
  try {

    const userId = req.userId;

    const {
      age,
      gender,
      height,
      weight,
      goal,
      calorieTarget,
      proteinTarget
    } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        age,
        gender,
        height,
        weight,
        goal,
        calorieTarget,
        proteinTarget
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile Updated",
      data: user
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};