import React from "react";
import "../HojasDeEstilo/Tarea.css"
import { VscClose } from "react-icons/vsc";

function Tarea({texto,completada,id,completarTarea,eliminarTarea}){
  return(
    <div className={completada ? "tarea-contenedor completada" : "tarea-contenedor"}>
      <div className="tarea-texto"
           onClick={()=>completarTarea(id)}
      >
        {texto}
      </div>
      <div className="tarea-contenedor-icono-"
           onClick={()=> eliminarTarea(id)}
      >
        <VscClose className="tarea-icono"/>
      </div>
    </div>
  )
}

export default Tarea