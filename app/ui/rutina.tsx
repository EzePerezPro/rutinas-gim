"use client";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { addRutina } from "../lib/data";
import { rutina } from "../lib/definitions";


function crearURLConParametros(baseURL: string, data: number) {
    const params = new URLSearchParams();
    // Convertir el JSON a una cadena y agregarla a los parámetros de la URL
    params.set("", JSON.stringify(data));
    return `${baseURL}?${params.toString()}`;
};

export default function Rutina({ formData }: { formData: Record<string, string> }) {
    const [ejercicios, setEjercicios] = useState<rutina>();
    const [loading, setLoading] = useState(true);
    const [url2, setUrl2] = useState<string>("");
    const url = "https://magicloops.dev/api/loop/1f9d10fe-c575-4426-a17c-22f29d3ce574/run";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        AGE: formData.age,
                        WEIGHT: formData.weight,
                        HEIGHT: formData.height,
                        EXPERIENCE_YEARS: formData.experienceYears,
                        ROUTINE_TYPE: formData.jobType,
                        BODY_PART: formData.bodyPart,
                    }),
                });

                const responseJson = await response.json();

                setEjercicios(responseJson.ejercicios);
                const id = await addRutina(responseJson.ejercicios);
                setUrl2(crearURLConParametros("localhost:3000", id.id));

            } catch (error) {
                console.error("Error al obtener la rutina:", error);
            } finally {
                setLoading(false);
            }
        };

        if (Object.keys(formData).length > 0) {
            fetchData();
        }
    }, [formData]);


    if (loading) return <div className="text-center">Cargando rutina...</div>;


    return (
        <div className="py-10 w-full grid grid-cols-3 gap-4">
            <div className="col-span-2 mx-auto">
                {ejercicios !== undefined ? (
                    ejercicios.ejercicios.map((item) => (
                        <div key={item.nombre} className="p-4 border-2 border-orange-200 bg-white shadow-xl rounded-xl mb-4">
                            <h2 className="text-2xl font-bold text-orange-600">{item.nombre}</h2>
                            <p className="pl-4"><a className="font-bold">Descripcion: </a>{item.descripcion}</p>
                            <p className="pl-4"><a className="font-bold">Materiales: </a>{item.materiales || "Ninguno"}</p>
                            {item.peso_estimado ? <p className="pl-4"><a className="font-bold">Peso: </a> {item.peso_estimado}</p> : ""}
                            <p className="pl-4"><a className="font-bold">Repeticiones: </a>{item.repeticiones}</p>
                            <p className="pl-4"><a className="font-bold">Series: </a>{item.series}</p>
                        </div>
                    ))

                ) : (
                    <p>No hay ejercicios disponibles.</p>
                )}
            </div>
            <div className="col-span-1 ">
                <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center  border-2 border-orange-200">
                    {loading ? "Generando PDF..." : "Descargar PDF"}
                    <QRCodeSVG value={url2} size={200} />
                    <p className="mt-4 text-sm text-center text-muted-foreground text-gray-600">
                        Escanea este código QR para acceder a tu rutina desde cualquier dispositivo
                    </p>
                </div>

            </div>
        </div>
    );
}