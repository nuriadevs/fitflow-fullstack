'use client';

import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useExerciseActions } from '../hooks/useExerciseActions';
import Navbar from '../components/ui/Navbar/Navbar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import UserProfile from '../components/Profile/UserProfile';
import ExerciseList from '../components/Profile/ExerciseList';
import DeleteExerciseConfirmModal from '../components/Profile/ConfirmDeleteModal';

export default function ProfilePage() {
 const { user, exercises, setExercises, isLoading, logout } = useProfile();
 const { deleteExercise, loading } = useExerciseActions();

 const [modalOpen, setModalOpen] = useState(false);
 const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

 if (isLoading) {
  return <LoadingSpinner />;
 }

 // Mostrar el modal de confirmación cuando se hace clic en "Eliminar"
 const handleDeleteClick = (exerciseId: string) => {
  setSelectedExerciseId(exerciseId);
  setModalOpen(true);
 };

 // Eliminar el ejercicio y cerrar el modal
 const handleConfirmDelete = async () => {
  if (!selectedExerciseId) return;

  // Llamar al método deleteExercise y pasar un callback para cerrar el modal
  await deleteExercise(selectedExerciseId, () => {
   // Actualizar la lista de ejercicios sin hacer refetch
   setExercises((prev) => prev.filter((ex) => ex._id !== selectedExerciseId));
   setModalOpen(false); // Cerrar el modal después de eliminar
  });
 };

 return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    {/* Contenedor principal con sombra */}
    <div className="bg-white rounded-lg shadow-lg p-6 my-6">
      {/* Navbar */}
      <Navbar user={user} onLogout={logout} />

      {/* Información del perfil */}
      <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-900">My Profile</h2>
        {user && (
          <div className="mt-4">
            
            <p className="text-lg text-gray-900">
              <strong>Username: </strong>{user.username}
            </p>
            <p className="text-lg text-gray-900">
              <strong>Email: </strong>{user.email}
            </p>
          </div>
        )}
      </div>
    
      {/* Lista de ejercicios */}
      <div className="mt-6">
      <hr/>
        {exercises.length > 0 ? (
          <ExerciseList exercises={exercises} loading={loading} onDelete={handleDeleteClick} />
        ) : (
          <p className="text-gray-500">You don't have any saved exercises yet.</p>
        )}
      </div>
    </div>

    {/* Modal de confirmación de eliminación */}
    <DeleteExerciseConfirmModal
      isOpen={modalOpen}
      onCancel={() => setModalOpen(false)}
      onConfirm={handleConfirmDelete}
    />
  </div>
 );
}
