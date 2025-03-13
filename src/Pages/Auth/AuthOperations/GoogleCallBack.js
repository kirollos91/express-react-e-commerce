import { useEffect } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { GOOGLE_CALLBACK } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function GoogleCallBack() {
  const cookie = Cookie();

  const nav = useNavigate();

  useEffect(() => {
    const code = window.location.href.split("code=")[1];
    axios
      .get(`${GOOGLE_CALLBACK}?code=${code}`)
      .then((response) => {
        cookie.set("e-commerce", response.data.token);
        nav("/");
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }}>
      <Loading />
    </div>
  );
}
