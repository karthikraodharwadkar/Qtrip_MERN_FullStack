import React from 'react'
import "./Adventure.css"

export default function AdventureFilters({categoryFilter,handleCategoryFilter,setCategoryFilter,hourFilter,handleHourFilter,setHourFilter}) {
    const categories = ["Add Category","Cycling","Hillside","Beaches","Party"]
    const hours=["Filter By Duration (Hours)","0-2","2-6","6-12","12-24"]

    const handleCategoryClear = ()=>{
        setCategoryFilter([])
    }

    const handleHourClear=()=>{
        setHourFilter([])
    }

  return (
    <div className='filter-main-container'>
        <div className='filter-container'>
            <label>Filters:</label>
            <select value={categoryFilter} onChange={handleCategoryFilter}>
                {categories.map((item,index)=>{
                    return(
                    <option key={index} value={index===0 ? "" : `${item}`} disabled={index===0 ? true : false}>{item}</option>
                    )
                })}
            </select>
            <button onClick={handleCategoryClear}>Clear</button>

            <select value={hourFilter} onChange={handleHourFilter}>
                {hours.map((item,index)=>{
                    return(
                    <option key={index} value={index===0 ? "" : `${item}`}>{item}</option>
                    )
                })}
            </select>
            <button onClick={handleHourClear}>Clear</button>
        </div>
    </div>
  )
}
