import classNames from "classnames";
import React from "react";

function Input({
  className,
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className={classNames(
        "duration-150 bg-blue-200 bg-opacity-0 border-[1px] px-2 py-1 border-gray-300 focus:outline-none focus:bg-opacity-70 focus:border-blue-300",
        className
      )}
      {...props}
    />
  );
}

export default Input;
