import React from "react";
import { Dialog } from "@headlessui/react";

interface Props extends React.PropsWithChildren<unknown> {
  isOpen: boolean;
  closeModal: () => void;
  children: Partial<{
    title: JSX.Element;
    content: JSX.Element;
    actions: JSX.Element;
  }>;
}

function Modal({ isOpen, closeModal, children }: Props) {
  return (
    <Dialog
      className="flex overflow-y-auto fixed inset-0 z-10 justify-center items-center mx-3"
      open={isOpen}
      onClose={closeModal}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="p-2 bg-white shadow-xl transform">
        <Dialog.Title className="mb-2 text-lg">{children.title}</Dialog.Title>

        {children.content}

        {children.actions && <div className="float-right mt-2">{children.actions}</div>}
      </div>
    </Dialog>
  );
}

export default Modal;
