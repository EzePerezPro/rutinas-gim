"use client";
import { useEffect, useState } from "react";
import Rutina from "../ui/rutina";

export default function MostrarDatos() {
  const [formData, setFormData] = useState<Record<string, string> | null>(null);  // Inicializa como null

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  if (!formData) {
    return <div>Cargando datos...</div>;  // Muestra un mensaje mientras se carga formData
  }

  return (
    <div className="p-4">
      <Rutina formData={formData} />
    </div>
  );
}
