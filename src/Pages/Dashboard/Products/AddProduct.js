import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import {
  CATEGORIES_URL,
  PRODUCTS_IMAGE_FIRST_URL,
  PRODUCT_IMAGES_URL,
} from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddProduct() {
  const categoryRef = useRef("");
  const uploadFile = useRef("");
  const ids = useRef([]);
  const progress = useRef([]);
  const nav = useNavigate();
  /* ========================================================================================== */

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [send, setSend] = useState(false);
  const [productID, setProductID] = useState("");
  const [imageDeleted, setImageDeleted] = useState([]);
  /* ========================================================================================== */

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    about: "",
    stock: "",
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });

    if (event.target.name !== "category") return;

    setSend(true);

    if (send) return;

    if (event.target.name === "category") {
      handleSubmitForm(event);
    }
  }

  // Get Product id When category selected change
  async function handleSubmitForm(event) {
    try {
      const response = await Axios.post(PRODUCTS_IMAGE_FIRST_URL, {
        category: event.target.value,
      });

      setProductID(response.data.id);
    } catch (error) {
      console.error(error);
    }
  }

  // Handle Images Change

  async function handleImagesChange(event) {
    setImages((prev) => [...prev, ...event.target.files]);

    if (event.target.files.length === 0) return;

    setSend(false);
    try {
      const formData = new FormData();
      formData.append("product_id", productID);

      Array.from(event.target.files).forEach((image, index) => {
        formData.append("images", image);
      });

      const response = await Axios.post(PRODUCT_IMAGES_URL, formData, {
        onUploadProgress: (progEvent) => {
          const loading = Math.floor(
            (progEvent.loaded * 100) / progEvent.total
          );
          if (loading % 10 === 0) {
            for (let i = 0; i < event.target.files.length; i++) {
              progress.current[images.length + i].style.width = loading + "%";
              progress.current[images.length + i].setAttribute(
                "percent",
                loading + "%"
              );
            }
          }
        },
      });
      setSend(true);

      setImageDeleted((prev) => [...prev, ...response.data.imageID]);
    } catch (error) {
      setSend(true);
      console.error(error);
    }
  }

  // Handle Delete Image
  async function handleDeleteImage(imageName, key) {
    if (!imageName) return;
    const isDeleted = window.confirm("are you want delete it?");
    if (!isDeleted) return;
    try {
      imageDeleted.forEach(async (image) => {
        if (image.imageOrName === imageName) {
          await Axios.delete(`${PRODUCT_IMAGES_URL}/${image.imageNewName}`);
          setImages((prev) => prev.filter((i) => i.name !== image.imageOrName));
          setImageDeleted((prev) =>
            prev.filter((i) => i.imageOrName !== image.imageOrName)
          );
          // ids.current[key].style.display = "none";
          return;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  /* ========================================================================================== */

  useEffect(() => {
    categoryRef.current.focus();
    Axios.get(CATEGORIES_URL)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  /* ========================================================================================== */

  // Mapping
  const categoriesShow = categories.map((category, index) => (
    <option key={index} value={category.id}>
      {category.title}
    </option>
  ));

  const imagesShow = images
    ?.map((image, index) => {
      return (
        <div
          key={index}
          ref={(e) => {
            ids.current[index] = e;
          }}
          className="border p-2 w-100"
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-start gap-2">
              <img
                src={URL.createObjectURL(image)}
                alt={image.name}
                width="120px"
                height="80px"
              />
              <div>
                <p className="mb-1">{image.name}</p>
                <p className="mb-1">
                  {image.size / 1024 >= 1024
                    ? (image.size / (1024 * 1024)).toFixed(2) + "MB"
                    : (image.size / 1024).toFixed(2) + "KB"}
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                handleDeleteImage(image.name, index);
              }}
              variant="danger"
            >
              delete
            </Button>
          </div>
          <div className="custom-progress mt-3">
            <span
              ref={(e) => (progress.current[index] = e)}
              className="inner-progress"
            ></span>
          </div>
        </div>
      );
    })
    .reverse();

  /* ========================================================================================== */

  // get data from form to database
  async function handleEdit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await Axios.post(PRODUCTS_IMAGE_FIRST_URL, {
        ...form,
        productID,
      });

      nav("/dashboard/products");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    setLoading(false);
  }
  /* ========================================================================================== */

  return (
    <>
      {!loading && <Loading /> && (
        <div className="bg-white w-100 mx-2 p-3">
          <Form
            className="bg-white w-100 mx-2 p-3"
            onSubmit={handleEdit}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3" controlId="categories">
              <Form.Label>category</Form.Label>
              <Form.Select
                name="category"
                ref={categoryRef}
                value={form.category}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select Category
                </option>
                {categoriesShow}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                required
                minLength="3"
                placeholder="Title..."
                disabled={!send}
                value={form.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                required
                minLength="3"
                placeholder="Description..."
                disabled={!send}
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                required
                min="0"
                placeholder="Price..."
                disabled={!send}
                value={form.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="discount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                name="discount"
                type="number"
                required
                min="0"
                placeholder="Discount..."
                disabled={!send}
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
                disabled={!send}
                value={form.stock}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="about">
              <Form.Label>About</Form.Label>
              <Form.Control
                name="about"
                type="text"
                required
                minLength="3"
                placeholder="About..."
                disabled={!send}
                value={form.about}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.Control
                ref={uploadFile}
                hidden
                type="file"
                disabled={!send}
                onChange={handleImagesChange}
                multiple
              />
            </Form.Group>

            <Form.Group
              className="d-flex align-items-center justify-content-center gap-2 w-100 flex-column py-3 rounded mb-2"
              controlId="images"
              style={{
                cursor: send ? "pointer" : "default",
                userSelect: "none",
                border: send ? "2px dashed #0086fe" : "2px dashed gray",
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
                style={{ filter: send ? "grayscale(0)" : "grayscale(1)" }}
              />
              <p
                className="fw-bold mb-0"
                style={{ color: send ? "#0086fe" : "gray" }}
              >
                Upload Images
              </p>
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex align-items-start flex-column gap-2"
              controlId="imagesShow"
            >
              {imagesShow}
            </Form.Group>

            <Form.Group className="mb-3" controlId="saveBtn">
              <Button
                disabled={!send || form.title.length < 1}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </>
  );
}
