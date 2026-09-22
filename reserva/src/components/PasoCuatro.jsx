import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { labNames } from "../constants/laboratorios";

import "../styles/Pasos.css";

const CONFETTI_COLORS = [
    "#4caf50", "#f44336", "#2196f3", "#ff9800",
    "#e91e63", "#ffeb3b", "#9c27b0", "#00bcd4"
];

function generateConfetti() {
    const pieces = [];

    for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI;
        const reach = 70 + (i % 7) * 20;
        const circle = i % 4 === 0;

        pieces.push({
            x: Math.round(Math.cos(angle) * reach),
            y: Math.round(-(Math.sin(angle) * reach)),
            fall: 340 + (i % 5) * 60,
            drift: (i % 3 === 0 ? 1 : -1) * (30 + (i % 4) * 35),
            rotate: (i * 97) % 360,
            rotateEnd: (i * 137 + 540) % 720,
            delay: (i % 6) * 0.08,
            color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            width: circle ? 9 : 7 + (i % 3) * 3,
            height: circle ? 9 : 12 + (i % 4) * 3,
            circle
        });
    }

    return pieces;
}

const confetti = generateConfetti();

function StepFour({ data, onConfirm, error }) {
    const navigate = useNavigate();

    const [confirmed, setConfirmed] = useState(false);
    const [guardando, setGuardando] = useState(false);

    const redireccionTimer = useRef(null);

    useEffect(() => {
        return () => {
            if (redireccionTimer.current) {
                clearTimeout(redireccionTimer.current);
            }
        };
    }, []);

    const confirmarReserva = async () => {
        setGuardando(true);

        const success = await onConfirm();

        setGuardando(false);

        if (success) {
            setConfirmed(true);

            redireccionTimer.current = setTimeout(() => {
                navigate("/mis-reservas");
            }, 2000);
        }
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
                            <strong>Servicio:</strong> {labNames[data.service] || data.service}
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
                        disabled={guardando}
                    >
                        {guardando ? "Guardando..." : "Confirmar reserva"}
                    </button>

                    {error && (
                        <p className="step-error">
                            {error}
                        </p>
                    )}
                </>
            ) : (
                <div className="confirmation">
                    <div className="confetti-container">
                        {confetti.map((piece, index) => (
                            <span
                                key={index}
                                className="confetti-piece"
                                style={{
                                    width: piece.width,
                                    height: piece.height,
                                    background: piece.color,
                                    borderRadius: piece.circle ? "50%" : "2px",
                                    "--confetti-x": `${piece.x}px`,
                                    "--confetti-y": `${piece.y}px`,
                                    "--confetti-fall": `${piece.fall}px`,
                                    "--confetti-drift": `${piece.drift}px`,
                                    "--confetti-rotate": `${piece.rotate}deg`,
                                    "--confetti-rotate-end": `${piece.rotateEnd}deg`,
                                    "--confetti-delay": `${piece.delay}s`
                                }}
                            />
                        ))}
                    </div>

                    <div className="success-animation">
                        <div className="success-rays"></div>

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