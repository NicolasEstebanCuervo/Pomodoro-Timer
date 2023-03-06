import React, {useState} from "react";
import TareaFormulario from "./TareaFormulario";
import Tarea from "./Tarea"
import "../HojasDeEstilo/ListaTareas.css"

function ListaTareas(){

  const [tareas,setTarea] = useState([]);

  const agregarTarea = (tarea)=>{
    if(tarea.texto.trim()){
      tarea.texto = tarea.texto.trim();
      const tareasActualizada = [tarea,...tareas]
      setTarea(tareasActualizada)
    }
  }

  const eliminarTarea = (id) => {
    const tareasActualizada = tareas.filter(tarea => tarea.id !== id)
    setTarea(tareasActualizada)
  }

  const completarTarea = (id) => {  
    const tareasActualizada = tareas.map(tarea =>{
      if(tarea.id === id){
        tarea.completada = !tarea.completada
      }
      return tarea
    });
      setTarea(tareasActualizada)
  }

  return(
    <>
      <TareaFormulario onSubmit={agregarTarea}/>
      <div className="tareas-lista-contenedor">   
        {
          tareas.map((tarea) =>
            <Tarea
            key={tarea.id}
            id={tarea.id}
            texto = {tarea.texto}
            completada = {tarea.completada}
            completarTarea = {completarTarea}
            eliminarTarea = {eliminarTarea}
            />
          )
        }
      </div>
    </>
  )
}

export default ListaTareas