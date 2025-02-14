"use client";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { addRutina } from "../lib/data";


function crearURLConParametros(baseURL: string, data: any) {
    const params = new URLSearchParams();
    const ejerciciosReducidos = data.map((item: any) => ({
        n: item.nombre,
        r: item.repeticiones,
        s: item.series
    }));
    // Convertir el JSON a una cadena y agregarla a los parámetros de la URL
    params.set("", JSON.stringify(ejerciciosReducidos));
    return `${baseURL}?${params.toString()}`;
};

export default function Rutina({ formData }: { formData: Record<string, string> }) {
    const [ejercicios, setEjercicios] = useState<any[]>([]);
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
                setUrl2(crearURLConParametros("localhost:3000", id));

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

    const handleClick = async () => {
        try {
            //crear y descargar un pdf
            const doc = new jsPDF();
            doc.setFontSize(10);

            let y = 10; // Posición inicial
            const maxWidth = 180; // Ancho máximo del texto

            const pageHeight = doc.internal.pageSize.height; // Altura de la página

            ejercicios.forEach((item, index) => {
                // Si se llega al final de la página, añadir una nueva
                if (y + 45 > pageHeight) {
                    doc.addPage();
                    y = 10; // Reiniciar la posición Y al inicio de la nueva página
                }

                doc.setFontSize(12).text(`Ejercicio ${index + 1}`, 8, y);
                doc.setFontSize(10).text(`Nombre: ${item.nombre}`, 10, y + 5);

                // Ajustar descripción dentro del margen
                const descriptionLines = doc.splitTextToSize(`Descripción: ${item.descripcion}`, maxWidth);
                doc.text(descriptionLines, 10, y + 10);;

                doc.text(`Materiales: ${item.materiales || "Ninguno"}`, 10, y + 20);

                doc.text(`Peso: ${item.peso_estimado || "Ninguno"}`, 10, y + 25);

                doc.text(`Repeticiones: ${item.repeticiones}`, 10, y + 30);

                doc.text(`Series: ${item.series}`, 10, y + 35);

                const lineY = y + 38; // Posición donde dibujar la línea
                doc.line(10, lineY, 200, lineY); // Dibuja una línea horizontal de izquierda a derecha

                y += 45; // Ajustar espacio para el siguiente ejercicio
            });
            doc.save("output.pdf");

        } catch (error) {
            console.error("Error al descargar la rutina:", error);
        }
    }

    if (loading) return <div className="text-center">Cargando rutina...</div>;


    return (
        <div className="py-10 w-full grid grid-cols-3 gap-4">
            <div className="col-span-2 mx-auto">
                {ejercicios.length > 0 ? (
                    ejercicios.map((item) => (
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