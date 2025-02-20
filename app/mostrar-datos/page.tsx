import { Suspense } from "react"
import Rutina from "../ui/rutina"

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando datos...</div>}>
      <Rutina />
  </Suspense>
  )
}