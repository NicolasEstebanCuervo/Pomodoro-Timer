import React from 'react';
import { useContext } from 'react'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import {FuncionesContext}  from './Funciones_Reloj'

const AnimacionReloj = ({animate,timer,children}) => {
  const { stopAnimate } = useContext(FuncionesContext)

    return (
      <CountdownCircleTimer
      isPlaying={animate}
      duration={timer * 60}
      colors={['#7575EE']}
      colorsTime={[1]}
      onComplete={() => stopAnimate()}
      >
        {children}
      </CountdownCircleTimer>
    )
}
export default AnimacionReloj
