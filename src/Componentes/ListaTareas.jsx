import React, { useState } from "react";
import TareaFormulario from "./TareaFormulario";
import Tarea from "./Tarea";
import "../HojasDeEstilo/ListaTareas.css";

function ListaTareas() {
  const [tareas, setTarea] = useState(JSON.parse(window.localStorage.getItem("tareas")) || []);

  const tareaLocalStorage = (value) => {
      try {
          setTarea(value);
          window.localStorage.setItem("tareas", JSON.stringify(value));
      } catch (error) {
          console.log(error);
      }
  };

  const agregarTarea = (tarea) => {
      if (tarea.texto.trim()) {
          tarea.texto = tarea.texto.trim();
          const tareasActualizada = [tarea, ...tareas];
          tareaLocalStorage(tareasActualizada);
      }
  };

  const eliminarTarea = (id) => {
      const tareasActualizada = tareas.filter((tarea) => tarea.id !== id);
      tareaLocalStorage(tareasActualizada);
  };

  const completarTarea = (id) => {
      const tareasActualizada = tareas.map((tarea) => {
          if (tarea.id === id) {
              tarea.completada = !tarea.completada;
          }
          return tarea;
      });
      tareaLocalStorage(tareasActualizada);
  };

    return (
        <>
            <TareaFormulario onSubmit={agregarTarea} />
            <div className="tareas-lista-contenedor">
                {tareas.map((tarea) => (
                    <Tarea
                        key={tarea.id}
                        id={tarea.id}
                        texto={tarea.texto}
                        completada={tarea.completada}
                        completarTarea={completarTarea}
                        eliminarTarea={eliminarTarea}
                    />
                ))}
            </div>
        </>
    );
}

export default ListaTareas;
