import { Axios } from "../../../Api/axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { USERS_URL } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddUser() {
  document.title = "Add User";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmed: "",
    roles: "",
  });

  // focus
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await Axios.post(USERS_URL, form);

      console.log(response);
      nav("/dashboard/users", { replace: true });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="bg-white w-100 mx-2">
        <h4 className="m-2">Create New User</h4>
        <Form className="w-100 mx-2 p-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={focus}
              type="text"
              name="name"
              placeholder="Name..."
              required
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email..."
              required
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password..."
              required
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rePassword">
            <Form.Label>Password Confirmed</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmed"
              placeholder="Repeat Password..."
              required
              value={form.password_confirmed}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Roles">
            <Form.Label>Roles</Form.Label>
            <Form.Select
              name="roles"
              value={form.roles}
              onChange={handleChange}
            >
              <optgroup label="Roles">
                <option value="" disabled>
                  Select User Role
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Writer">Writer</option>
                <option value="Product_Manger">Product Manger</option>
              </optgroup>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="saveBtn">
            <Button
              disabled={
                form.name.length < 1 ||
                form.email.length < 1 ||
                form.password.length < 8 ||
                form.password_confirmed.length < 8 ||
                form.password !== form.password_confirmed ||
                form.roles === ""
              }
              type="submit"
              className="btn btn-primary"
            >
              Save
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
