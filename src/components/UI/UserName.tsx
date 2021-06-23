import React from "react";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  userName: string;
}

function UserName({ userName, ...props }: Props) {
  return <i {...props}>{userName}</i>;
}

export default UserName;
