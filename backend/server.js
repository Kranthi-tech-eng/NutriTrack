import dotenv from "dotenv";
dotenv.config();
console.log("Groq Key:", process.env.GROQ_API_KEY);
import mongoose from 'mongoose'
import express from'express'
import cors from 'cors'
import router from './routes/User_Route.js'
import profileRoute from "./routes/Profile_Route.js";
import mealRoute from "./routes/Meal_Route.js";
import dashboardRoute from "./routes/Dashboard_route.js";
import aiRoutes from "./routes/aiRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",router)
app.use("/api/profile", profileRoute);
app.use("/api/meals", mealRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/ai", aiRoutes);
app.get("/", (req, res) => {
  res.send("NutriTrack Backend Running");
});
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDb Connected Succesfully")
}).catch(()=>{
    console.log("There is an error in connecting")
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});