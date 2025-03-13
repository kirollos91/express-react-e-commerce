import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Website/NavBar/NavBar";

export default function Website() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
