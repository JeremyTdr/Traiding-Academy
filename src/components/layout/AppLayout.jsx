import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          background: "var(--bg)",
          padding: "32px 40px",
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
