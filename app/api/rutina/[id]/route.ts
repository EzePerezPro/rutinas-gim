import { getRutina } from "@/app/lib/data";
import { Ejercicio } from "@/app/lib/definitions";
import jsPDF from "jspdf";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const ejercicios = await getRutina(parseInt(id[0], 10));
    try {
                    const doc = new jsPDF();
                    doc.setFontSize(10);
    
                    let y = 10; // Posición inicial
                    const maxWidth = 180; // Ancho máximo del texto
    
                    const pageHeight = doc.internal.pageSize.height; // Altura de la página
    
                    ejercicios.ejercicios.forEach((item: Ejercicio, index: number) => {
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
                    const pdf = await doc.output("blob");
                    
                    return new Response(pdf, {
                        status: 200,
                        headers: {
                          "Content-Type": "application/pdf",
                          "Content-Disposition": `attachment; filename="rutina-${id}.pdf"`,
                        },
                      });
                } catch (error) {
                    console.error("Error al descargar la rutina:", error);
                }
            }
            else {
                return new Response("No se encontró la rutina", { status: 404 });
            }
        }