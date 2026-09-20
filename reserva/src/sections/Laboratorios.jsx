import { useState } from "react";

import "../styles/Laboratorios.css";

const labsImages = import.meta.glob(
    "../assets/labs/*/*.svg",
    { eager: true, import: "default" }
);

const imagesByLab = Object.entries(labsImages).reduce((acc, [key, url]) => {
    const folder = key.split("/").at(-2);
    (acc[folder] ||= []).push(url);
    return acc;
}, {});

Object.values(imagesByLab).forEach((list) => list.sort());

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
        capacity: "6 a 12 personas"
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
        capacity: "8 a 15 personas"
    },
    {
        id: "biologia",
        name: "Laboratorio de Biología",
        description: "Instalaciones para estudio de muestras biológicas, microscopía y análisis microbiológico.",
        offers: [
            "Microscopía",
            "Análisis microbiológico",
            "Cultivos celulares"
        ],
        capacity: "4 a 10 personas"
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

function Laboratorios({ onNavigate }) {

    return (
        <div className="laboratories-page">

            <h1>Nuestros Laboratorios</h1>

            <p className="laboratories-description">
                Conoce los tres tipos de laboratorio disponibles para tu reserva.
            </p>

            <div className="laboratories-list">

                {laboratories.map((lab) => (
                    <div className="lab-card" key={lab.id}>

                        <Carrusel images={imagesByLab[lab.id] || []} />

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
                                    onClick={() => onNavigate("inicio")}
                                >
                                    Reservar
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