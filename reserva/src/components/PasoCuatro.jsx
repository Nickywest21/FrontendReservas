import { useState } from "react";

import "../styles/Pasos.css";

const confetti = [
    { x: -90, y: -60, rotate: 120, delay: 0, color: "#4caf50" },
    { x: 90, y: -70, rotate: -90, delay: 0.1, color: "#f44336" },
    { x: -60, y: -120, rotate: 200, delay: 0.2, color: "#2196f3" },
    { x: 70, y: -130, rotate: -160, delay: 0.15, color: "#ff9800" },
    { x: -140, y: -30, rotate: 90, delay: 0.25, color: "#e91e63" },
    { x: 140, y: -20, rotate: -50, delay: 0.3, color: "#ffeb3b" },
    { x: -80, y: -160, rotate: 70, delay: 0.35, color: "#9c27b0" },
    { x: 90, y: -160, rotate: -220, delay: 0.4, color: "#00bcd4" },
    { x: -170, y: -80, rotate: 140, delay: 0.45, color: "#4caf50" },
    { x: 170, y: -90, rotate: -120, delay: 0.5, color: "#f44336" },
    { x: -30, y: -190, rotate: 110, delay: 0.55, color: "#2196f3" },
    { x: 40, y: -195, rotate: -80, delay: 0.6, color: "#ff9800" }
];

function StepFour({ data, onConfirm }) {
    const [confirmed, setConfirmed] = useState(false);

    const confirmarReserva = () => {
        setConfirmed(true);
        onConfirm();
    };

    return (
        <div className="step">
            {!confirmed ? (
                <>
                    <h1>Confirma tu reserva</h1>

                    <p className="step-description">
                        Revisa que toda la información sea correcta.
                    </p>

                    <div className="summary">
                        <p>
                            <strong>Servicio:</strong> {data.service}
                        </p>

                        <p>
                            <strong>Fecha:</strong> {data.date}
                        </p>

                        <p>
                            <strong>Hora:</strong> {data.time}
                        </p>

                        <p>
                            <strong>Personas:</strong> {data.people}
                        </p>

                        <p>
                            <strong>Nombre:</strong> {data.name}
                        </p>

                        <p>
                            <strong>Correo:</strong> {data.email}
                        </p>

                        <p>
                            <strong>Teléfono:</strong> {data.phone}
                        </p>
                    </div>

                    <button
                        className="btn-confirm"
                        onClick={confirmarReserva}
                    >
                        Confirmar reserva
                    </button>
                </>
            ) : (
                <div className="confirmation">
                    <div className="confetti-container">
                        {confetti.map((piece, index) => (
                            <span
                                key={index}
                                className="confetti-piece"
                                style={{
                                    "--confetti-x": `${piece.x}px`,
                                    "--confetti-y": `${piece.y}px`,
                                    "--confetti-rotate": `${piece.rotate}deg`,
                                    "--confetti-delay": `${piece.delay}s`,
                                    background: piece.color
                                }}
                            />
                        ))}
                    </div>

                    <div className="success-animation">
                        <div className="success-ring"></div>

                        <div className="success-circle">
                            <svg
                                className="success-check"
                                viewBox="0 0 52 52"
                            >
                                <circle
                                    className="success-check-circle"
                                    cx="26"
                                    cy="26"
                                    r="24"
                                />

                                <path
                                    className="success-check-mark"
                                    fill="none"
                                    d="M14 27l7.5 7.5L38 19"
                                />
                            </svg>
                        </div>
                    </div>

                    <h1 className="success-title">
                        ¡Reserva confirmada!
                    </h1>

                    <p className="success-text">
                        Gracias, por elegirnos. Tu reserva está lista.
                    </p>
                </div>
            )}
        </div>
    );
}

export default StepFour;