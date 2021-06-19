import classNames from "classnames";
import React from "react";

interface Props {
  className: string;
  onClick: () => void;
}

function Button({ className, ...props }: React.PropsWithChildren<Partial<Props>>) {
  return <button className={classNames("rounded-none px-2 py-1 uppercase ", className)} {...props} />;
}

export default Button;
