import { Routes, Route } from "react-router-dom";

import Header from "./sections/Header";
import Inicio from "./sections/inicioPagina";
import Laboratorios from "./sections/Laboratorios";
import BookingWizard from "./sections/AsistenteReserva";
import Contacto from "./sections/Contacto";

function Aplicacion() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Inicio />} />

                <Route
                    path="/laboratorios"
                    element={<Laboratorios />}
                />

                <Route
                    path="/reserva"
                    element={<BookingWizard />}
                />

                <Route
                    path="/contacto"
                    element={<Contacto />}
                />
            </Routes>
        </>
    );
}

export default Aplicacion;