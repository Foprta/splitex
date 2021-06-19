import React from "react";
import { Link } from "react-router-dom";
import Input from "./UI/Input";
import IconButton from "./UI/IconButton";
import { UserGroupIcon } from "@heroicons/react/solid";
import { GroupsStore } from "../stores/groups.store";
import { inject, observer } from "mobx-react";
import GroupName from "./UI/GroupName";

interface Props {
  groupsStore?: GroupsStore;
}

interface State {
  name: string;
}

@inject("groupsStore")
@observer
class Landing extends React.Component<Props, State> {
  groupsUnsub: () => void;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    this.groupsUnsub = this.props.groupsStore.groupsSub();
  }

  componentWillUnmount() {
    this.groupsUnsub();
  }

  addGroup = () =>
    this.props.groupsStore
      .addGroup(this.state.name)
      .then(() => this.setState({ name: "" }))
      .catch(console.error);

  render() {
    const { groups } = this.props.groupsStore;

    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col divide-y-[1px] divide-gray-300">
          {groups.map(({ id, name }: any) => (
            <div className="py-1.5 first:pt-0">
              <Link className="clickable" key={id} to={id}>
                <GroupName groupName={name} />
              </Link>
            </div>
          ))}
        </div>

        <div className="flex mt-3">
          <Input
            placeholder="Добавьте группу"
            value={this.state.name}
            min={3}
            onChange={(e: any) => this.setState({ name: e.currentTarget.value })}
          />
          <IconButton className="ml-2 text-green-500" onClick={this.addGroup}>
            <UserGroupIcon className="w-6 h-6" />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default Landing;
