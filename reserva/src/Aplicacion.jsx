import { useState } from "react";

import Cabecera from "./components/Header";
import AsistenteReserva from "./components/AsistenteReserva";
import Laboratorios from "./components/Laboratorios";
import Contacto from "./components/Contacto";

function Aplicacion() {

    const [page, setPage] = useState("inicio");
    const [wizardKey, setWizardKey] = useState(0);

    const handleNavigate = (target) => {
        if (target === "inicio") {
            setWizardKey((key) => key + 1);
        }
        setPage(target);
    };

    return (
        <>
            <Cabecera onNavigate={handleNavigate} />

            <main>
                {page === "inicio" && (
                    <AsistenteReserva key={wizardKey} />
                )}

                {page === "laboratorios" && (
                    <Laboratorios onNavigate={handleNavigate} />
                )}

                {page === "contacto" && (
                    <Contacto />
                )}
            </main>
        </>
    );
}

export default Aplicacion;