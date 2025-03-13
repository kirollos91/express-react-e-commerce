import { Form, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Axios } from "../../../Api/axios";
import {
  CATEGORIES_URL,
  PRODUCT_IMAGES_URL,
  PRODUCTS_URL,
} from "../../../Api/Api";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams();

  const uploadFile = useRef("");

  const [categories, setCategories] = useState([]);
  const [imageChange, setImageChange] = useState(0);

  const [form, setForm] = useState({
    category_id: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    about: "",
    stock: "",
    images: [],
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    Axios.get(CATEGORIES_URL)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    Axios.get(`${PRODUCTS_URL}/${id}`)
      .then((response) => {
        setForm(response.data.product);
      })
      .catch((error) => console.error(error));
  }, [id, imageChange]);

  // MAPPING
  const categoryShow = categories.map((category, index) => (
    <option key={index} value={category.id}>
      {category.title}
    </option>
  ));

  const imagesShow = form.images
    .map((image, index) => (
      <div key={index} className="border p-2 col-2 position-relative">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img src={image.image} alt={image.image} width="100%" height="80px" />
          <div
            style={{ cursor: "pointer" }}
            className="position-absolute top-0 end-0 bg-danger rounded text-white"
          >
            <p
              className="py-1 px-2 m-0 "
              onClick={() => {
                handleDeleteImage(image.id);
              }}
            >
              X
            </p>
          </div>
        </div>
      </div>
    ))
    .reverse();

  /* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await Axios.put(`${PRODUCTS_URL}/${id}`, form);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleImagesChange(event) {
    try {
      const formData = new FormData();
      formData.append("product_id", id);
      Array.from(event.target.files).forEach((image) => {
        formData.append("images", image);
      });

      await Axios.post(PRODUCT_IMAGES_URL, formData);
      setImageChange((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteImage(imageID) {
    if (!id) return;
    const isDeleted = window.confirm("are you sure to delete this?");
    if (!isDeleted) return;
    try {
      await Axios.delete(`${PRODUCT_IMAGES_URL}/${imageID}`);
      setImageChange((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-100 p-3 mx-2">
      <Form className="w-100 p-3 mx-2" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="title"
            value={form.category_id}
            onChange={handleChange}
          >
            <option disabled value="">
              Select Category
            </option>
            {categoryShow}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Title..."
            value={form.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Description..."
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Price..."
            value={form.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            name="discount"
            placeholder="Discount..."
            value={form.discount}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            name="stock"
            type="number"
            required
            min="0"
            placeholder="Stock..."
            value={form.stock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control
            type="text"
            name="about"
            placeholder="About..."
            value={form.about}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Upload</Form.Label>
          <Form.Control
            ref={uploadFile}
            hidden
            type="file"
            onChange={handleImagesChange}
            multiple
          />
        </Form.Group>

        <Form.Group
          className="d-flex align-items-center justify-content-center gap-2 w-100 flex-column py-3 rounded mb-2"
          controlId="images"
          style={{
            cursor: "pointer",
            userSelect: "none",
            border: "2px dashed #0086fe",
          }}
          onClick={() => {
            uploadFile.current.click();
          }}
        >
          <img
            src={require("../../../Assets/images/upload.png")}
            alt="upload Here"
            width="100px"
            height="100px"
          />
          <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>
            Upload Images
          </p>
        </Form.Group>

        <Form.Group controlId="images">
          <Form.Label>Images</Form.Label>
          <div className="mb-3 d-flex align-items-start gap-2">
            {imagesShow}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="saveButton">
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
