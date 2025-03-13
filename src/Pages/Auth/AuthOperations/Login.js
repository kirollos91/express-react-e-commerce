import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LOGIN_URL } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form, Button } from "react-bootstrap";

export default function Login() {
  document.title = "Login";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Focus
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  //LOADING
  const [loading, setLoading] = useState(false);

  // ERROR
  const [errorMsg, setErrorMsg] = useState("");

  //COOKIE
  const cookie = Cookie();

  // UseNAVIGATE

  function HandleFormChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      //
      const response = await axios.post(`${LOGIN_URL}`, form);
      if (response.data.success) {
        setLoading(false);
        setErrorMsg("");
        const token = response.data.token;
        const role = response.data.user.roles;

        const go =
          role === "Admin"
            ? "/dashboard/users"
            : role === "Writer"
            ? "/dashboard/writer"
            : "/";
        cookie.set("e-commerce", token);
        window.location.pathname = go;
      }
    } catch (error) {
      console.error(error);
      if (!error.response?.data.success) {
        setErrorMsg(error.response.data.message);
        setLoading(false);
      }
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row h-100vh">
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1 className="mb-4">Login</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={focus}
                  name="email"
                  minLength="5"
                  required
                  type="email"
                  value={form.email}
                  onChange={HandleFormChange}
                  placeholder="Enter Your Email.."
                />
                <Form.Label>Email </Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  name="password"
                  minLength="8"
                  required
                  type="password"
                  value={form.password}
                  onChange={HandleFormChange}
                  placeholder="Enter Your Password.."
                />
                <Form.Label>Password </Form.Label>
              </Form.Group>

              <Form.Group className="form-custom">
                <Button className="btn btn-primary" type="submit">
                  Login
                </Button>
                <div className="google-btn">
                  <a href={`http://localhost:4010/api/auth/google`}>
                    <div className="google-icon-wrapper">
                      <img
                        className="google-icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Google-g-icon.png"
                        alt="sign in with google"
                      />
                    </div>
                    <p className="btn-text">
                      <b>Sign in with google</b>
                    </p>
                  </a>
                </div>
                {errorMsg !== "" && <span className="error">{errorMsg}</span>}
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
