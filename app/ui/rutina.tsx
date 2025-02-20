"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { addRutina } from "../lib/data";
import { Rutinas } from "../lib/definitions";

// Función para construir una URL con parámetros (en este caso, el id)
function crearURLConParametros(baseURL: string, id: number) {
  const params = new URLSearchParams();
  // Se agrega el id a los parámetros
  params.set("id", id.toString());
  return `${baseURL}?${params.toString()}`;
}

export default function Rutina() {
  // Se extraen los parámetros de la URL
  const searchParams = useSearchParams();

  // Se construye el objeto formData a partir de los parámetros. Ajusta los nombres según corresponda.
  const formData: Record<string, string> = {
    age: searchParams.get("age") || "",
    weight: searchParams.get("weight") || "",
    height: searchParams.get("height") || "",
    experienceYears: searchParams.get("experienceYears") || "",
    jobType: searchParams.get("jobType") || "",
    bodyPart: searchParams.get("bodyPart") || "",
  };

  const [ejercicios, setEjercicios] = useState<Rutinas>();
  const [loading, setLoading] = useState(true);
  const [url2, setUrl2] = useState<string>("");
  const apiURL =
    "https://magicloops.dev/api/loop/1f9d10fe-c575-4426-a17c-22f29d3ce574/run";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Se realiza la petición usando los datos obtenidos de la URL
        const response = await fetch(apiURL, {
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

        // Se asume que addRutina guarda la rutina y retorna un objeto con el id.
        const { id } = await addRutina(responseJson.ejercicios);
        // Se crea la URL para la rutina con el id obtenido.
        setUrl2(crearURLConParametros("http://localhost:3000/rutina/", id));
      } catch (error) {
        console.error("Error al obtener la rutina:", error);
      } finally {
        setLoading(false);
      }
    };

    // Verificamos que formData tenga algún valor para evitar hacer la petición con datos vacíos.
    if (
      formData.age ||
      formData.weight ||
      formData.height ||
      formData.experienceYears ||
      formData.jobType ||
      formData.bodyPart
    ) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [formData]);

  if (loading)
    return <div className="text-center">Cargando rutina...</div>;

  return (
    <div className="py-10 w-full grid grid-cols-3 gap-4">
      <div className="col-span-2 mx-auto">
        {ejercicios ? (
          ejercicios.ejercicios.map((item) => (
            <div
              key={item.nombre}
              className="p-4 border-2 border-orange-200 bg-white shadow-xl rounded-xl mb-4"
            >
              <h2 className="text-2xl font-bold text-orange-600">
                {item.nombre}
              </h2>
              <p className="pl-4">
                <span className="font-bold">Descripción: </span>
                {item.descripcion}
              </p>
              <p className="pl-4">
                <span className="font-bold">Materiales: </span>
                {item.materiales || "Ninguno"}
              </p>
              {item.peso_estimado && (
                <p className="pl-4">
                  <span className="font-bold">Peso: </span>
                  {item.peso_estimado}
                </p>
              )}
              <p className="pl-4">
                <span className="font-bold">Repeticiones: </span>
                {item.repeticiones}
              </p>
              <p className="pl-4">
                <span className="font-bold">Series: </span>
                {item.series}
              </p>
            </div>
          ))
        ) : (
          <p>No hay ejercicios disponibles.</p>
        )}
      </div>
      <div className="col-span-1">
        <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center border-2 border-orange-200">
          {loading ? "Generando PDF..." : "Descargar PDF"}
          <QRCodeSVG value={url2} size={200} />
          <p className="mt-4 text-sm text-center text-muted-foreground text-gray-600">
            Escanea este código QR para acceder a tu rutina desde cualquier
            dispositivo
          </p>
        </div>
      </div>
    </div>
  );
}
