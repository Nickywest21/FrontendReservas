import { useState } from "react";

import "../styles/Pasos.css";

const timeSlots = [
    { value: "08:00 - 10:00", start: "08:00" },
    { value: "11:00 - 13:00", start: "11:00" },
    { value: "15:00 - 17:00", start: "15:00" }
];

function StepTwo({ data, updateData, error, disponibilidad }) {
    const [fechaError, setFechaError] = useState("");

    const esFinDeSemana = (fecha) => {
        if (!fecha) {
            return false;
        }

        const [anio, mes, dia] = fecha.split("-").map(Number);

        const diaSemana = new Date(anio, mes - 1, dia).getDay();

        return diaSemana === 0 || diaSemana === 6;
    };

    const handleDateChange = (value) => {
        if (esFinDeSemana(value)) {
            setFechaError("Las reservas no están disponibles los sábados y domingos.");
            return;
        }

        setFechaError("");

        updateData("date", value);
    };

    const coinciden =
        data.date === disponibilidad.date &&
        data.service === disponibilidad.service;

    const ocupadoTimes =
        coinciden && disponibilidad.times instanceof Set
            ? disponibilidad.times
            : new Set();

    const verificando = Boolean(data.date && data.service && !coinciden);
    const errorDisponibilidad = coinciden ? disponibilidad.error : "";
    const sinHorarios = coinciden && ocupadoTimes.size === timeSlots.length;

    const hoy = new Date();
    const fechaMinima =
        `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-` +
        `${String(hoy.getDate()).padStart(2, "0")}`;

    return (
        <div className="step">

            <h1>Selecciona la fecha</h1>

            <p className="step-description">
                Elige la fecha y hora de tu reserva.
            </p>

            <div className="form-group">

                <label>
                    Fecha
                </label>

                <input
                    type="date"
                    min={fechaMinima}
                    value={data.date}
                    onChange={(e) =>
                        handleDateChange(e.target.value)
                    }
                />

                <p className="step-hint">
                    Las reservas no están disponibles los sábados y domingos.
                </p>

                {fechaError && (
                    <p className="horarios-mensaje horarios-error">
                        {fechaError}
                    </p>
                )}

            </div>

            <div className="form-group">

                <label>
                    Hora
                </label>

                <div className="time-slots">

                    {timeSlots.map((slot) => {
                        const ocupado = ocupadoTimes.has(slot.start);
                        const esSeleccionado = data.time === slot.value;

                        const clases = [
                            "time-slot",
                            esSeleccionado ? "active" : "",
                            ocupado ? "reservado" : ""
                        ].join(" ").trim();

                        return (
                            <button
                                key={slot.value}
                                type="button"
                                disabled={ocupado}
                                className={clases}
                                onClick={() => updateData("time", slot.value)}
                                title={
                                    ocupado
                                        ? "Este horario ya está reservado"
                                        : undefined
                                }
                            >
                                <span className="time-slot-hora">
                                    {slot.value}
                                </span>

                                {ocupado && (
                                    <span className="time-slot-etiqueta">
                                        🔒 Reservado
                                    </span>
                                )}
                            </button>
                        );
                    })}

                </div>

                {verificando && !errorDisponibilidad && (
                    <p className="horarios-mensaje horarios-cargando">
                        Verificando disponibilidad...
                    </p>
                )}

                {errorDisponibilidad && (
                    <p className="horarios-mensaje horarios-error">
                        {errorDisponibilidad}
                    </p>
                )}

                {!verificando && !errorDisponibilidad && sinHorarios && (
                    <p className="horarios-mensaje horarios-error">
                        No hay horarios disponibles para esta fecha.
                    </p>
                )}

            </div>

            {error && (
                <p className="step-error">
                    {error}
                </p>
            )}

        </div>
    );
}

export default StepTwo;