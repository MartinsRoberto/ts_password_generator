import { useState } from "react"

function App() {
  const [options, setOptions] = useState<{
    hasNumbers: boolean,
    hasUppercaseLetters: boolean,
    hasLowercaseLetters: boolean,
    hasSymbols: boolean
  }>({
    hasNumbers: false,
    hasUppercaseLetters: false,
    hasLowercaseLetters: false,
    hasSymbols: false
  })

  const [passwordLength, setPasswordLength] = useState<number>(14)

  const [password, setPassword] = useState<string>("")

  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const isChecked = event.target.checked
    setOptions(prevOptions => ({ ...prevOptions, [name]: isChecked }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !(
        options.hasNumbers ||
        options.hasUppercaseLetters ||
        options.hasLowercaseLetters ||
        options.hasSymbols
      )
    ) {
      alert("Selecione pelo menos uma opção para gerar a senha.");
      return;
    }

    let lengthPass = 0

    let password = ""

    while (lengthPass !== passwordLength) {
      const random = Math.floor(Math.random() * 4)

      if (random === 0 && options.hasNumbers) {
        password += getNumber()
        lengthPass++
      }
      else if (random === 1 && options.hasUppercaseLetters) {
        password += getUpperCase()
        lengthPass++
      }
      else if (random === 2 && options.hasLowercaseLetters) {
        password += getLowerCase()
        lengthPass++
      }
      else if (random === 3 && options.hasSymbols) {
        password += getSymbols()
        lengthPass++
      }
    }

    setPassword(password)
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
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

  const handlePasswordLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    const length = Number(event.target.value)
    
    setPasswordLength(length)
  }
  return (
    <div className="App">
      <h1>Gerador de senha</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="number" name="passwordLength" min="7" max="20" value={passwordLength} onChange={handlePasswordLength} />
          <span>Comprimento</span>
        </label>
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
        <input type="text" value={password} />
        <button onClick={handleCopyClick} disabled>Copiar</button>
      </div>
      <div className={`${isCopied} msg-copy`}>Senha copiada com sucesso!</div>
    </div>
  )
}

export default App