import "../styles/Pasos.css";

function StepThree({ data, updateData, error }) {

    return (
        <div className="step">

            <h1>Tus datos</h1>

            <p className="step-description">
                Ingresa tus datos para completar la reserva.
            </p>

            <div className="form-group">

                <label>
                    Nombre completo
                </label>

                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={data.name}
                    onChange={(e) =>
                        updateData("name", e.target.value)
                    }
                />

            </div>

            <div className="form-group">

                <label>
                    Correo electrónico
                </label>

                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={data.email}
                    onChange={(e) =>
                        updateData("email", e.target.value)
                    }
                />

            </div>

            <div className="form-group">

                <label>
                    Teléfono
                </label>

                <input
                    type="tel"
                    placeholder="0000-0000"
                    value={data.phone}
                    onChange={(e) =>
                        updateData("phone", e.target.value)
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

export default StepThree;