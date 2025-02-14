
import WorkoutForm from "./ui/workout-form"

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl mb-6 text-gray-700">Complete el formulario y obtenga una rutina a corde a sus caracteristicas</h1>
      <WorkoutForm />
    </main>
  )
}