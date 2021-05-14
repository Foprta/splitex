import { ReactNode } from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

function Button({ className, onClick, children }: Props) {
  return (
    <button
      className={
        "bg-transparent hover:bg-gray-100 border-1 border-gray-400 rounded-xl focus:outline-none focus-within:outline-none p-1 text-black " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
