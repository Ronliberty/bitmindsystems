import { useState } from "react";

export type ModalType = "create-task" | "create-category" | null;

export function useModalState() {
  const [modal, setModal] = useState<ModalType>(null);
  const open  = (m: ModalType) => setModal(m);
  const close = () => setModal(null);
  return { modal, open, close };
}