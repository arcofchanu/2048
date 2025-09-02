import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  large?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, large = false, ...props }) => {
  const sizeClasses = large ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm';
  
  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClasses}
        bg-neutral-800 text-neutral-200 rounded-md
        transition-all duration-150 ease-in-out
        hover:bg-neutral-700 hover:scale-105
        active:bg-neutral-600 active:scale-100
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-neutral-400
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;