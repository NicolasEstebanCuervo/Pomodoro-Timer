import React, {useState} from "react";
import "../HojasDeEstilo/TareaFormulario.css"
import {v4 as uuidv4} from "uuid"

function TareaFormulario (props){
 
  const[input,setInput] = useState("")

  const inputNuevo = (e) => {
    setInput(e.target.value)
  }

  const enviar = (e) => {
    e.preventDefault();
    const tareaNueva  = {
      id:uuidv4(),
      texto:input,
      completada:false
    }
    props.onSubmit(tareaNueva)
    setInput("")
  }

  return(
    <div className="input-group mb-3">
      <form className="tarea-formulario container"
        onSubmit={enviar}
      >
        <input 
        className="input-texto"
        placeholder="Escribe una tarea"
        type="text" 
        onChange={inputNuevo}
        value={input}
        />
        <div className="input-group-append div-boton">
          <button className="boton-agregar">Agregar Tarea</button>
        </div>
      </form>
    </div>
  )
}

export default TareaFormulario