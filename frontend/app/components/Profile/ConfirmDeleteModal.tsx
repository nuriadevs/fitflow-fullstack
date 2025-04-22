// components/ConfirmDeleteModal.tsx

import React from 'react';

interface DeleteExerciseConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteExerciseConfirmModal: React.FC<DeleteExerciseConfirmModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null; // Si no está abierto, no renderizamos el modal.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-l text-[#545454] font-semibold mb-4 text-center">
        Are you sure you want to delete this exercise?
        </h3>
        <div className="flex justify-around">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-400"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExerciseConfirmModal;
