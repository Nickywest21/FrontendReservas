import "../styles/Pasos.css";

import { labCapacities } from "../constants/laboratorios";

function StepOne({ data, updateData, error }) {

    const capacity = data.service
        ? labCapacities[data.service]
        : null;

    const handleServiceChange = (value) => {
        updateData("service", value);

        if (labCapacities[value]) {
            updateData("people", labCapacities[value].min);
        }
    };

    const handlePeopleChange = (value) => {
        if (capacity) {
            const numericValue = Math.max(
                capacity.min,
                Math.min(capacity.max, Number(value || capacity.min))
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

            <div className="form-group">

                <label>
                    Laboratorio
                </label>

                <select
                    value={data.service}
                    onChange={(e) =>
                        handleServiceChange(e.target.value)
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
                    min={capacity ? capacity.min : 1}
                    max={capacity ? capacity.max : undefined}
                    value={data.people}
                    onChange={(e) =>
                        handlePeopleChange(e.target.value)
                    }
                />

                {capacity && (
                    <p className="step-hint">
                        Capacidad del laboratorio: {capacity.min} a {capacity.max} personas
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

export default StepOne;