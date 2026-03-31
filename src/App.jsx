import { useState, useEffect } from "react"
import "./App.css"

export default function App(){

  const [display, setDisplay] = useState("")
  const [historico, setHistorico] = useState([])
  const [dark, setDark] = useState(false)

  function adicionar(valor){
    setDisplay(display + valor)
  }

  function limpar(){
    setDisplay("")
  }

  function apagar(){
    setDisplay(display.slice(0, -1))
  }

  function calcular(){
    try{
      const resultado = eval(display)
      setHistorico([`${display} = ${resultado}`, ...historico])
      setDisplay(resultado.toString())
    }catch{
      setDisplay("Erro")
    }
  }

  // carregar tema salvo
  useEffect(() => {
    const tema = localStorage.getItem("tema")
    if(tema === "dark"){
      setDark(true)
    }
  }, [])

  // aplicar tema
  useEffect(() => {
    if(dark){
      document.body.classList.add("dark")
      localStorage.setItem("tema", "dark")
    }else{
      document.body.classList.remove("dark")
      localStorage.setItem("tema", "light")
    }
  }, [dark])

  return (
    <div className="app">


      <div className="container">

        <div className="calculadora">
          <input value={display} readOnly />

          <div className="botoes">
            <button onClick={limpar}>C</button>
            <button onClick={() => adicionar("/")}>÷</button>
            <button onClick={() => adicionar("*")}>×</button>
            <button onClick={apagar}>←</button>

            <button onClick={() => adicionar("7")}>7</button>
            <button onClick={() => adicionar("8")}>8</button>
            <button onClick={() => adicionar("9")}>9</button>
            <button onClick={() => adicionar("-")}>-</button>

            <button onClick={() => adicionar("4")}>4</button>
            <button onClick={() => adicionar("5")}>5</button>
            <button onClick={() => adicionar("6")}>6</button>
            <button onClick={() => adicionar("+")}>+</button>

            <button onClick={() => adicionar("1")}>1</button>
            <button onClick={() => adicionar("2")}>2</button>
            <button onClick={() => adicionar("3")}>3</button>
            <button onClick={calcular} className="igual">=</button>

            <button onClick={() => adicionar("0")} className="zero">0</button>
            <button onClick={() => adicionar(".")}>.</button>
          </div>
        </div>

        <div className="historico">
          <h3>Histórico</h3>
          <ul>
            {historico.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}