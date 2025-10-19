import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 m-4">
        <Outlet />
      </div>
    </div>
  );
}
