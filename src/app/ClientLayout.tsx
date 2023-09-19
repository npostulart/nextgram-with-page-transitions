"use client";

import Modal from "@/components/modal/Modal";
import FrozenRouter from "@/components/provider/FrozenRouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ElementRef, forwardRef, useEffect, useState } from "react";

const Child = forwardRef<
  ElementRef<typeof motion.div>,
  { children: React.ReactNode }
>((props, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <FrozenRouter>{props.children}</FrozenRouter>
    </motion.div>
  );
});

Child.displayName = "Child";

export default function ClientLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments("modal");

  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    const isShown = segments.join("") !== "__DEFAULT__";
    document.body.classList.toggle("overflow-hidden", isShown);
    setModalShown(isShown);
  }, [segments]);

  return (
    <>
      <AnimatePresence mode="popLayout" initial={false}>
        <Child key={segment}>{props.children}</Child>
      </AnimatePresence>
      <AnimatePresence>
        {modalShown && <Modal>{props.modal}</Modal>}
      </AnimatePresence>
    </>
  );
}
