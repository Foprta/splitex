import { ComponentProps } from "react";
import classNames from "classnames";

function Input({ value, onChange, placeholder, type, className }: ComponentProps<any>) {
  return (
    <input
      className={classNames(
        "duration-150 bg-blue-200 bg-opacity-0 w-full border-[1px] px-2 py-1 border-gray-300 focus:outline-none focus:bg-opacity-70 focus:border-blue-300",
        className
      )}
      placeholder={placeholder}
      type={type || "text"}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
