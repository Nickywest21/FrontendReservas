export const API_BASE_URL = "http://localhost:3000/api";

export async function getReservations({ date, service } = {}) {
    const params = new URLSearchParams();

    if (date) {
        params.set("date", date);
    }

    if (service) {
        params.set("service", service);
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

    if (!response.ok) {
        throw new Error(`Error al guardar la reserva (${response.status})`);
    }

    return response.json();
}