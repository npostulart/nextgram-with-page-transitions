"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import FrozenRouter from "../provider/FrozenRouter";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <motion.div
        ref={overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 grid place-items-center p-6"
        onClick={onClick}
      >
        <motion.div
          ref={wrapper}
          variants={
            {
              closed: {
                opacity: 0,
                "--tw-scale-x": 0.9,
                "--tw-scale-y": 0.9,
                "--tw-translate-y": "100px",
              },
              open: {
                opacity: 1,
                "--tw-scale-x": 1,
                "--tw-scale-y": 1,
                "--tw-translate-y": "0px",
              },
            } as any
          }
          initial="closed"
          animate="open"
          exit="closed"
          className="p-6 bg-white transform w-full max-w-screen-sm"
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </motion.div>
    </>
  );
}
