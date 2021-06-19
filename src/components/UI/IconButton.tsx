import { ReactNode } from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

function IconButton({ className, onClick, children }: Props) {
  return (
    <button
      className={
        `duration-150 border-[1px] border-gray-300 p-1 text-black 
        hover:bg-gray-100 
        focus:outline-none focus:border-blue-300 focus:bg-blue-100 ` + className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
