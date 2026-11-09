// Extraemos createApp y ref desde Vue para crear la aplicación y manejar datos.
const { createApp } = Vue;

// Creamos un componente reutilizable para mostrar una tarjeta flash.
const FlashCard = {
    // Indicamos los datos que el componente recibe desde la aplicación principal.
    props: ["pregunta", "respuesta", "volteada"],

    // Definimos la parte visual de la tarjeta.
    template: `
        <button class="tarjeta" type="button" @click="$emit('voltear')"
                :aria-label="volteada ? 'Mostrar pregunta' : 'Mostrar respuesta'">
            <span class="tarjeta-etiqueta">
                {{ volteada ? "RESPUESTA" : "PREGUNTA" }}
            </span>
            <span class="tarjeta-contenido">
                {{ volteada ? respuesta : pregunta }}
            </span>
            <span class="tarjeta-pista">
                {{ volteada ? "Haz clic para volver a la pregunta" : "Haz clic para ver la respuesta" }}
            </span>
        </button>
    `
};

// Creamos la aplicación principal de Vue.
const app = createApp({
    // data guarda la información que puede cambiar en pantalla.
    data() {
        return {
            // Lista de preguntas y respuestas que se mostrarán en las tarjetas.
            tarjetas: [
                {
                    pregunta: "¿Qué significa HTML?",
                    respuesta: "HyperText Markup Language. Es el lenguaje que estructura el contenido de una página web."
                },
                {
                    pregunta: "¿Para qué se utiliza CSS?",
                    respuesta: "Se utiliza para dar estilo y diseño a una página web, como colores, tamaños y espacios."
                },
                {
                    pregunta: "¿Qué es JavaScript?",
                    respuesta: "Es un lenguaje de programación que permite agregar interacción y funciones a una página web."
                },
                {
                    pregunta: "¿Qué es el DOM?",
                    respuesta: "Es la representación de la página HTML que JavaScript puede consultar y modificar."
                },
                {
                    pregunta: "¿Qué es Vue.js?",
                    respuesta: "Es un framework de JavaScript que ayuda a crear interfaces interactivas mediante componentes."
                }
            ],

            // currentIndex indica la posición de la tarjeta que se está mostrando.
            currentIndex: 0,

            // volteada indica si se ve la pregunta (false) o la respuesta (true).
            volteada: false
        };
    },

    // computed calcula un valor a partir de los datos de la aplicación.
    computed: {
        // Calcula el porcentaje de avance según la tarjeta actual.
        progreso() {
            return ((this.currentIndex + 1) / this.tarjetas.length) * 100;
        }
    },

    // methods contiene las funciones que ejecutan acciones.
    methods: {
        // Cambia entre la pregunta y la respuesta.
        voltearTarjeta() {
            this.volteada = !this.volteada;
        },

        // Avanza a la siguiente tarjeta y vuelve a la primera al llegar al final.
        siguienteTarjeta() {
            this.currentIndex = (this.currentIndex + 1) % this.tarjetas.length;
            this.volteada = false; // Cada tarjeta nueva comienza mostrando la pregunta.
        },

        // Regresa a la tarjeta anterior y pasa a la última si está en la primera.
        anteriorTarjeta() {
            this.currentIndex =
                (this.currentIndex - 1 + this.tarjetas.length) % this.tarjetas.length;
            this.volteada = false; // Restablece la tarjeta para mostrar la pregunta.
        }
    }
});

// Registramos el componente para poder utilizarlo en el HTML.
app.component("flash-card", FlashCard);

// Iniciamos Vue en el elemento que tiene el id "app".
app.mount("#app");
