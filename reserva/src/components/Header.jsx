import "../styles/Header.css";

function Header() {
    return (
        <header className="header">

            <div className="header-container">

                <div className="logo">
                    Reserva
                </div>

                <nav className="nav">
                    <a href="#">Inicio</a>
                    <a href="#">Reservas</a>
                    <a href="#">Contacto</a>
                </nav>

            </div>

        </header>
    );
}

export default Header;