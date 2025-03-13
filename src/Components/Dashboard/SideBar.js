import "./bars.css";
import {
  faUsers,
  faPlus,
  faRegistered,
  faLayerGroup,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";

import { Axios } from "../../Api/axios";
import { USERS_CHECK_TOKEN_URL } from "../../Api/Api";
import NavLinks from "./NavLinks";

export default function SideBar() {
  const [user, setUser] = useState({});
  const isOpen = useContext(Menu).isOpen;

  const nav = useNavigate();

  useEffect(() => {
    Axios.get(USERS_CHECK_TOKEN_URL)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => nav("/login", { replace: true }));
  }, []);

  return (
    <>
      {/* {isOpen && <div className="close-screen"></div>} */}
      <div
        className="side-bar pt-3"
        style={{
          left: !isOpen && "-100%",
          width: !isOpen && "63px",
        }}
      >
        <NavLinks
          userRole={user}
          roles={["Admin"]}
          path="users"
          iconName={faUsers}
          name="Users"
        />

        <NavLinks
          userRole={user}
          roles={["Admin"]}
          path="user/add"
          iconName={faPlus}
          name="Add User"
        />

        <NavLinks
          userRole={user}
          roles={["Admin", "Product_Manger"]}
          path="categories"
          iconName={faLayerGroup}
          name="Categories"
        />

        <NavLinks
          userRole={user}
          roles={["Admin", "Product_Manger"]}
          path="category/add"
          iconName={faPlus}
          name="Add Category"
        />

        <NavLinks
          userRole={user}
          roles={["Admin", "Writer"]}
          path="products"
          iconName={faTruckFast}
          name="Products"
        />

        <NavLinks
          userRole={user}
          roles={["Admin", "Writer"]}
          path="product/add"
          iconName={faPlus}
          name="Add Product"
        />

        <NavLinks
          userRole={user}
          roles={["Admin", "Writer"]}
          path="writer"
          iconName={faRegistered}
          name="Writer"
        />
      </div>
    </>
  );
}
