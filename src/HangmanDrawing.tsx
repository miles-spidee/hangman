import "./HangmanDrawing.css"

const HEAD = (
  <div className="head" />
)

const BODY = (
  <div className="body" />
)

const RIGHT_ARM = (
  <div className="right-arm" />
)

const LEFT_ARM = (
  <div className="left-arm" />
)

const RIGHT_LEG = (
  <div className="right-leg" />
)

const LEFT_LEG = (
  <div className="left-leg" />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
  numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div className="drawing-area">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="rope" />
      <div className="beam" />
      <div className="pole" />
      <div className="ground" />
    </div>
  )
}