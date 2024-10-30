import { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Chats from "./routes/chats";
import Pinned from "./routes/pinned";
import Revisions from "./routes/revisions";
import Studies from "./routes/studies";

export default function Router(props: { children?: ReactNode }) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/studies">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/studies"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

export function CurrentRoute() {
  return (
    <Routes>
      <Route path="/studies" element={<Studies />} />
      <Route path="/revisions" element={<Revisions />} />
      <Route path="/pinned" element={<Pinned />} />
      <Route path="/chats" element={<Chats />} />
    </Routes>
  );
}
