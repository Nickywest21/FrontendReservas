export const API_BASE_URL = "http://localhost:3010/api";

export async function getSalas() {
    const response = await fetch(`${API_BASE_URL}/salas`);

    if (!response.ok) {
        throw new Error(`Error al obtener los laboratorios (${response.status})`);
    }

    const json = await response.json();

    return Array.isArray(json) ? json : json.data ?? [];
}

export async function getReservations({ fecha, salaId } = {}) {
    const params = new URLSearchParams();

    if (fecha) {
        params.set("fecha", fecha);
    }

    if (salaId) {
        params.set("salaId", salaId);
    }

    const query = params.toString();

    const response = await fetch(
        `${API_BASE_URL}/reservas${query ? `?${query}` : ""}`
    );

    if (!response.ok) {
        throw new Error(`Error al obtener reservas (${response.status})`);
    }

    const json = await response.json();

    return Array.isArray(json) ? json : json.data ?? [];
}

export async function createReservation(reservation) {
    const response = await fetch(`${API_BASE_URL}/reservas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    });

    if (response.status === 409) {
        const json = await response.json().catch(() => ({}));

        throw new Error(
            json.message || "Ese horario ya está reservado. Intenta con otro."
        );
    }

    if (!response.ok) {
        throw new Error(`Error al guardar la reserva (${response.status})`);
    }

    return response.json();
}