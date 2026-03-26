import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"
import "./App.css"

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function getWordClue(word: string) {
  const normalized = word.toLowerCase().replace(/\s/g, "")
  const vowels = normalized.split("").filter(letter => "aeiou".includes(letter)).length
  const uniqueLetters = new Set(normalized).size
  const first = normalized[0]?.toUpperCase() ?? ""
  const last = normalized[normalized.length - 1]?.toUpperCase() ?? ""

  const clues = [
    `The word has ${normalized.length} letters.`,
    `The word starts with "${first}".`,
    `The word ends with "${last}".`,
    `The word has ${vowels} vowel${vowels === 1 ? "" : "s"}.`,
    `The word has ${uniqueLetters} unique letters.`,
  ]

  const clueIndex = normalized.charCodeAt(0) % clues.length
  return clues[clueIndex]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const guessesLeft = 6 - incorrectLetters.length
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const activeLetters = guessedLetters.filter(letter =>
    wordToGuess.includes(letter)
  )

  const resetGame = useCallback(() => {
    setGuessedLetters([])
    setWordToGuess(getWord())
  }, [])

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return
      const key = e.key.toLowerCase()
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [addGuessedLetter])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      resetGame()
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [resetGame])

  const statusText = isWinner
    ? "You escaped the gallows"
    : isLoser
      ? "Game over"
      : "Choose a letter"

  const statusClass = isWinner ? "win" : isLoser ? "lose" : "idle"
  const shouldShowHint = incorrectLetters.length >= 4 && !isWinner
  const currentWordClue = getWordClue(wordToGuess)

  return (
    <main className="app-shell">
      <div className="game-panel">
        <header className="panel-header">
          <p className="eyebrow">Classic Hangman</p>
          <h1>Word Rescue</h1>
          <p className={`status-banner ${statusClass}`} role="status" aria-live="polite">
            {statusText}
          </p>
        </header>

        <section className="game-meta" aria-label="game status">
          <div className="meta-card">
            <span className="label">Attempts Left</span>
            <strong>{guessesLeft}</strong>
          </div>
          <div className="meta-card">
            <span className="label">Wrong Guesses</span>
            <strong>{incorrectLetters.length}</strong>
          </div>
          <button className="restart-btn" onClick={resetGame}>
            New Word
          </button>
        </section>

        <section className="play-area" aria-label="game board">
          <div className="left-pane">
            <section className="drawing-wrap" aria-label="hangman drawing">
              <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            </section>

            <HangmanWord
              reveal={isLoser}
              guessedLetters={guessedLetters}
              wordToGuess={wordToGuess}
            />
          </div>

          <div className="right-pane">
            <p className="help-text">
              Type letters on your keyboard or click the keys. Press Enter for a new round.
            </p>
            <p className="key-legend">
              <span className="good">Green</span> = correct letter, <span className="bad">Red</span> = wrong letter.
            </p>
            <div className="keyboard-wrap">
              <Keyboard
                disabled={isWinner || isLoser}
                activeLetters={activeLetters}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
              />
            </div>
            <div className={`hint-box ${shouldShowHint ? "visible" : "locked"}`}>
              <p className="hint-title">Clue</p>
              <p className="hint-text">
                {shouldShowHint
                  ? currentWordClue
                  : "Clue unlocks after 4 wrong guesses."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App