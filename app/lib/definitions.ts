export type Rutinas = {
    ejercicios: [
        {
            nombre: string;
            descripcion: string;
            materiales: string;
            peso_estimado: string;
            repeticiones: string;
            series: string;
        }
    ],
};

export type Ejercicio = {
    nombre: string;
    descripcion: string;
    materiales: string;
    peso_estimado: string;
    repeticiones: string;
    series: string;
};