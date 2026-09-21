import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Laboratorios.css";

const imagesByLab = {
    quimica: [
        "/img1_Quimica.jpg",
        "/img2_Quimica.jpg",
        "/img3_Quimica.jpg"
    ],
    fisica: [
        "/img1_Física.jpg",
        "/img2_Física.jpg",
        "/img3_Física.jpg"
    ],
    computacion: [
        "/img3_Compu.jpg",
        "/img2_Compu.jpg",
        "/img1_Compu.jpg"
    ]
};

const laboratories = [
    {
        id: "quimica",
        name: "Laboratorio de Química",
        description: "Espacio equipado para análisis, ensayos y prácticas químicas con instrumentación moderna.",
        offers: [
            "Análisis químico",
            "Material de vidrio",
            "Control de temperatura"
        ],
        capacity: "6 a 12 personas",
        images: imagesByLab.quimica
    },
    {
        id: "fisica",
        name: "Laboratorio de Física",
        description: "Área para experimentos de mecánica, electricidad y óptica con equipos de medición de precisión.",
        offers: [
            "Óptica y electricidad",
            "Medición de precisión",
            "Equipos mecánicos"
        ],
        capacity: "8 a 15 personas",
        images: imagesByLab.fisica
    },
    {
        id: "computacion",
        name: "Laboratorio de Computación",
        description: "Espacio equipado con equipos de cómputo, software especializado y conectividad para prácticas y proyectos.",
        offers: [
            "Equipos de cómputo",
            "Software especializado",
            "Redes y conectividad"
        ],
        capacity: "10 a 20 personas",
        images: imagesByLab.computacion
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
                                    onClick={() => navigate("/reserva")}
                                >
                                    <span className="lab-reserve-shadow"></span>
                                    <span className="lab-reserve-edge"></span>
                                    <div className="lab-reserve-front">
                                        <span>Reservar</span>
                                    </div>
                                </button>

                                <span className="lab-capacity">

                                    <svg className="capacity-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>

                                    {lab.capacity}

                                </span>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Laboratorios;