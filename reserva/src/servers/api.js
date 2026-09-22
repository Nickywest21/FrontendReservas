export const API_BASE_URL = "http://localhost:3010/api";

function mensajeErrorApi(json, status) {
    if (json.error && json.detalles) {
        const entradas = Object.entries(json.detalles)
            .map(([campo, mensajes]) => `${campo}: ${String(mensajes).split(",").join(", ")}`)
            .join("; ");

        if (entradas) {
            return `${json.error} (${entradas})`;
        }
    }

    return json.error || `Error al guardar la reserva (${status})`;
}

export async function getSalas() {
    const response = await fetch(`${API_BASE_URL}/salas`);

    if (!response.ok) {
        throw new Error(`Error al obtener los laboratorios (${response.status})`);
    }

    const json = await response.json();

    return Array.isArray(json) ? json : json.data ?? [];
}

export async function getReservations({ fecha, salaId } = {}) {
    const salas = await getSalas();

    const reservas = salas.flatMap((sala) =>
        (sala.reservas || []).map((reserva) => ({
            ...reserva,
            salaId: reserva.salaId ?? sala.id
        }))
    );

    let resultado = reservas;

    if (salaId) {
        resultado = resultado.filter(
            (r) => String(r.salaId) === String(salaId)
        );
    }

    if (fecha) {
        const prefijo = String(fecha).slice(0, 10);

        resultado = resultado.filter(
            (r) => String(r.fecha || "").slice(0, 10) === prefijo
        );
    }

    return resultado;
}

export async function createReservation(reservation) {
    const { salaId, ...datos } = reservation;

    const response = await fetch(
        `${API_BASE_URL}/salas/${encodeURIComponent(salaId)}/reservas`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        }
    );

    if (!response.ok) {
        const json = await response.json().catch(() => ({}));

        throw new Error(mensajeErrorApi(json, response.status));
    }

    return response.json();
}