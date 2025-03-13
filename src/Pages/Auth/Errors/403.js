import { Link } from "react-router-dom";
import "./403.css";

export default function Error403(props) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className="subtitle">
        Oops, You don't have permission to access this page.
        <Link className="d-block text-center btn btn-primary" to={props.path}>
          Go To {props.path === "writer" ? "Writer" : "Home"} Page
        </Link>
      </div>
    </div>
  );
}
