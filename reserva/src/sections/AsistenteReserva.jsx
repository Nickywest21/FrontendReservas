import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PasosProgreso from "../components/PasosProgreso";
import PasoUno from "../components/PasoUno";
import PasoDos from "../components/PasoDos";
import PasoTres from "../components/PasoTres";
import PasoCuatro from "../components/PasoCuatro";

import { createReservation, getReservations, getSalas } from "../servers/api";
import { salaPorSlug, slotConHora } from "../constants/laboratorios";

import "../styles/AsistenteReserva.css";

function BookingWizard() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const labParam = searchParams.get("lab");

    const [salas, setSalas] = useState([]);
    const [salasError, setSalasError] = useState("");

    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState("");
    const [reservaConfirmada, setReservaConfirmada] = useState(false);

    const [disponibilidad, setDisponibilidad] = useState({
        date: null,
        salaId: null,
        times: new Set(),
        error: ""
    });

    const [bookingData, setBookingData] = useState({
        salaId: "",
        date: "",
        time: "",
        people: 1,
        responsable: "",
        motivo: "",
        email: "",
        phone: ""
    });

    const cargarSalas = async () => {
        const data = await getSalas(); //get Salas() es una función que obtiene la lista de laboratorios desde la API

        setSalas(data);

        const salaInicial = salaPorSlug(data, labParam);

        if (salaInicial) {
            setBookingData((prev) => ({
                ...prev,
                salaId: salaInicial.id,
                people: 1
            }));
        }
    };

    const reintentarSalas = () => {
        setSalasError("");
        setSalas([]);

        cargarSalas().catch(() => {
            setSalasError("No se pudieron cargar los laboratorios.");
        });
    };

    useEffect(() => {
        let active = true;

        getSalas()
            .then((data) => {
                if (!active) {
                    return;
                }

                setSalas(data);

                const salaInicial = salaPorSlug(data, labParam);

                if (salaInicial) {
                    setBookingData((prev) => ({
                        ...prev,
                        salaId: salaInicial.id,
                        people: 1
                    }));
                }
            })
            .catch(() => {
                if (active) {
                    setSalasError("No se pudieron cargar los laboratorios.");
                }
            });

        return () => {
            active = false;
        };
    }, [labParam]);

    useEffect(() => {
        if (!bookingData.date || !bookingData.salaId) {
            return;
        }

        const fecha = bookingData.date;
        const salaId = bookingData.salaId;

        let active = true;

        getReservations({ fecha, salaId })
            .then((reservas) => {
                if (!active) {
                    return;
                }

                const ocupadosTimes = new Set(
                    reservas.map((r) => r.horario)
                );

                setDisponibilidad({
                    date: fecha,
                    salaId,
                    times: ocupadosTimes,
                    error: ""
                });

                const slot = slotConHora(bookingData.time);

                if (slot && ocupadosTimes.has(slot.value)) {
                    setBookingData((prev) => ({ ...prev, time: "" }));
                }
            })
            .catch(() => {
                if (active) {
                    setDisponibilidad({
                        date: fecha,
                        salaId,
                        times: new Set(),
                        error: "No se pudo verificar la disponibilidad de horarios."
                    });
                }
            });

        return () => {
            active = false;
        };
    }, [bookingData.date, bookingData.salaId, bookingData.time]);

    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!bookingData.salaId) {
                    return "Selecciona un laboratorio para continuar.";
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
                if (!bookingData.responsable) {
                    return "Ingresa tu nombre completo.";
                }

                if (bookingData.responsable.trim().length < 3) {
                    return "El nombre debe tener al menos 3 letras.";
                }

                if (!/^[\p{L}\s]+$/u.test(bookingData.responsable)) {
                    return "El nombre solo puede contener letras.";
                }

                if (bookingData.responsable.length > 50) {
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

                if (!bookingData.motivo) {
                    return "Ingresa el motivo de la reserva.";
                }

                if (bookingData.motivo.trim().length < 3) {
                    return "El motivo debe tener al menos 3 caracteres.";
                }

                if (bookingData.motivo.length > 200) {
                    return "El motivo no puede exceder los 200 caracteres.";
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

            if (!bookingData.date || !bookingData.time) {
                throw new Error("Selecciona fecha y hora para continuar.");
            }

            await createReservation({
                salaId: bookingData.salaId,
                responsable: bookingData.responsable,
                motivo: bookingData.motivo,
                people: bookingData.people,
                email: bookingData.email,
                phone: bookingData.phone,
                fecha: bookingData.date,
                horario: bookingData.time
            });

            setReservaConfirmada(true);

            setBookingData({
                salaId: "",
                date: "",
                time: "",
                people: 1,
                responsable: "",
                motivo: "",
                email: "",
                phone: ""
            });

            setDisponibilidad({
                date: null,
                salaId: null,
                times: new Set(),
                error: ""
            });

            return true;
        } catch (err) {
            setError(err.message || "No se pudo guardar la reserva, intenta de nuevo");

            return false;
        }
    };

    const salaSeleccionada =
        salas.find((s) => String(s.id) === String(bookingData.salaId)) || null;

    return (
        <main className="booking-page">
            <section className="booking-container">

                <PasosProgreso currentStep={currentStep} />

                <div className="booking-content">

                    {currentStep === 1 && (
                        <PasoUno
                            salas={salas}
                            salasError={salasError}
                            onRetry={reintentarSalas}
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
                            sala={salaSeleccionada}
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