import {useState, useEffect} from "react";
import './App.css';
import SingleCard from "./components/SingleCard";
//cards
const cardImages = [
  {"src":"/images/gollum.jpg", matched:false,text:"MY PRECIOUSS"},
  {"src":"/images/galadriel.jpg",matched:false,text:"EVEN THE SMALLES PERSON CAN CHANGE THE COURSE OF THE FUTURE"},
  {"src":"/images/aragorn.jpg",matched:false,text:"THERE IS ALWAYS HOPE !"},
  {"src":"/images/sauron.jpg",matched:false,text:"ONE RING TO RULL THEM ALL"},
  {"src":"/images/wk2.jpg",matched:false,text:"NO MAN CAN KILL ME !"},
  {"src":"/images/gandalf.jpg",matched:false,text:"IT'S THE DEEP BREATH BEFORE THE PLUNGE"},
 
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
          setQuote(choiceOne.text)
          
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
  },[matchedCardsAmount])


  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false)
  }

  const [quote, setQuote] = useState("");

  
  return (
    <div className="App">
       
      <h1 >WELLCOME TO MIDDLE EARTH</h1>
        
      <button onClick={shuffleCards} className="header-button">New Game</button>
      <span className="turns"><b>Turns:</b><span style={{marginLeft:"1rem"}}>{turns}</span></span>
      
       
       { <p className="quote"> <b>{quote}</b> </p> }
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
      { isOver && <h1 className="over-p" style={{color:"yellow"}}> Congratulations, You have won the game !</h1> } 
    </div>
  );
}



export default App;
