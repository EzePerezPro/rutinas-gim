import { sql } from "@vercel/postgres";
import { rutina } from "./definitions";

export async function addRutina(rutina: rutina) {
    try {
        console.log("Data being sent:", rutina);

        const result = await sql<{ id: number }[]>`
            INSERT INTO rutinas (ejercicios)
            VALUES (${JSON.stringify(rutina)}::jsonb)
            RETURNING id;
        `;

        return result.rows[0]?? null; // Retorna el ID o null si no hay resultado
    } catch (error) {
        console.error("Error inserting rutina:", error);
        throw error;
    }
}

export async function getRutina(id: number) {
    try {
        const result = await sql<rutina>`
            SELECT ejercicios
            FROM rutinas
            WHERE id = ${id};
        `;
        return result.rows[0]?? null; // Retorna la rutina o null si no hay resultado
    } catch (error) {
        console.error("Error getting rutina:", error);
        throw error;
    }
}