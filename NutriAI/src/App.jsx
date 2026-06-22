import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Landingpage from "./Landingpage";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AddMeal from "./AddMeal";
import Completeprofile from "./Completeprofile";
function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/addmeal" element={<AddMeal/>}/>
      <Route path="/completeprofile" element={<Completeprofile/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}
export default App;
