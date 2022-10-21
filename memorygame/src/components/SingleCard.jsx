import React from 'react'
import "./single-card.css"
import back from "../back.png"
function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }
 
  return (
    <div onClick={handleClick} className="single-card-container">
        <div className={flipped ? "flipped card" : "card"} >
            <img className='front' src={card.src} alt="none" />
            <img className='back'  src={back} alt="none" />   
        </div>     
    </div>
  )
}

export default SingleCard