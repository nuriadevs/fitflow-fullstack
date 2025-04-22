'use client'

import { useProfile } from '../hooks/useProfile'; // Usamos el hook que ya creaste
import Navbar from '../components/ui/Navbar/Navbar'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ExerciseList from '../components/Exercises/ExerciseList'

export default function ExercisesPage() {
    const { user, exercises, isLoading, logout } = useProfile();
  
    if (isLoading) return <LoadingSpinner />
  
    return (
      <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={logout} />
      <main>
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto mt-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Workouts</h1>

            <ExerciseList exercises={exercises} />
          </div>
        </div>
      </main>
    </div>
    );
}