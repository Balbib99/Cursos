import logo from './logo.svg';
import './App.css';
import MiComponente from './miComponente';
import { SegundoComponente } from './SegundoComponente';
import { TercerComponente } from './TercerComponente';
import { EventosComponente } from './EventosComponente';

function App() {

  const ficha_medica = {
    altura: "187cm",
    grupo: "H+",
    estado: "Bueno",
    alergias: "Ninguna"
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <div className='componentes'>
          <hr />
          <EventosComponente />

          {/* Cargar mi primer componente */}

          <MiComponente />

          <hr />

          <SegundoComponente />

          <hr />

          <TercerComponente ficha={ficha_medica} />
        </div>

      </header>
    </div>
  );
}

export default App;
