import logo from './logo.svg';
import './App.css';
import { AppRouter } from './routing/AppRouter';
import { PruebaContext } from './context/PruebaContext';
import { useEffect, useState } from 'react';

function App() {

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    
    //La primera vez que se carga el componente
    let usuarioLocal = JSON.parse(localStorage.getItem("usuario"));

    setUsuario(usuarioLocal);

  }, []);

  useEffect(() => {
    
    //Cada vez que se actualice el estado usuario, se guarda en el LS
    localStorage.setItem("usuario", JSON.stringify(usuario))

  }, [usuario]);

  return (
    <div className="App">

      <PruebaContext.Provider value={{
        usuario,
        setUsuario
      }}>
        <AppRouter />
      </PruebaContext.Provider>

    </div>
  );
}

export default App;
