import React from "react";
import { useState, createContext } from "react";

export const FuncionesContext = createContext()

function Funciones_Reloj (props) {

  function agregarCeroSiEsNecesario (valor) {

    if (valor < 10) {
  
      return "0" + valor;
  
    } else {
  
      return "" + valor;
  
    }
  }

    const [pomodoro, setPomodoro] = useState(0)
    const [executing, setExecuting] = useState({})
    const [startAnimate, setStartAnimate] = useState(false)

    function setCurrentTimer (active_state) {
        updateExecute({
          ...executing,
          active: active_state
        })
        setTimerTime(executing)
    }

    // start animation fn 
    function startTimer() {
      setStartAnimate(true)
    }
    // pause animation fn 
    function pauseTimer() {
      setStartAnimate(false)
    }

    // clear session storage 
    const SettingsBtn = () => {
      setExecuting({})
      setPomodoro(0)
    }

    // pass time to counter 
    const children = ({ remainingTime }) => {
    const minutes = agregarCeroSiEsNecesario(Math.floor(remainingTime / 60))
    const seconds = agregarCeroSiEsNecesario(remainingTime % 60)
  
    if(minutes == "00" && seconds == "00"){
      
    }

    return `${minutes}:${seconds}`

    }

    const updateExecute = updatedSettings => {
        setExecuting(updatedSettings)
        setTimerTime(updatedSettings)
    }

    const setTimerTime = (evaluate) => {
        switch (evaluate.active) {
            case 'work':
                setPomodoro(evaluate.work)
                break;
            case 'short':
                setPomodoro(evaluate.short)
                break;
            case 'long':
                setPomodoro(evaluate.long)
                break;
                default:
                    setPomodoro(0)
                break;
        }
    }

    function stopAnimate() {
      setStartAnimate(false)
    }

    return (
        <FuncionesContext.Provider value={{
            pomodoro, 
            executing,
            updateExecute, 
            startAnimate, 
            startTimer,
            pauseTimer,
            children,
            SettingsBtn,
            setCurrentTimer,
            stopAnimate
        }}>
            {props.children}
        </FuncionesContext.Provider>
    )
}
export default Funciones_Reloj 