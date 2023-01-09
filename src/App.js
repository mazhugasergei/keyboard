// react
import { useEffect } from "react"

function App() {
  const rows = [
    [ "Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Backspace" ],
    [ "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{\n[", "}\n]", "|\n\\" ],
    [ "Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":\n;", "\"\n\'", "Enter" ],
    [ "Shift", "Z", "X", "C", "V", "B", "N", "M", "<\n,", ">\n.", "?\n/", "Shift", "↑", "Del" ],
    [ "Ctrl", "Win", "Alt", "", "Func", "Menu", "←", "↓", "→" ]
  ]
  const keysCode = [
    [ "Escape", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    [ "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
    [ "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    [ "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight", "ArrowUp", "Delete"],
    [ "ControlLeft", "MetaLeft", "AltLeft", "Space", "Function", "Menu", "ArrowLeft", "ArrowDown", "ArrowRight" ]
  ]
  const keysSize = [
    [ 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 455],
    [ 301, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 352],
    [ 353, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 502],
    [ 455, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198],
    [ 239, 243, 243, 1282, 198, 250, 198, 198, 198 ]
  ]

  const sound = new Audio('https://markuswedler.github.io/keyboard/assets/key.mp3')

  const keyDown = key => {
    sound.currentTime = 0
    sound.play()
    key.querySelector('.text').style.transform = "scale(.98)"
    key.style.height = "194px"
    key.style.minWidth = key.dataset.size - 4 + "px"
    key.style.margin = "2px"
  }
  const keyUp = key => {
    key.querySelector('.text').style.transform = "scale(1)"
    key.style.height = "198px"
    key.style.minWidth = key.dataset.size + "px"
    key.style.margin = 0
  }

  useEffect(()=>{
    // define all the keys
    const keys = document.querySelectorAll('.key')
    // animation on click
    keys.forEach(key => {
      key.addEventListener("mousedown", (e) => keyDown(e.target))
      key.addEventListener("touchstart", (e) => keyDown(e.target))
      key.addEventListener("click", (e) => keyUp(e.target))
    })
    document.addEventListener("keydown", (e) => {
      keyDown(document.querySelector('[data-key='+ e.code))
    })
    document.addEventListener("keyup", (e) => {
      keyUp(document.querySelector('[data-key='+ e.code))
    })
  }, [])

  return (
    <div className="container">
      <div className="keyboard">
        <div className="cont">
          {
            rows.map((row, i) => (
              <div className="row" key={i}>
                {
                  row.map((key, j) => (
                    <div className="key" data-key={keysCode[i][j]} data-size={keysSize[i][j]} style={{ minWidth: keysSize[i][j] }} key={i+"_"+j}>
                      <div className="top">
                        <div className="text">{ key }</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App