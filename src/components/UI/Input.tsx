import { ComponentProps } from "react";

function Input({
  value,
  onChange,
  placeholder,
  type,
  className,
}: ComponentProps<any>) {
  return (
    <input
      className={
        "duration-75 w-full bg-transparent border-1 rounded-xl px-2 border-gray-400 outline-none focus:border-blue-400 focus:bg-blue-50 focus:bg-opacity-30 " +
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
