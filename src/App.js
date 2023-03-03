import React from "react";
import { useEffect, useContext } from 'react';
import Boton from './Componentes/Boton';
import AnimacionReloj from './Componentes/Animacion_Reloj';
import SetPomodoro from './Componentes/SetPomodoro';
import {FuncionesContext} from "./Componentes/Funciones_Reloj";

const App = () => {
  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn } = useContext(FuncionesContext )

    useEffect(() => {updateExecute(executing)}, [executing, startAnimate])

  return (
    <div className="contenedor">
      <h1>Pomodoro</h1>
      <h2>La mejor tecnica de estudio</h2>
      {pomodoro !== 0 ?
      <>
        <ul className="opciones">
          <li>
            <Boton 
              title="Work" 
              activeClass={executing.active === 'work' ? 'opcion-activada' : undefined} 
              _callback={() => setCurrentTimer('work')} 
            />
          </li>
          <li>
            <Boton 
              title="Short Break" 
              activeClass={executing.active === 'short' ? 'opcion-activada' : undefined} 
              _callback={() => setCurrentTimer('short')} 
            />
          </li>
          <li>
            <Boton 
              title="Long Break" 
              activeClass={executing.active === 'long' ? 'opcion-activada' : undefined} 
              _callback={() => setCurrentTimer('long')} 
            />
          </li>
        </ul>
        <Boton title="Volver" _callback={SettingsBtn} />
        <div className="contenedor-reloj">
          <div className="sub-contenedor-reloj">
              <AnimacionReloj
                timer={pomodoro} 
                animate={startAnimate}
              >
                {children}
              </AnimacionReloj>
          </div>
        </div>
        <div className="contenedor-botones">
          <Boton title="Iniciar" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
          <Boton title="Pausar" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
        </div>
      </> : <SetPomodoro />}
    </div>
  )
}
export default App
