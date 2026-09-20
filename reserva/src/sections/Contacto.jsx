import "../styles/Contacto.css";

const phoneIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const emailIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" />
    </svg>
);

const locationIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

function Contact() {

    const contactCards = [
        {
            icon: phoneIcon,
            title: "Teléfono",
            text: "(502) 2325-0000",
            href: "tel:+50223250000"
        },
        {
            icon: emailIcon,
            title: "Correo",
            text: "contacto@reserva.lab",
            href: "mailto:contacto@reserva.lab"
        },
        {
            icon: locationIcon,
            title: "Ubicación",
            text: "Ciudad de Guatemala, Guatemala",
            href: "#"
        }
    ];

    const socials = [
        { name: "Facebook", href: "#" },
        { name: "Instagram", href: "#" },
        { name: "WhatsApp", href: "#" }
    ];

    return (
        <div className="contact-page">

            <h1>Contáctanos</h1>

            <p className="contact-description">
                Estamos para ayudarte. Elige un canal y te responderemos a la brevedad.
            </p>

            <div className="contact-cards">

                {contactCards.map((card, index) => (
                    <a
                        className="contact-card"
                        href={card.href}
                        key={index}
                    >
                        <span className="contact-icon">
                            {card.icon}
                        </span>
                        <h2>{card.title}</h2>
                        <p>{card.text}</p>
                    </a>
                ))}

            </div>

            <div className="contact-socials">

                <p className="contact-socials-title">
                    Síguenos en redes sociales
                </p>

                <div className="contact-socials-row">

                    {socials.map((social) => (
                        <a
                            className="social-link"
                            href={social.href}
                            key={social.name}
                        >
                            {social.name}
                        </a>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default Contact;