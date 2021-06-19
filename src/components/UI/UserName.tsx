interface Props {
  userName: string;
}

function UserName(props: Props) {
  return <i>{props.userName}</i>;
}

export default UserName;
