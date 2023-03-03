import React from 'react';
import './index.css';
import App from './App';
import {createRoot} from 'react-dom/client';
import Funciones_Reloj from './Componentes/Funciones_Reloj';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Funciones_Reloj>
    <App />
  </Funciones_Reloj>,
);
