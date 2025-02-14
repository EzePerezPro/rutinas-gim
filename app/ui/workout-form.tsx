"use client"

import { useState } from "react"


export default function WorkoutForm() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    experienceYears: "",
    jobType: "",
    bodyPart: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectJobChange2 = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      jobType: prev.jobType === value ? "" : value, // Si ya está seleccionado, lo deselecciona
    }));
  };

  const handleSelectBodyChange2 = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      bodyPart: prev.bodyPart === value ? "" : value, // Si ya está seleccionado, lo deselecciona
    }));
  };


 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const queryParams = new URLSearchParams(formData).toString();
  window.location.href = `/mostrar-datos?${queryParams}`;
};


  return (
    <div className="w-full pt-4 border border-orange-200 rounded-lg border-2 p-4 bg-white">

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2 grid grid-cols-1">
            <label htmlFor="age" >Edad</label>
            <input
              className="w-full border border-orange-300 rounded-md p-2"
              id="age"
              name="age"
              type="number"
              placeholder="Ingresa tu edad"
              onChange={handleChange}
              value={formData.age}
              required
            />
          </div>
          <div className="space-y-2 grid grid-cols-1">
            <label htmlFor="weight" >Peso (kg)</label>
            <input
              className="w-full border border-orange-300 rounded-md p-2"
              id="weight"
              name="weight"
              type="number"
              placeholder="Ingresa tu peso"
              onChange={handleChange}
              value={formData.weight}
              step="1"
              min='0'
              required
            />
          </div>
          <div className="space-y-2 grid grid-cols-1">
            <label htmlFor="height" >Altura (cm)</label>
            <input
              className="w-full border border-orange-300 rounded-md p-2"
              id="height"
              name="height"
              type="number"
              placeholder="Ingresa tu altura"
              onChange={handleChange}
              value={formData.height}
              step="1"
              min='0'
              required
            />
          </div>
          <div className="space-y-2 grid grid-cols-1">
            <label htmlFor="experienceYears">Años de experiencia</label>
            <input
              className="w-full border border-orange-300 rounded-md p-2"
              id="experienceYears"
              name="experienceYears"
              type="number"
              placeholder="Años de experiencia en gimnasio"
              onChange={handleChange}
              value={formData.experienceYears}
              required
            />
          </div>
          
          <div className="space-y-2 grid grid-cols-1">
            <div>
              <label htmlFor="bodyPart" >Selecciona un estilo de trabajo</label>
              <a className="text-xs text-gray-500 pl-2">(no obligatorio)</a>
            </div>
            <div className="not-prose overflow-auto rounded-lg outline outline-white/5 pt-2">
              <div className="relative">
                <div className="flex relative overflow-x-auto snap-x snap-mandatory rounded-lg">
                  {["Musculación", "Fuerza máxima", "Resistencia muscular", "Potencia", "Funcional", "Cardio"].map((part) => (
                    <button
                      type="button"
                      key={part}
                      className={` rounded-xl shrink-0 snap-start w-full h-96 flex items-center justify-center font-semibold transition-all 
                        ${formData.jobType === part ? "bg-orange-500 text-white border-orange-600" : "bg-gray-200 text-gray-700 border-transparent"}
                        border-2 active:scale-95 
                      `}
                      onClick={() => handleSelectJobChange2(part)}
                    >
                      <p className="text-2xl">{part}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 grid grid-cols-1">
            <div>
              <label htmlFor="bodyPart" >Parte del cuerpo a trabajar</label>
              <a className="text-xs text-gray-500 pl-2">(no obligatorio)</a>
            </div>
            <div className="not-prose overflow-auto rounded-lg outline outline-white/5 pt-2">
              <div className="relative">
                <div className="flex relative overflow-x-auto snap-x snap-mandatory rounded-lg">
                  {["Pecho", "Espalda", "Brazos", "Piernas", "Mixto"].map((part) => (
                    <button
                      type="button"
                      key={part}
                      className={` rounded-xl shrink-0 snap-start w-full h-96 flex items-center justify-center font-semibold transition-all 
                        ${formData.bodyPart === part ? "bg-orange-500 text-white border-orange-600" : "bg-gray-200 text-gray-700 border-transparent"}
                        border-2 active:scale-95 
                      `}
                      onClick={() => handleSelectBodyChange2(part)}
                    >
                      <p className="text-2xl">{part}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className=" w-full hover:bg-orange-500">
            Crear Rutina
          </button>
        </div>
      </form >
    </div >
  )
}

