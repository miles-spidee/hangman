import "./HangmanWord.css"

type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) {
  const letterCount = wordToGuess.replace(/\s/g, "").length
  const responsiveFontSize = `clamp(1.35rem, ${Math.max(
    2.2,
    9.8 - letterCount * 0.5
  )}vw, ${Math.max(1.7, 4.2 - letterCount * 0.2)}rem)`

  return (
    <div className="word-row" aria-label="word to guess" style={{ fontSize: responsiveFontSize }}>
      {wordToGuess.split("").map((letter, index) => (
        <span className={`letter-slot ${letter === " " ? "space" : ""}`} key={index}>
          <span
            className={`letter ${
              !guessedLetters.includes(letter) && reveal ? "revealed-miss" : ""
            }`}
            style={{
              visibility:
                letter === " " || guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}