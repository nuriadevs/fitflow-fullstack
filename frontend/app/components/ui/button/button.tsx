'use client';


interface ButtonProps {
    onClick: () => void;
    text: string;
    className?: string;
}


/**
 * Botón reutilizable.
 * @param param0
 * @returns
 */
const Button: React.FC<ButtonProps> = ({ onClick, text, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`button ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
