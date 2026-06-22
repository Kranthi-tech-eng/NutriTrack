import { useState } from 'react'
import Navbar from './Navbar.jsx'
import HeroSection from './HeroSection.jsx';
import LoginPromptCard from './LoginPromptCard.jsx';
import NutritionResultCard from './NutritionResultCard.jsx';
import UserDetailsForm from './UserDetailsForm.jsx';
import Footer from './Footer.jsx';
function App() {
  const [result, setResult] = useState(null)
  return (
    <>
    <div className="max-w-5xl mx-auto px-4">
           <Navbar/>
           <HeroSection/>
           <UserDetailsForm setResult={setResult}/>
           {result && (
        <NutritionResultCard
          calories={result.calories}
          protein={result.protein}
        />
      )}
           <LoginPromptCard/>
           <Footer/>
    </div>
    </>
  )
}

export default App
