"use client";
import { useEffect, useState } from "react";
import Rutina from "../ui/rutina";

export default function MostrarDatos() {
  const [formData, setFormData] = useState<Record<string, string> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    // Marcar que ya se realizó la carga, aunque no haya datos
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Cargando datos...</div>;
  }

  // Si formData no existe, renderiza la segunda parte (contenido alternativo)
  if (!formData) {
    return (
      <div className="p-4">
        <h2>No se encontraron datos guardados</h2>
        <p>Aquí va el contenido alternativo o de segunda parte.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Rutina formData={formData} />
    </div>
  );
}
