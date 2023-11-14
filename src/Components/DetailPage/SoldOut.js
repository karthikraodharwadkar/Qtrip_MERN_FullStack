import React from 'react'
import "./DetailPage.css"
import { useNavigate } from 'react-router-dom'

export default function SoldOut() {
    const navigate= useNavigate()
  return (
    <div className='soldout-main-container'>
        <div className='sold-out-container'>
            <h2>Solt Out!</h2>
            <hr/>
            <p>This activity is currently sold out. But there's a lot more to <span onClick={()=>navigate("/cities")} className='explore'>explore</span>.</p>
        </div>
    </div>
  )
}
