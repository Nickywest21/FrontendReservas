import "../styles/PasosProgreso.css";

function ProgressSteps({ currentStep }) {
    const steps = [
        "Reserva",
        "Fecha",
        "Datos",
        "Confirmación"
    ];

    return (
        <div className="progress-container">
            <div className="progress-line">
                <div
                    className="progress-line-fill"
                    style={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
                    }}
                ></div>
            </div>

            {steps.map((step, index) => {
                const stepNumber = index + 1;

                const completed = currentStep > stepNumber;
                const active = currentStep === stepNumber;

                return (
                    <div
                        key={step}
                        className={`progress-step ${
                            completed
                                ? "completed"
                                : active
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="step-circle">
                            {completed ? "✓" : stepNumber}
                        </div>

                        <span>{step}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default ProgressSteps;