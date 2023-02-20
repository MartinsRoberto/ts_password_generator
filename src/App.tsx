import { useState } from "react"

function App() {
  const [options, setOptions] = useState({
    hasNumbers: false,
    hasUppercaseLetters: false,
    hasLowercaseLetters: false,
    hasSymbols: false
  })

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const isChecked = event.target.checked
    setOptions(prevOptions => ({ ...prevOptions, [name]: isChecked }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let lengthPass = 0

    let password = ""

    while (lengthPass != 8) {
      let random = Math.floor(Math.random() * 4)

      if (random == 0 && options.hasNumbers) {
        password += getNumber()
        lengthPass++
      }
      else if (random == 1 && options.hasUppercaseLetters) {
        password += getUpperCase()
        lengthPass++
      }
      else if (random == 2 && options.hasLowercaseLetters) {
        password += getLowerCase()
        lengthPass++
      }
      else if (random == 3 && options.hasSymbols) {
        password += getSymbols()
        lengthPass++
      }
    }

    console.log(password)
  }

  const getNumber = () => {
    return Math.floor(Math.random() * 10)
  }

  const getUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }

  const getLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }

  const getSymbols = () => {
    const symbols = "(){}[]=<>/,.!@#$%&*+-"
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  return (
    <div className="App">
      <h1>Gerador de senha</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="checkbox" name="hasNumbers" checked={options.hasNumbers} onChange={handleCheckboxChange} />
          <span>Números</span>
        </label>
        <label>
          <input type="checkbox" name="hasUppercaseLetters" checked={options.hasUppercaseLetters} onChange={handleCheckboxChange} />
          <span>Letras maiúsculas</span>
        </label>
        <label>
          <input type="checkbox" name="hasLowercaseLetters" checked={options.hasLowercaseLetters} onChange={handleCheckboxChange} />
          <span>Letras minúsculas</span>
        </label>
        <label>
          <input type="checkbox" name="hasSymbols" checked={options.hasSymbols} onChange={handleCheckboxChange} />
          <span>Símbolos</span>
        </label>
        <button className="submit"> Gerar senha</button>
      </form>
      <div className="generated">
        <input type="text" />
        <button>Copiar</button>
      </div>
    </div>
  )
}

export default App