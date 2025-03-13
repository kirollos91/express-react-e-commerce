import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { USERS_CHECK_TOKEN_URL } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Error403 from "../Errors/404";

export default function RequireAuth({ allowedRole }) {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  const nav = useNavigate();

  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(USERS_CHECK_TOKEN_URL)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => nav("/login", { replace: true }));
  }, []);

  return (
    <>
      {token ? (
        user !== "" ? (
          !allowedRole.includes(user.roles) ? (
            <Error403 path={user.roles === "Writer" ? "writer" : "/"} />
          ) : (
            <Outlet />
          )
        ) : (
          <Loading />
        )
      ) : (
        <Navigate to="/login" replace="true" />
      )}
    </>
  );
}
