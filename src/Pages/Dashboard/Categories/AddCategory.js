import { Axios } from "../../../Api/axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { CATEGORIES_URL } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
  document.title = "Add Category";
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const formData = new FormData();

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // focus
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      formData.append("title", title);
      formData.append("image", image);
      const response = await Axios.post(CATEGORIES_URL, formData);

      console.log(response);
      nav("/dashboard/categories", { replace: true });
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
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={focus}
              type="text"
              name="title"
              placeholder="Title..."
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="saveBtn">
            <Button
              disabled={title.length < 1}
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
