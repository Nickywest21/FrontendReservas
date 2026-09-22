import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Laboratorios.css";

const imagesByLab = {
    redes: [
        "/img1_Redes.jpg",
        "/img2_Redes.jpg",
        "/img3_Redes.jpg"
    ],
    software: [
        "/img1_Software.jpg",
        "/img2_Software.jpg",
        "/img3_Software.jpg"
    ],
    hardware: [
        "/img3_Hardware.jpg",
        "/img2_Hardware.jpg",
        "/img1_Hardware.jpg"
    ]
};

const laboratories = [
    {
        id: "redes",
        name: "Lab A · Redes",
        edificio: "M",
        capacity: 30,
        description: "Espacio equipado para prácticas de redes, cableado estructurado y comunicaciones.",
        offers: [
            "Configuración de redes",
            "Cableado estructurado",
            "Simulación de redes"
        ],
        images: imagesByLab.redes
    },
    {
        id: "software",
        name: "Lab B · Software",
        edificio: "M",
        capacity: 25,
        description: "Área para desarrollo de software, programación y pruebas de aplicaciones.",
        offers: [
            "Desarrollo de software",
            "Programación",
            "Pruebas y QA"
        ],
        images: imagesByLab.software
    },
    {
        id: "hardware",
        name: "Lab C · Hardware",
        edificio: "O",
        capacity: 20,
        description: "Laboratorio para montaje, mantenimiento y diagnóstico de equipos de cómputo.",
        offers: [
            "Montaje de equipos",
            "Electrónica básica",
            "Diagnóstico de hardware"
        ],
        images: imagesByLab.hardware
    }
];

function Carrusel({ images }) {

    const [index, setIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="lab-carousel empty">
                <p>
                    Sin imágenes por el momento.
                </p>
            </div>
        );
    }

    const previous = () =>
        setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

    const next = () =>
        setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

    return (
        <div className="lab-carousel">

            <img
                className="lab-image"
                src={images[index]}
                alt={`Imagen ${index + 1} del laboratorio`}
            />

            <button
                className="carousel-arrow prev"
                onClick={previous}
                aria-label="Imagen anterior"
            >
                &#10094;
            </button>

            <button
                className="carousel-arrow next"
                onClick={next}
                aria-label="Siguiente imagen"
            >
                &#10095;
            </button>

            <div className="carousel-dots">

                {images.map((image, i) => (
                    <button
                        key={image}
                        className={i === index ? "dot active" : "dot"}
                        onClick={() => setIndex(i)}
                        aria-label={`Ir a la imagen ${i + 1}`}
                    />
                ))}

            </div>

        </div>
    );
}

function Laboratorios() {

    const navigate = useNavigate();

    return (
        <div className="laboratories-page">

            <h1>Nuestros Laboratorios</h1>

            <p className="laboratories-description">
                Conoce los tres tipos de laboratorio disponibles para tu reserva.
            </p>

            <div className="laboratories-list">

                {laboratories.map((lab) => (
                    <div className="lab-card" key={lab.id}>

                        <Carrusel images={lab.images || []} />

                        <div className="lab-info">

                            <h2>{lab.name}</h2>

                            <p>{lab.description}</p>

                            <ul className="lab-offers">

                                {lab.offers.map((offer) => (
                                    <li key={offer}>
                                        {offer}
                                    </li>
                                ))}

                            </ul>

                            <div className="lab-footer">

                                <button
                                    className="lab-reserve"
                                    onClick={() => navigate(`/reserva?lab=${lab.id}`)}
                                >
                                    <span className="lab-reserve-shadow"></span>
                                    <span className="lab-reserve-edge"></span>
                                    <div className="lab-reserve-front">
                                        <span>Reservar</span>
                                    </div>
                                </button>

                                <div className="lab-meta">

                                    <span className="lab-edificio">

                                        <svg className="edificio-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 7V3H2v18h20V7H12zm-6 12H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                                        </svg>

                                        Edificio {lab.edificio}

                                    </span>

                                    <span className="lab-capacity">

                                        <svg className="capacity-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>

                                        {lab.capacity} personas

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Laboratorios;