import { useState } from "react";
import { useNavigate } from "react-router-dom";
function UserDetailsForm({setResult}) {
  const navigate=useNavigate();
    const[age,setAge]=useState("")
    const[weight,setWeight]=useState("")
    const[height,setHeight]=useState("")
    const[gender,setGender]=useState("")
    const[goal,setGoal]=useState("")
    function calculate(){
    let bmr;
    if(height<=0){
        alert("Height never be below 0cm");
        return;
    }
     if(weight<=0){
        alert("weight never be below 0cm");
        return;
    }
     if(age<=0){
        alert("age never be below 0cm");
        return;
    }
    if(!weight || !age||!height||!gender||!goal){
        alert("Enter All the fields");
        return;
    }
    if(gender==="Male"){
        bmr=10 * weight + 6.25 * height - 5 * age + 5;
    }else{
        bmr=10 * weight + 6.25 * height - 5 * age - 161;
    }
    let calories=bmr;
    let protein=0;
    if(goal==="Weight Loss"){
        calories-=500;
        protein=1.8*weight;
    }
    if(goal==="Weight Gain"){
        calories+=300;
        protein=weight*1.6;
    }
    if(goal==="Maintain Weight"){
        protein=weight*1.2;
    }
    if (goal === "Muscle Gain") {
      calories += 400;
      protein = weight * 2;
    }
    setResult({
  age,
  gender,
  height,
  weight,
  goal,
  calories: Math.round(calories),
  protein: Math.round(protein),
});

}
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">
        Calculate Your Nutrition Goals
      </h2>

      <div className="space-y-4">

        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full border rounded-lg px-4 py-3"
        />

        <select className="w-full border rounded-lg px-4 py-3" onChange={(e) => setGender(e.target.value)}>
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="number"
          placeholder="Height (cm)"
           onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
           onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full border rounded-lg px-4 py-3"
        />

        <select className="w-full border rounded-lg px-4 py-3" onChange={(e) => setGoal(e.target.value)}>
          <option>Select Goal</option>
          <option>Weight Loss</option>
          <option>Weight Gain</option>
          <option>Muscle Gain</option>
          <option>Maintain Weight</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold" onClick={calculate}>
          Calculate
        </button>

      </div>
    </div>
  );
}

export default UserDetailsForm;