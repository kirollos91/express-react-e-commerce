import { useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { USERS_URL } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";

export default function User() {
  const id = window.location.pathname.split("/").at(-1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    roles: "",
  });

  const cookie = Cookie();

  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  function changeHandle(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USERS_URL}/${id}`)
      .then((response) => {
        const { name, email, roles } = response.data.user;
        setForm({ name, email, roles });
        setDisable(false);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        window.location.pathname = "404";
      });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (disable) return;
    setLoading(true);
    try {
      const response = await Axios.put(`${USERS_URL}/${id}`, form);
      cookie.set("e-commerce", response.data.token);
      window.location.pathname = "/dashboard/users";
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white w-100 mx-2">
          <h4 className="m-2">Update {form.name}</h4>
          <Form className="w-100 mx-2 p-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>User Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                name="name"
                required
                value={form.name}
                onChange={changeHandle}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                required
                value={form.email}
                onChange={changeHandle}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Roles </Form.Label>
              <Form.Select
                name="roles"
                value={form.roles}
                onChange={changeHandle}
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
            <Form.Group className="mb-3" controlId="btn.update">
              <Button disabled={disable} type="submit">
                Save
              </Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </>
  );
}
