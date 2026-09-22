import "../styles/Pasos.css";

function StepOne({ salas, salasError, onRetry, data, updateData, error }) {

    const sala = salas.find((s) => String(s.id) === String(data.salaId));

    const handleSalaChange = (value) => {
        updateData("salaId", value);

        const seleccionada = salas.find((s) => String(s.id) === String(value));

        if (seleccionada) {
            updateData("people", 1);
        }
    };

    const handlePeopleChange = (value) => {
        if (sala) {
            const numericValue = Math.max(
                1,
                Math.min(sala.capacidad, Number(value || 1))
            );

            updateData("people", numericValue);
            return;
        }

        updateData("people", value);
    };

    return (
        <div className="step">

            <h1>Realiza tu reserva</h1>

            <p className="step-description">
                Selecciona el laboratorio que deseas reservar.
            </p>

            {salasError && (
                <p className="step-error">
                    {salasError}
                </p>
            )}

            {salasError && onRetry && (
                <button
                    type="button"
                    className="btn-reintentar"
                    onClick={onRetry}
                >
                    Reintentar
                </button>
            )}

            {!salasError && salas.length === 0 && (
                <p className="step-hint">
                    Cargando laboratorios...
                </p>
            )}

            {!salasError && salas.length > 0 && (
                <>

                    <div className="form-group">

                        <label>
                            Laboratorio
                        </label>

                        <select
                            value={data.salaId}
                            onChange={(e) =>
                                handleSalaChange(e.target.value)
                            }
                        >
                            <option value="">
                                Selecciona un laboratorio
                            </option>

                            {salas.map((salaItem) => (
                                <option
                                    key={salaItem.id}
                                    value={salaItem.id}
                                >
                                    {salaItem.nombre}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>
                            Número de personas
                        </label>

                        <input
                            type="number"
                            min={1}
                            max={sala ? sala.capacidad : undefined}
                            value={data.people}
                            onChange={(e) =>
                                handlePeopleChange(e.target.value)
                            }
                        />

                        {sala && (
                            <p className="step-hint">
                                Capacidad del laboratorio: hasta {sala.capacidad} personas
                                {sala.edificio ? ` (${sala.edificio})` : ""}
                            </p>
                        )}

                    </div>

                </>
            )}

            {error && (
                <p className="step-error">
                    {error}
                </p>
            )}

        </div>
    );
}

export default StepOne;