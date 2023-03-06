import React from "react";
import { useState, createContext } from "react";
import useSound from 'use-sound';
import sonido from '../Sonido/timer.mp3';

export const FuncionesContext = createContext()

function Funciones_Reloj (props) {

  const [play] = useSound(sonido);    

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

    const updateExecute = (updatedSettings) => {
      setExecuting(updatedSettings)
      setTimerTime(updatedSettings)
    }

    const setCurrentTimer = (active_state) => {
      updateExecute({
          ...executing,
          active: active_state
        })
        setTimerTime(active_state)
        pauseTimer()
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
      play()
    }

    return `${minutes}:${seconds}`

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