import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";

export default function NavLinks(props) {
  const menu = useContext(Menu).isOpen;
  let user = props.roles.includes(props.userRole?.roles);

  return (
    <>
      {user && (
        <NavLink
          to={props.path}
          className="d-flex align-items-center gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={props.iconName}
            style={{ padding: menu && "10px 13px" }}
          />
          <p className="m-0" style={{ display: menu ? "block" : "none" }}>
            {props.name}
          </p>
        </NavLink>
      )}
    </>
  );
}
