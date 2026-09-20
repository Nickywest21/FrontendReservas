import { Link } from "react-router-dom";
import "../styles/Inicio.css";

function Inicio() {
  return (
    <main className="inicio">

      {/* Presentación */}
      <section className="inicio-hero">
        <div className="inicio-hero-contenido">
          <span className="inicio-etiqueta">
            Reserva de laboratorios
          </span>

          <h1>
            Reserva tu laboratorio
            <br />
            de forma sencilla
          </h1>

          <p>
            Consulta los laboratorios disponibles y realiza tus
            reservas de manera rápida y organizada.
          </p>

          <div className="inicio-botones">
            <Link to="/reserva" className="inicio-boton principal">
              Reservar laboratorio
            </Link>

            <Link to="/laboratorios" className="inicio-boton secundario">
              Ver laboratorios
            </Link>
          </div>
        </div>
      </section>

      {/* Información */}
      <section className="inicio-informacion">
        <div className="inicio-titulo">
          <span>¿Cómo funciona?</span>
          <h2>Reserva tu laboratorio en pocos pasos</h2>
          <p>
            Nuestro sistema permite consultar los laboratorios
            disponibles y realizar una reserva de manera organizada.
          </p>
        </div>

        <div className="inicio-pasos">

          <article className="inicio-paso">
            <div className="inicio-numero">01</div>

            <h3>Selecciona</h3>

            <p>
              Elige el laboratorio que deseas utilizar.
            </p>
          </article>

          <article className="inicio-paso">
            <div className="inicio-numero">02</div>

            <h3>Consulta</h3>

            <p>
              Selecciona una fecha y revisa los horarios disponibles.
            </p>
          </article>

          <article className="inicio-paso">
            <div className="inicio-numero">03</div>

            <h3>Reserva</h3>

            <p>
              Completa tus datos y confirma tu reserva.
            </p>
          </article>

        </div>
      </section>

      {/* Información de los laboratorios */}
      <section className="inicio-laboratorios">
        <div className="inicio-laboratorios-contenido">

          <div>
            <span className="inicio-etiqueta">
              Laboratorios
            </span>

            <h2>
              Espacios preparados para tus prácticas
            </h2>

            <p>
              Consulta la información de los laboratorios disponibles
              y conoce sus características antes de realizar una reserva.
            </p>

            <Link
              to="/laboratorios"
              className="inicio-boton principal"
            >
              Conocer laboratorios
            </Link>
          </div>

          <div className="inicio-laboratorios-tarjeta">
            <div className="inicio-icono">
              🧪
            </div>

            <h3>Laboratorios disponibles</h3>

            <p>
              Encuentra el espacio que necesitas para realizar
              tus actividades académicas.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Inicio;
