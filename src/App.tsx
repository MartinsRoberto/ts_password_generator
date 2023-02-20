
function App() {

  return (
    <div className="App">
      <h1>Gerador de senha</h1>
      <form>
        <label>
          <input type="checkbox" />
          <span>Números</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Letras maiúsculas</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Letras minúsculas</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Símbolos</span>
        </label>
        <button className="submit">Gerar senha</button>
      </form>
      <div className="generated">
        <input type="text" />
        <button>Copiar</button>
      </div>
    </div>
  )
}

export default App
