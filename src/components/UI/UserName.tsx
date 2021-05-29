interface Props {
  userName: string;
}

function UserName(props: Props) {
  return <span>{props.userName}</span>;
}

export default UserName;
