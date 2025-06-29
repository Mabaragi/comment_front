import React from 'react';

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  label: string;
}

export default function AuthButton({
  children,
  label,
  className = '',
  ...rest
}: AuthButtonProps) {
  return (
    <button
      {...rest}
      className={`bg-zinc-200 border border-zinc-400 px-3 py-2 rounded-full hover:bg-zinc-400 transition duration-300 ease-in-out ${className}`}
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  );
}
