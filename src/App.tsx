import { useState } from "react";
import word from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";


function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return word[Math.floor(Math.random() * word.length)]
  });

  const [guessedLetters, setGuessLetters] = useState<string[]>([])

  const inCorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  return(
    <div style={{
      display:"flex" , 
      maxWidth : "800px" , 
      flexDirection : "column",
      gap : "2rem",
      margin : "0 auto" ,
      alignItems : "center" ,
    }}>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length/>
      <HangmanWord/>
      <div style={{alignSelf:"stretch"}}>
      <Keyboard/></div>
    </div>
  )
}

export default App;