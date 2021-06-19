import classNames from "classnames";
import React from "react";

interface Props {
  className?: string;
  onClick?: () => void;
}

function IconButton({ className, ...props }: React.PropsWithChildren<Props>) {
  return (
    <button
      className={classNames(
        "duration-150 border-[1px] border-gray-300 p-1 text-black",
        "hover:bg-gray-100",
        "focus:outline-none focus:border-blue-300 focus:bg-blue-100",
        className
      )}
      {...props}
    />
  );
}

export default IconButton;
