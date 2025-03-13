import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { REGISTER_URL } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
  document.title = "Register";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmed: "",
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

  // COOKIE
  const cookie = Cookie();

  // UseNavigate
  const nav = useNavigate();

  function handleFormChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${REGISTER_URL}`, form);
      if (response.data.success) {
        setLoading(false);
        setErrorMsg("");
        const token = response.data.token;
        cookie.set("e-commerce", token);
        nav("/");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setLoading(false);
        setErrorMsg(error.response.data.message);
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
              <h1 className="mb-4">Register Now</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={focus}
                  name="name"
                  type="text"
                  placeholder="Enter Your Name.."
                  required
                  minLength="3"
                  value={form.name}
                  onChange={handleFormChange}
                />
                <Form.Label>Name </Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter Your Email.."
                  required
                  minLength="5"
                  value={form.email}
                  onChange={handleFormChange}
                />
                <Form.Label>Email </Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Your Password.."
                  required
                  minLength="8"
                  value={form.password}
                  onChange={handleFormChange}
                />
                <Form.Label>Password </Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Control
                  name="password_confirmed"
                  type="password"
                  placeholder="Enter Confirm Password.."
                  required
                  minLength="8"
                  value={form.confirmPassword}
                  onChange={handleFormChange}
                />
                <Form.Label>Confirm Password</Form.Label>
              </Form.Group>
              <Form.Group className="form-custom">
                <Button className="btn btn-primary" type="submit">
                  Register
                </Button>
                {errorMsg !== "" && <span className="error">{errorMsg}</span>}
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
