import { useState } from "react";

import "../styles/Header.css";

function Header({ onNavigate }) {

    const [open, setOpen] = useState(false);

    const handleClick = (event, target) => {
        event.preventDefault();
        setOpen(false);
        onNavigate(target);
    };

    return (
        <header className="header">

            <div className="header-container">

                <div className="logo">
                    Reserva
                </div>

                <button
                    className={open ? "menu-toggle open" : "menu-toggle"}
                    aria-label="Abrir menú"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {open && (
                    <nav className="dropdown">
                        <a
                            href="#"
                            onClick={(e) => handleClick(e, "inicio")}
                        >
                            Inicio
                        </a>
                        <a
                            href="#"
                            onClick={(e) => handleClick(e, "laboratorios")}
                        >
                            Ver Laboratorios
                        </a>
                        <a
                            href="#"
                            onClick={(e) => handleClick(e, "contacto")}
                        >
                            Contáctanos
                        </a>
                    </nav>
                )}

            </div>

        </header>
    );
}

export default Header;