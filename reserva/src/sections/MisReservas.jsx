import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getReservations } from "../servers/api";
import { labNames } from "../constants/laboratorios";

import "../styles/MisReservas.css";

const labStyles = {
    servicio1: { badge: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
    servicio2: { badge: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
    servicio3: { badge: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)" }
};

function formatDate(date) {
    if (!date) {
        return "";
    }

    const [year, month, day] = date.split("-");

    const fecha = new Date(year, month - 1, day);

    return fecha.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function MisReservas() {
    const navigate = useNavigate();

    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const cargarReservas = async () => {
        setCargando(true);
        setError("");

        try {
            const datos = await getReservations();
            setReservas(datos);
        } catch {
            setError("No se pudieron cargar tus reservas.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        getReservations()
            .then(setReservas)
            .catch(() => setError("No se pudieron cargar tus reservas."))
            .finally(() => setCargando(false));
    }, []);

    return (
        <main className="mis-reservas-page">

            <section className="mis-reservas-header">

                <div className="mis-reservas-titulos">

                    <h1>Mis reservas</h1>

                    <p>
                        Estas son las reservas que has realizado.
                    </p>

                </div>

                {!cargando && !error && reservas.length > 0 && (
                    <span className="mis-reservas-count">
                        {reservas.length} {reservas.length === 1 ? "reserva" : "reservas"}
                    </span>
                )}

            </section>

            {cargando && (
                <div className="mis-reservas-estado" role="status">
                    <div className="mis-reservas-spinner"></div>
                    <p>Cargando tus reservas...</p>
                </div>
            )}

            {!cargando && error && (
                <section className="mis-reservas-empty">

                    <span className="mis-reservas-empty-icon">
                        ⚠️
                    </span>

                    <h2>Ocurrió un problema</h2>

                    <p>{error}</p>

                    <button
                        className="btn-confirmar"
                        onClick={cargarReservas}
                    >
                        Reintentar
                    </button>

                </section>
            )}

            {!cargando && !error && reservas.length === 0 && (
                <section className="mis-reservas-empty">

                    <span className="mis-reservas-empty-icon">
                        📅
                    </span>

                    <h2>Todavía no tienes reservas</h2>

                    <p>
                        Reserva tu laboratorio favorito y aparecerá aquí.
                    </p>

                    <button
                        className="btn-confirmar"
                        onClick={() => navigate("/reserva")}
                    >
                        Reservar ahora
                    </button>

                </section>
            )}

            {!cargando && !error && reservas.length > 0 && (
                <section className="mis-reservas-lista">

                    {reservas.map((reserva, index) => {
                        const estilo = labStyles[reserva.service]
                            || { badge: "#118c8c", bg: "rgba(17, 140, 140, 0.15)" };

                        return (
                            <article
                                className="reserva-card"
                                key={reserva.id || reserva._id || index}
                            >

                                <div className="reserva-card-top">

                                    <span
                                        className="reserva-lab"
                                        style={{
                                            color: estilo.badge,
                                            backgroundColor: estilo.bg
                                        }}
                                    >
                                        {labNames[reserva.service] || reserva.service}
                                    </span>

                                    <span className="reserva-estado">
                                        Confirmada
                                    </span>

                                </div>

                                <h3 className="reserva-fecha">
                                    {formatDate(reserva.date)}
                                </h3>

                                <ul className="reserva-detalles">

                                    <li>
                                        <span>Hora</span>
                                        <strong>{reserva.time}</strong>
                                    </li>

                                    <li>
                                        <span>Personas</span>
                                        <strong>{reserva.people}</strong>
                                    </li>

                                    <li>
                                        <span>Nombre</span>
                                        <strong>{reserva.name}</strong>
                                    </li>

                                    <li>
                                        <span>Correo</span>
                                        <strong>{reserva.email}</strong>
                                    </li>

                                    <li>
                                        <span>Teléfono</span>
                                        <strong>{reserva.phone}</strong>
                                    </li>

                                </ul>

                            </article>
                        );
                    })}

                </section>
            )}

        </main>
    );
}

export default MisReservas;