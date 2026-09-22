import { Link } from "react-router-dom";
import "../styles/Inicio.css";

function Inicio() {
  return (
    <main className="inicio">

      {/* ================================
          HERO
      ================================= */}
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
            Consulta los laboratorios disponibles y encuentra
            el espacio que necesitas para tus actividades académicas.
          </p>

          <div className="inicio-botones">
            <Link
              to="/laboratorios"
              className="inicio-boton"
            >
              Ver laboratorios
              <span className="inicio-flecha">→</span>
            </Link>
          </div>

        </div>
      </section>


      {/* ================================
          CÓMO FUNCIONA
      ================================= */}
      <section className="inicio-informacion">

        <div className="inicio-titulo">

          <span>¿Cómo funciona?</span>

          <h2>
            Reserva en pocos pasos
          </h2>

          <p>
            Nuestro sistema te permite consultar la disponibilidad
            y realizar tu reserva de manera rápida y organizada.
          </p>

        </div>


        <div className="inicio-pasos">

          {/* PASO 1 */}
          <article className="inicio-paso">

            <div className="inicio-paso-superior">

              <div className="inicio-numero">
                01
              </div>

              <div className="inicio-icono">
                🔎
              </div>

            </div>

            <h3>
              Selecciona
            </h3>

            <p>
              Elige el laboratorio que deseas utilizar
              para realizar tus actividades.
            </p>

            <div className="inicio-paso-linea"></div>

          </article>


          {/* PASO 2 */}
          <article className="inicio-paso">

            <div className="inicio-paso-superior">

              <div className="inicio-numero">
                02
              </div>

              <div className="inicio-icono">
                📅
              </div>

            </div>

            <h3>
              Consulta
            </h3>

            <p>
              Selecciona una fecha y revisa los horarios
              disponibles para tu reserva.
            </p>

            <div className="inicio-paso-linea"></div>

          </article>


          {/* PASO 3 */}
          <article className="inicio-paso">

            <div className="inicio-paso-superior">

              <div className="inicio-numero">
                03
              </div>

              <div className="inicio-icono">
                ✓
              </div>

            </div>

            <h3>
              Reserva
            </h3>

            <p>
              Completa tus datos y confirma la reserva
              de tu laboratorio.
            </p>

            <div className="inicio-paso-linea"></div>

          </article>

        </div>

      </section>

    </main>
  );
}

export default Inicio;