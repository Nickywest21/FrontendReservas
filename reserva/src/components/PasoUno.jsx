import "../styles/Pasos.css";

function StepOne({ data, updateData, error }) {

    return (
        <div className="step">

            <h1>Realiza tu reserva</h1>

            <p className="step-description">
                Selecciona el laboratorio que deseas reservar.
            </p>

            <div className="form-group">

                <label>
                    Laboratorio
                </label>

                <select
                    value={data.service}
                    onChange={(e) =>
                        updateData("service", e.target.value)
                    }
                >
                    <option value="">
                        Selecciona un laboratorio
                    </option>

                    <option value="servicio1">
                        Laboratorio de química
                    </option>

                    <option value="servicio2">
                        Laboratorio de física
                    </option>

                    <option value="servicio3">
                        Laboratorio de computación
                    </option>

                </select>

            </div>

            <div className="form-group">

                <label>
                    Número de personas
                </label>

                <input
                    type="number"
                    min="1"
                    value={data.people}
                    onChange={(e) =>
                        updateData("people", e.target.value)
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

export default StepOne;