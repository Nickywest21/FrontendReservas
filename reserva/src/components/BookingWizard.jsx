import { useState } from "react";

import ProgressSteps from "./ProgressSteps";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

import "../styles/BookingWizard.css";

function BookingWizard() {

    const [currentStep, setCurrentStep] = useState(1);

    const [error, setError] = useState("");

    const [bookingData, setBookingData] = useState({
        service: "",
        date: "",
        time: "",
        people: 1,
        name: "",
        email: "",
        phone: ""
    });

    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!bookingData.service) {
                    return "Selecciona un servicio para continuar.";
                }
                break;

            case 2:
                if (!bookingData.date && !bookingData.time) {
                    return "Selecciona fecha y hora para continuar.";
                }
                if (!bookingData.date) {
                    return "Selecciona la fecha de tu reserva.";
                }
                if (!bookingData.time) {
                    return "Selecciona la hora de tu reserva.";
                }
                break;

            case 3:
                if (!bookingData.name) {
                    return "Ingresa tu nombre completo.";
                }
                if (!bookingData.email) {
                    return "Ingresa tu correo electrónico.";
                }
                if (!bookingData.phone) {
                    return "Ingresa tu número de teléfono.";
                }
                break;

            default:
                break;
        }

        return "";
    };

    const nextStep = () => {
        const stepError = validateStep(currentStep);

        if (stepError) {
            setError(stepError);
            return;
        }

        setError("");

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const previousStep = () => {
        setError("");

        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateData = (field, value) => {
        setError("");
        setBookingData({
            ...bookingData,
            [field]: value
        });
    };

    return (
        <main className="booking-page">

            <section className="booking-container">

                <ProgressSteps currentStep={currentStep} />

                <div className="booking-content">

                    {currentStep === 1 && (
                        <StepOne
                            data={bookingData}
                            updateData={updateData}
                            error={error}
                        />
                    )}

                    {currentStep === 2 && (
                        <StepTwo
                            data={bookingData}
                            updateData={updateData}
                            error={error}
                        />
                    )}

                    {currentStep === 3 && (
                        <StepThree
                            data={bookingData}
                            updateData={updateData}
                            error={error}
                        />
                    )}

                    {currentStep === 4 && (
                        <StepFour
                            data={bookingData}
                        />
                    )}

                </div>

                <div className="booking-buttons">

                    {currentStep > 1 && (
                        <button
                            onClick={previousStep}
                            className="btn-back"
                        >
                            Atrás
                        </button>
                    )}

                    {currentStep < 4 && (
                        <button
                            onClick={nextStep}
                            className="btn-next"
                        >
                            Continuar
                        </button>
                    )}

                </div>

            </section>

        </main>
    );
}

export default BookingWizard;