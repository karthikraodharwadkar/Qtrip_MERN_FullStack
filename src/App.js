import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Adventure from './Components/AdventurePage/Adventure';
import DetailPage from './Components/DetailPage/DetailPage';
import Reservation from './Components/Reservation/Reservation';
import { useState } from 'react';


function App() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    personcount: "",
    adventure:"",
    priceperhead:"",
    adventureId:""
  });
  
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<LandingPage/>}></Route>
        <Route path={"/cities/adventures"} element={<Adventure/>}></Route>
        <Route path={"/cities/adventures/detail"} element={<DetailPage formData={formData} setFormData={setFormData} />}></Route>
        <Route path={"/cities/adventures/reservations"} element={<Reservation />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
