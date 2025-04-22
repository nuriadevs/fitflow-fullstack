// components/LogoutConfirmModal.tsx
import React from 'react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null; // No renderizamos el modal si no está abierto

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-l text-[#545454] font-semibold mb-4 text-center">Are you sure you want to log out?</h3>
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

export default LogoutConfirmModal;
