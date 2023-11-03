import React from 'react';
import { useContext, useState } from 'react';
import {FuncionesContext}  from "./Funciones_Reloj";
import "../HojasDeEstilo/SetPomodoro.css";

const SetPomodoro = () => {

  const {updateExecute} = useContext(FuncionesContext)

  const [newTimer, setNewTimer] = useState({
    work: 25,
    short: 5,
    long: 15,
    active: 'work'
  })
      
  const handleChange = (input) => {
    const {name, value} = input.target

    if (!isNaN(value) && parseInt(value) >= 1 && parseInt(value) <= 99) {
    switch (name) {
      case 'work':
        setNewTimer({
          ...newTimer,
          work: parseInt(value)
      })
      break;
      case 'short':
        setNewTimer({
          ...newTimer,
          short: parseInt(value)
      })
      break;
      case 'long':
        setNewTimer({
          ...newTimer,
          long: parseInt(value)
      })
      break;
    }}
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateExecute(newTimer)
  }

  return (
    <div className="form-container">
      <form noValidate onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input className="input" type="number" name="work" onChange={handleChange} value={newTimer.work} />
          <input className="input" type="number" name="short" onChange={handleChange} value={newTimer.short} />
          <input className="input" type="number" name="long" onChange={handleChange} value={newTimer.long} />
        </div>
        <button className='button' type='submit'>Comenzar</button>
      </form>
    </div>
  )
}
export default SetPomodoro
