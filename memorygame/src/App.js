import {useState, useEffect} from "react";
import './App.css';
import SingleCard from "./components/SingleCard";

const cardImages = [
  {"src":"/images/helmet.png", matched:false},
  {"src":"/images/potion.png",matched:false},
  {"src":"/images/ring.png",matched:false},
  {"src":"/images/scroll.png",matched:false},
  {"src":"/images/sword.png",matched:false},
  {"src":"/images/shield.png",matched:false},
 
]


function App() {

  
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState();
  const [isOver, setIsOver] = useState(false)
  const [matchedCardsAmount, setMatchedCardsAmount] = useState(0)


  const shuffleCards = () => {
    setMatchedCardsAmount(0);
    setIsOver(false)
    const shuffledCards = [...cardImages, ...cardImages].sort(()=> Math.random() - 0.5).map((card)=>({...card, id: Math.random()}))
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
      if(!choiceOne){
          setChoiceOne(card);
      }else{
        setChoiceTwo(card);
      }
  }

  useEffect(()=>{
      
      if(choiceOne && choiceTwo){
        setDisabled(true)
        if(choiceOne.src === choiceTwo.src){
          setMatchedCardsAmount(prev => prev+1)
          setCards(prev => {
            return prev.map(card => {
              if( card.src === choiceOne.src){
                
                return {...card, matched:true}
              }else{
                return card
              }
            })
          })
          resetTurn();
        }else{
            setTimeout(()=>resetTurn(),1000)
        }
      }
  }, [choiceOne, choiceTwo])


  useEffect(()=>{
    if(matchedCardsAmount === 6){
      setIsOver(true)
    }
    console.log(matchedCardsAmount)
  },[matchedCardsAmount])


  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false)
  }

  
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards} className="header-button">New Game</button>
      <span className="turns"><b>Turns:</b><span style={{marginLeft:"1rem"}}>{turns}</span></span>
       { isOver && <h1 className="over-p" style={{color:"yellow"}}> Congratulations, You have won the game !</h1> } 
      <div className="cards">
        {cards.map((card)=>(
          <SingleCard  
          flipped={ card === choiceOne || card === choiceTwo || card.matched} 
          handleChoice={handleChoice} 
          key={card.id} 
          card={card} 
          disabled={disabled}
          />
        )
        )}
      </div>
      
    </div>
  );
}



export default App;
