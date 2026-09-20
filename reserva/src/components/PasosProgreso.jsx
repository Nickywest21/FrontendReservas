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

            {steps.map((step, index) => {

                const stepNumber = index + 1;

                return (
                    <div
                        key={step}
                        className={`progress-step ${
                            currentStep >= stepNumber ? "active" : ""
                        }`}
                    >

                        <div className="step-circle">
                            {stepNumber}
                        </div>

                        <span>
                            {step}
                        </span>

                    </div>
                );

            })}

        </div>
    );
}

export default ProgressSteps;