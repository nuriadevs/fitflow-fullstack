'use client';

import './button.css';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string; // Clases adicionales para personalizar el estilo
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`} // Asegúrate de que esta clase 'button' esté aquí
    >
      {text}
    </button>
  );
};

export default Button;
