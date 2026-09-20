import "../styles/Pasos.css";

function StepOne({ data, updateData, error }) {

    return (
        <div className="step">

            <h1>Realiza tu reserva</h1>

            <p className="step-description">
                Selecciona el servicio que deseas reservar.
            </p>

            <div className="form-group">

                <label>
                    Servicio
                </label>

                <select
                    value={data.service}
                    onChange={(e) =>
                        updateData("service", e.target.value)
                    }
                >
                    <option value="">
                        Selecciona un servicio
                    </option>

                    <option value="servicio1">
                        Servicio 1
                    </option>

                    <option value="servicio2">
                        Servicio 2
                    </option>

                    <option value="servicio3">
                        Servicio 3
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