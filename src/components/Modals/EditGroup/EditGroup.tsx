import Input from "../../UI/Input";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../UI/Button";
import groupsStore from "../../../stores/groups.store";
import Modal from "../../UI/Modal";
import GroupName from "../../UI/GroupName";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditGroup({ isOpen, setIsOpen }: Props) {
  const group = groupsStore.group;
  const [name, setName] = useState(group.name);
  const history = useHistory();

  const editGroup = useCallback(() => groupsStore.editGroup({ name }).then(closeModal).catch(console.error), []);

  const deleteGroup = useCallback(
    () =>
      groupsStore
        .deleteGroup(group.id)
        .then(() => history.push("/"))
        .catch(console.error),
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setName(group.name);
  }, []);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {{
        title: (
          <>
            Группа <GroupName groupName={group.name} />
          </>
        ),
        content: (
          <div className="flex items-center my-2">
            <span>Имя группы:</span>
            <Input
              className="ml-2"
              placeholder="Имя группы"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
        ),
        actions: (
          <>
            <Button className="mr-2" onClick={closeModal}>
              Отмена
            </Button>
            <Button className="mr-2 text-white bg-red-400" onClick={deleteGroup}>
              Удалить
            </Button>
            <Button className="bg-green-400" onClick={editGroup}>
              Сохранить
            </Button>
          </>
        ),
      }}
    </Modal>
  );
}

export default EditGroup;
