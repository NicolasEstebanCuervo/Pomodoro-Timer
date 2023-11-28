import React from 'react';
import { useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FuncionesContext } from './Funciones_Reloj';

const AnimacionReloj = ({ animate, timer, children }) => {
  const { stopAnimate } = useContext(FuncionesContext);

  return (
    <CountdownCircleTimer
      isPlaying={animate}
      duration={timer * 60}
      colors={['#7575EE']}
      colorsTime={[1]}
      onComplete={() => stopAnimate()}
      size={calculateSize()}
    >
      {children}
    </CountdownCircleTimer>
  );
};

const calculateSize = () => {
  const extraSmallScreenSize = 90;
  const smallScreenSize = 110;
  const mediumScreenSize = 120;
  const largeScreenSize = 150;
  const extraLargeScreenSize = 200;

  const screenSize = window.innerWidth;

  if (screenSize <= 150) {
    return extraSmallScreenSize;
  } 
  else if (screenSize <= 200) {
    return smallScreenSize;
  } else if (screenSize <= 300) {
    return mediumScreenSize;
  } else if (screenSize <= 400) {
    return largeScreenSize;
  } else {
    return extraLargeScreenSize;
  }
};

export default AnimacionReloj;
