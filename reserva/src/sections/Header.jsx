import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem("modoOscuro") === "true";
  });


  // Aplicar el modo guardado al cargar la página
  useEffect(() => {
    document.body.classList.toggle("modo-oscuro", modoOscuro);
  }, [modoOscuro]);


  // Cambiar entre modo claro y oscuro
  const cambiarModo = () => {
    const nuevoModo = !modoOscuro;

    setModoOscuro(nuevoModo);

    localStorage.setItem(
      "modoOscuro",
      nuevoModo
    );
  };


  // Cerrar el menú móvil
  const cerrarMenu = () => {
    setMenuAbierto(false);
  };


  return (
    <header className="header">

      <div className="header-contenedor">

        {/* LOGO */}

        <NavLink
          to="/"
          className="header-logo"
          onClick={cerrarMenu}
        >
          <span className="header-logo-icono">
            🧪
          </span>

          <span className="header-logo-texto">
            Reserva Labs
          </span>
        </NavLink>


        {/* BOTÓN MENÚ MÓVIL */}

        <button
          className="header-menu-btn"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
        >
          ☰
        </button>


        {/* NAVEGACIÓN */}

        <nav
          className={`header-nav ${
            menuAbierto ? "menu-abierto" : ""
          }`}
        >

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "header-link activo"
                : "header-link"
            }
            onClick={cerrarMenu}
          >
            Inicio
          </NavLink>


          <NavLink
            to="/laboratorios"
            className={({ isActive }) =>
              isActive
                ? "header-link activo"
                : "header-link"
            }
            onClick={cerrarMenu}
          >
            Laboratorios
          </NavLink>


          <NavLink
            to="/reserva"
            className={({ isActive }) =>
              isActive
                ? "header-link activo"
                : "header-link"
            }
            onClick={cerrarMenu}
          >
            Reservar
          </NavLink>


          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              isActive
                ? "header-link activo"
                : "header-link"
            }
            onClick={cerrarMenu}
          >
            Contacto
          </NavLink>


          {/* MODO OSCURO */}

          <button
            className="header-modo-btn"
            onClick={cambiarModo}
            aria-label="Cambiar modo de color"
          >
            {modoOscuro ? "☀️" : "🌙"}
          </button>

        </nav>

      </div>

    </header>
  );
}

export default Header;