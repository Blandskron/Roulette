import React, { useState } from "react";
import "./App.css";
import logoImage from '../assets/logo.jpg';
import Roulette from "../components/roulette";
import { initializeApp } from 'firebase/app'; // Importa initializeApp desde el módulo 'firebase/app'
import { getDatabase, ref, push } from 'firebase/database'; // Importa los módulos específicos para Firebase Database
import firebaseConfig from '../firebase/firebaseConfig'; // Asegúrate de que la ruta sea correcta

function App() {
  // Inicializa Firebase con tu objeto de configuración
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [empresa, setEmpresa] = useState('');

    const handleSubmitFormulario = (e) => {
      e.preventDefault();

      // Verificar que los campos obligatorios no estén vacíos
      if (!nombre || !correo || !empresa) {
        alert("Por favor, complete todos los campos obligatorios.");
        return; // No enviar el formulario si algún campo está vacío
      }

      // Obtén una referencia a la base de datos de Firebase
      const referencia = ref(database, 'formulario');

      // Crea un nodo en la base de datos y agrega los datos del formulario
      push(referencia, {
        Nombre: nombre,
        Correo: correo,
        Empresa: empresa
      });

      // Limpia el formulario
      setNombre('');
      setCorreo('');
      setEmpresa('');

      // Llama a la función que cambia el estado para mostrar la ruleta
      handleShowRoulette();
    };

    return (
      <div className="app-form">
        <h2>JUEGA Y GANA</h2>
        <form onSubmit={handleSubmitFormulario}>
          <div>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}  placeholder="Nombre"/>
          </div>
          <div>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo"/>
          </div>
          <div>
            <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Empresa"/>
          </div>
          <button className="form-button" type="submit">JUGAR</button>
        </form>
      </div>
    );
  };

  const [showForm, setShowForm] = useState(true);
  const [showRoulette, setShowRoulette] = useState(false);

  const handleShowRoulette = () => {
    // Cambia el estado para mostrar la ruleta y ocultar el formulario
    setShowForm(false);
    setShowRoulette(true);
  };

  const handleBackToForm = () => {
    // Cambia el estado para mostrar el formulario nuevamente
    setShowForm(true);
    setShowRoulette(false);
  };

  return (
    <div className="container-roulette">
    <header className="app-header">
      <img className='imgLogo' src={logoImage} alt="Logo de ACCO BRANDS CORPORATION" />
    </header>
    <main>
      {showForm && <Formulario />}
      {showRoulette && (
        <div className="roulette-section">
          <Roulette />
          <button className="button-back" onClick={handleBackToForm}>Salir</button>
        </div>
      )}
    </main>
    <footer className="app-footer">
        <p className='reserved'><strong>Alienígenas Productora y Agencia Creativa 2023 &copy; All Rights Reserved</strong></p>
      </footer>
    </div>
  );
}

export default App;



/* import React, { useState } from "react";
import "./App.css";
// import Formulario from "../components/Registro";
import Roulette from "../components/roulette";
import { initializeApp } from 'firebase/app'; // Importa initializeApp desde el módulo 'firebase/app'
import { getDatabase, ref, push } from 'firebase/database'; // Importa los módulos específicos para Firebase Database
import firebaseConfig from '../firebase/firebaseConfig'; // Asegúrate de que la ruta sea correcta

function App() {



// Inicializa Firebase con tu objeto de configuración
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtén una referencia a la base de datos de Firebase
    const referencia = ref(database, 'formulario');

    // Crea un nodo en la base de datos y agrega los datos del formulario
    push(referencia, {
      Nombre: nombre,
      Correo: correo,
      Empresa: empresa
    });

    // Limpia el formulario
    setNombre('');
    setCorreo('');
    setEmpresa('');

  };

  const [showForm, setShowForm] = useState(true);
  const [showRoulette, setShowRoulette] = useState(false);

  const handleSubmit = () => {
    // Aquí puedes realizar el procesamiento de datos del formulario
    // Luego, cambia el estado para mostrar la ruleta y ocultar el formulario
    setShowForm(false);
    setShowRoulette(true);
  };

  const handleBackToForm = () => {
    // Cambia el estado para mostrar el formulario nuevamente
    setShowForm(true);
    setShowRoulette(false);
  };

  return (
    <main>
    {showForm && (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <div>
          <label>Empresa:</label>
          <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
        </div>
        <button type="submit">Enviar</button>
      </form>
      )} 
    {showRoulette && (
      <div className="roulette-section">
        <Roulette />
        <button onClick={handleBackToForm}>Volver al formulario</button>
      </div>
    )}
  </main>
  );
}

export default App; */