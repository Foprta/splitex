interface Props {
  groupName: string;
}

function GroupName(props: Props) {
  return <span className="font-bold">{props.groupName}</span>;
}

export default GroupName;
