import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/axios";
import { USERS_CHECK_TOKEN_URL, LOGOUT_URL } from "../../Api/Api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal";

import Loading from "../Loading/Loading";

export default function TopBar() {
  const menu = useContext(Menu);
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(false);

  const cookie = Cookie();

  useEffect(() => {
    Axios.get(USERS_CHECK_TOKEN_URL)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function handleLogout() {
    try {
      setLoading(true);
      await Axios.get(LOGOUT_URL);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="top-bar">
        <div className="d-flex align-items-center justify-content-between h-100">
          <div className="d-flex align-items-center gap-5">
            <h3>E-commerce</h3>
            <FontAwesomeIcon
              onClick={() => {
                menu.setIsOpen((prev) => !prev);
              }}
              cursor={"pointer"}
              icon={faBars}
            />
          </div>
          <div>
            <DropdownButton id="" title={user.name}>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </>
  );
}
