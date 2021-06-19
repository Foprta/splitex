import classNames from "classnames";
import React from "react";

interface Props {
  className: string;
  onClick: () => void;
}

function Button({ className, ...props }: React.PropsWithChildren<Partial<Props>>) {
  return <button className={classNames("rounded-none p-1 border-[1px]", className)} {...props} />;
}

export default Button;
