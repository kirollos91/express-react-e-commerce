import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import { Outlet } from "react-router-dom";
import "./dashboard.css"; // CSS FILE

export default function Dashboard() {
  return (
    <div className="position-relative">
      <TopBar />
      <div className="dashboard d-flex gap-1" style={{ marginTop: "70px" }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
