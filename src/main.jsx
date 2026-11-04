// Importamos React para crear los componentes de la aplicación.
import React from "react";

// Importamos createRoot para mostrar React en el navegador.
import { createRoot } from "react-dom/client";

// Importamos los estilos de la aplicación.
import "./style.css";

// Estas son las tarjetas que verá el usuario.
const tarjetas = [
  { pregunta: "¿Qué es HTML?", respuesta: "Es el lenguaje que permite organizar el contenido de una página web." },
  { pregunta: "¿Para qué sirve CSS?", respuesta: "Sirve para dar estilo a la página, como colores, tamaños y distribución." },
  { pregunta: "¿Qué es JavaScript?", respuesta: "Es un lenguaje que permite agregar acciones e interacción a una página web." },
  { pregunta: "¿Qué significa DOM?", respuesta: "Significa Document Object Model y representa la estructura HTML como objetos." },
  { pregunta: "¿Qué es React?", respuesta: "Es una biblioteca de JavaScript para crear interfaces usando componentes." }
];

// Este componente representa una tarjeta individual.
function FlashCard({ pregunta, respuesta, volteada, alVoltear }) {
  return (
    // La tarjeta cambia su contenido cuando el usuario la selecciona.
    <button className="tarjeta" type="button" onClick={alVoltear} aria-label="Voltear tarjeta">
      {/* Muestra la pregunta o la respuesta según el estado. */}
      <span className="tipo">{volteada ? "RESPUESTA" : "PREGUNTA"}</span>
      <span className="contenido">{volteada ? respuesta : pregunta}</span>
      {/* Esta indicación recuerda que se puede hacer clic. */}
      <span className="ayuda">Haz clic en la tarjeta para voltearla</span>
    </button>
  );
}

// Componente principal que controla el avance y el estado.
function App() {
  // Guarda el número de la tarjeta que se está mostrando.
  const [indice, setIndice] = React.useState(0);

  // Guarda si la tarjeta actual está mostrando la respuesta.
  const [volteada, setVolteada] = React.useState(false);

  // Calcula cuántas tarjetas hay en total.
  const total = tarjetas.length;

  // Calcula el porcentaje de avance según la tarjeta actual.
  const progreso = ((indice + 1) / total) * 100;

  // Cambia a la tarjeta siguiente.
  function siguiente() {
    setIndice((actual) => (actual + 1) % total);
    setVolteada(false); // La nueva tarjeta empieza mostrando la pregunta.
  }

  // Regresa a la tarjeta anterior.
  function anterior() {
    setIndice((actual) => (actual - 1 + total) % total);
    setVolteada(false); // También vuelve a mostrar la pregunta.
  }

  // Cambia entre pregunta y respuesta.
  function voltearTarjeta() {
    setVolteada((estadoActual) => !estadoActual);
  }

  return (
    // Contenedor principal de toda la aplicación.
    <main className="pagina">
      <section className="aplicacion">
        {/* Encabezado y explicación corta. */}
        <p className="etiqueta">REPASA Y APRENDE</p>
        <h1>Tarjetas de estudio</h1>
        <p className="descripcion">Pon a prueba tus conocimientos una tarjeta a la vez.</p>

        {/* Muestra el número de tarjeta actual y el total. */}
        <div className="fila-progreso">
          <span>Tu progreso</span>
          <span>{indice + 1} de {total}</span>
        </div>

        {/* Barra que representa visualmente el avance. */}
        <div className="barra">
          <div className="avance" style={{ width: `${progreso}%` }}></div>
        </div>

        {/* Se muestra una sola tarjeta en cada momento. */}
        <FlashCard
          pregunta={tarjetas[indice].pregunta}
          respuesta={tarjetas[indice].respuesta}
          volteada={volteada}
          alVoltear={voltearTarjeta}
        />

        {/* Botones para recorrer las tarjetas. */}
        <div className="navegacion">
          <button className="secundario" type="button" onClick={anterior}>Anterior</button>
          <button className="principal" type="button" onClick={siguiente}>Siguiente</button>
        </div>

        {/* Texto que ayuda a entender el funcionamiento. */}
        <p className="nota">Puedes volver a revisar las tarjetas cuando quieras.</p>
      </section>
    </main>
  );
}

// Busca el espacio root del HTML y muestra la aplicación.
createRoot(document.getElementById("root")).render(<App />);