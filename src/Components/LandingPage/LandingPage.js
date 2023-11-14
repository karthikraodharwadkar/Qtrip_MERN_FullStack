import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Footer from "../Footer/Footer";
import axios from "axios";
import CityCards from "../CityCards/CityCards";

export default function LandingPage() {
  const [searchFilter, setSearchFilter] = useState("");
  const [data,setData]=useState([]);

  async function fetchCities(){
    try{
        // let cities = await axios.get("http://localhost:8082/cities")
        let cities = await axios.get("https://qtr-backend.onrender.com/cities")
        setData(cities.data)
    }
    catch(error){
        setData([])
        alert(error)
    }
  }
  
  useEffect(()=>{
    fetchCities()
  },[])

  const handleChange=(event)=>{
    setSearchFilter(event.target.value)
}

  return (
    <div>
      <Navbar/>
      <Hero searchFilter={searchFilter} handleChange={handleChange} />
      <CityCards data={data} searchFilter={searchFilter}/>
      <Footer />
    </div>
  );
}
