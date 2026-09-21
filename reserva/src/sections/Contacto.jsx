import "../styles/Contacto.css";

const phoneIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const emailIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const locationIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function Contact() {
  const contactCards = [
    {
      icon: phoneIcon,
      title: "Teléfono",
      text: "(502) 2426-2626",
      href: "tel:+50224262626"
    },
    {
      icon: emailIcon,
      title: "Correo",
      text: "ulandivar@url.edu.gt",
      href: "mailto:ulandivar@url.edu.gt"
    },
    {
      icon: locationIcon,
      title: "Ubicación",
      text: "Vista Hermosa III, Zona 16 Guatemala",
      href: "https://www.google.com/maps/place/Universidad+Rafael+Landivar/@14.5947807,-90.4857126,17z/data=!3m1!4b1!4m6!3m5!1s0x8589a31955555537:0x9c472efd9face66a!8m2!3d14.5947755!4d-90.4831323!16s%2Fg%2F1229bmz6?entry=tts&g_ep=EgoyMDI2MDExMy4wIPu8ASoASAFQAw%3D%3D&skid=0cceff9d-3f6f-4a70-95b9-b6e975d0fb41"
    }
  ];

  const socials = [
    { name: "Facebook", href: "https://www.facebook.com/UniversidadRafaelLandivar" },
    { name: "Instagram", href: "https://www.instagram.com/u_landivar/" },
    { name: "WhatsApp", href: "#" }
  ];

  return (
    <main className="contacto">

      {/* ========================================
          HERO
      ======================================== */}

      <section className="contacto-hero">
        <h1>Contáctanos</h1>

        <p>
          Estamos para ayudarte. Elige un canal y te
          responderemos a la brevedad.
        </p>
      </section>


      {/* ========================================
          INFORMACIÓN DE CONTACTO
      ======================================== */}

      <section className="contacto-contenido">

        <div className="contacto-tarjeta">

          <h2>
            Información de contacto
          </h2>

          <p>
            Si tienes alguna duda sobre los laboratorios,
            reservas o disponibilidad, puedes comunicarte
            con nosotros por cualquiera de estos medios.
          </p>

          <div className="contacto-informacion">

            {contactCards.map((card, index) => (
              <a
                className="contacto-item"
                href={card.href}
                key={index}
              >

                <span className="contacto-icono">
                  {card.icon}
                </span>

                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>

              </a>
            ))}

          </div>

        </div>


        {/* ========================================
            REDES SOCIALES
        ======================================== */}

        <div className="contacto-tarjeta">

          <h2>
            Síguenos
          </h2>

          <p>
            También puedes mantenerte en contacto con
            nosotros a través de nuestras redes sociales.
          </p>

          <div className="contacto-informacion">

            {socials.map((social) => (
              <a
                className="contacto-item"
                href={social.href}
                key={social.name}
              >

                <span className="contacto-icono">
                  {social.name === "Facebook" && "f"}
                  {social.name === "Instagram" && "◎"}
                  {social.name === "WhatsApp" && "◉"}
                </span>

                <div>
                  <h3>{social.name}</h3>
                  <p>
                    Visita nuestro perfil
                  </p>
                </div>

              </a>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;