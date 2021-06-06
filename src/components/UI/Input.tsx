import { ComponentProps } from "react";

function Input({ value, onChange, placeholder, type, className }: ComponentProps<any>) {
  return (
    <input
      className={
        "duration-150 bg-blue-50 w-full border-b-1 border-gray-300 focus:outline-none focus:bg-blue-100 focus:border-blue-300 " +
        className
      }
      placeholder={placeholder}
      type={type || "text"}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
