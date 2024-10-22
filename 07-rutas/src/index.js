import React from 'react';
//import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'; // IMPORTANTE 
import './index.css';
import App from './App';

// FORMA MÁS OPTIMA DE CREAR EL ROOT RENDER
const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
  <App />
);

//const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <App />
// );
