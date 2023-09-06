import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";
import { useContext, useRef } from "react";

export default function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}
