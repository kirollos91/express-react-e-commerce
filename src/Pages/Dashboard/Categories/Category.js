import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES_URL } from "../../../Api/Api";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Category() {
  // const id = window.location.pathname.split("/").at(-1);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    Axios.get(`${CATEGORIES_URL}/${id}`)
      .then((response) => {
        const { title: t, image: i } = response.data.category;
        setTitle(t);
        setImage(i);
      })
      .catch((error) => {
        nav("/404", { replace: true });
        console.error(error);
      });
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("title", title);
    form.append("image", newImage);

    try {
      const response = await Axios.put(`${CATEGORIES_URL}/${id}`, form);

      console.log(response);
      nav("/dashboard/categories", { replace: true });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <>
      {!loading && <Loading /> && (
        <div className="container">
          <div className="row">
            <div className="text-center">
              <img alt={title} src={image} width="300px" />
            </div>
            <Form className="w-100 p-3 mx-2" onSubmit={handleSubmit}>
              <Form.Group controlId="title" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      const fr = new FileReader();
                      fr.onload = (event) => {
                        setImage(event.target.result);
                      };
                      fr.readAsDataURL(e.target.files.item(0));
                      setNewImage(e.target.files.item(0));
                    }
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={title.length < 1}
                >
                  Save
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
