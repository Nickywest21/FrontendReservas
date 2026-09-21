import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PasosProgreso from "../components/PasosProgreso";
import PasoUno from "../components/PasoUno";
import PasoDos from "../components/PasoDos";
import PasoTres from "../components/PasoTres";
import PasoCuatro from "../components/PasoCuatro";

import { createReservation, getReservations } from "../servers/api";
import { labCapacities, labIds } from "../constants/laboratorios";

import "../styles/AsistenteReserva.css";

const obtenerInicio = (hora) => String(hora || "").split(" - ")[0];

function BookingWizard() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const servicioInicial =
        labIds[searchParams.get("lab")] || "";

    const personasIniciales = labCapacities[servicioInicial]
        ? labCapacities[servicioInicial].min
        : 1;

    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState("");
    const [reservaConfirmada, setReservaConfirmada] = useState(false);

    const [disponibilidad, setDisponibilidad] = useState({
        date: null,
        service: null,
        times: new Set(),
        error: ""
    });

    const [bookingData, setBookingData] = useState({
        service: servicioInicial,
        date: "",
        time: "",
        people: personasIniciales,
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        if (!bookingData.date || !bookingData.service) {
            return;
        }

        const fecha = bookingData.date;
        const servicio = bookingData.service;

        let active = true;

        getReservations({ date: fecha, service: servicio })
            .then((reservas) => {
                if (!active) {
                    return;
                }

                const ocupadosTimes = new Set(
                    reservas
                        .filter((r) => r.date === fecha && r.service === servicio)
                        .map((r) => obtenerInicio(r.time))
                );

                setDisponibilidad({
                    date: fecha,
                    service: servicio,
                    times: ocupadosTimes,
                    error: ""
                });

                const tiempoActual = bookingData.time;

                if (tiempoActual && ocupadosTimes.has(obtenerInicio(tiempoActual))) {
                    setBookingData((prev) => ({ ...prev, time: "" }));
                }
            })
            .catch(() => {
                if (active) {
                    setDisponibilidad({
                        date: fecha,
                        service: servicio,
                        times: new Set(),
                        error: "No se pudo verificar la disponibilidad de horarios."
                    });
                }
            });

        return () => {
            active = false;
        };
    }, [bookingData.date, bookingData.service, bookingData.time]);

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

                if (!/^[\p{L}\s]+$/u.test(bookingData.name)) {
                    return "El nombre solo puede contener letras.";
                }

                if (bookingData.name.length > 50) {
                    return "El nombre no puede exceder los 50 caracteres.";
                }

                if (!bookingData.email) {
                    return "Ingresa tu correo electrónico.";
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
                    return "Ingresa un correo válido (ej. correo@gmail.com).";
                }

                if (!bookingData.phone) {
                    return "Ingresa tu número de teléfono.";
                }

                if (!/^\d{8}$/.test(bookingData.phone)) {
                    return "El teléfono debe contener 8 dígitos.";
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

        setBookingData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const confirmarReserva = async () => {
        try {
            setError("");

            await createReservation(bookingData);

            setReservaConfirmada(true);

            setBookingData({
                service: "",
                date: "",
                time: "",
                people: 1,
                name: "",
                email: "",
                phone: ""
            });

            setDisponibilidad({
                date: null,
                service: null,
                times: new Set(),
                error: ""
            });

            return true;
        } catch {
            setError("No se pudo guardar la reserva, intenta de nuevo");

            return false;
        }
    };

    return (
        <main className="booking-page">
            <section className="booking-container">

                <PasosProgreso currentStep={currentStep} />

                <div className="booking-content">

                    {currentStep === 1 && (
                        <PasoUno
                            data={bookingData}
                            updateData={updateData}
                            error={error}
                        />
                    )}

                    {currentStep === 2 && (
                        <PasoDos
                            data={bookingData}
                            updateData={updateData}
                            error={error}
                            disponibilidad={disponibilidad}
                        />
                    )}

                    {currentStep === 3 && (
                        <PasoTres
                            data={bookingData}
                            updateData={updateData}
                            error={error}
                        />
                    )}

                    {currentStep === 4 && (
                        <PasoCuatro
                            data={bookingData}
                            onConfirm={confirmarReserva}
                            error={error}
                        />
                    )}

                </div>

                <div className="booking-buttons">

                    {currentStep > 1 && !reservaConfirmada && (
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

                    {reservaConfirmada && (
                        <button
                            className="btn-next btn-ver-confirmacion"
                            onClick={() => navigate("/mis-reservas")}
                        >
                            Ver mis reservas
                        </button>
                    )}

                </div>

            </section>
        </main>
    );
}

export default BookingWizard;