import React from "react";
import "../HojasDeEstilo/Boton.css"

const Boton = ({title,activeClass,_callback}) => {
  return (
    <button className={`button ${activeClass}`} onClick={_callback}>{title}</button>
  )
}
export default Boton
