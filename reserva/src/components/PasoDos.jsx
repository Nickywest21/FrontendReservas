import "../styles/Pasos.css";

function StepTwo({ data, updateData, error }) {

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
                    value={data.date}
                    onChange={(e) =>
                        updateData("date", e.target.value)
                    }
                />

            </div>

            <div className="form-group">

                <label>
                    Hora
                </label>

                <input
                    type="time"
                    value={data.time}
                    onChange={(e) =>
                        updateData("time", e.target.value)
                    }
                />

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