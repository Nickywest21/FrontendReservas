export const timeSlots = [
    { value: "08:00 - 10:00", inicio: "08:00", fin: "10:00" },
    { value: "11:00 - 13:00", inicio: "11:00", fin: "13:00" },
    { value: "15:00 - 17:00", inicio: "15:00", fin: "17:00" }
];

const slugKeywords = {
    redes: ["redes", "lab a"],
    software: ["software", "lab b"],
    hardware: ["hardware", "lab c"]
};

export function salaPorSlug(salas, slug) {
    if (!salas || !slug || !slugKeywords[slug]) {
        return null;
    }

    const keywords = slugKeywords[slug];

    return salas.find((sala) => {
        const nombre = String(sala.nombre || "").toLowerCase();

        return keywords.some((keyword) => nombre.includes(keyword));
    }) || null;
}

export function obtenerHora(iso) {
    return String(iso || "").slice(11, 16);
}

export function slotConHora(value) {
    return timeSlots.find((slot) => slot.value === value) || null;
}