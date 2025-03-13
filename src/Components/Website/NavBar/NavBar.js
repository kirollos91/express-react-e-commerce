import { Form, Container, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES_URL, CARTS_URL, BASE_URL } from "../../../Api/Api";
import "./NavBar.css";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../Skeleton/SkeletonShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PlusMinusBtn from "../Btns/PlusMinusBtn";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES_URL}?page=1&limit=8&orderBy=id`)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    Axios.get(CARTS_URL)
      .then((response) => {
        setProducts(response.data.carts);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [show]);

  const handleCardDelete = async (card_id) => {
    try {
      await Axios.delete(`${CARTS_URL}/${card_id}`);
    } catch (error) {
      console.error(error);
    }
    setShow((prev) => prev + 1);
  };

  const categoriesShow = categories.map((category, index) => (
    <Link
      to={`/${category.title}`}
      key={index}
      className="m-0 text-nowrap text-black"
      title={category.title}
    >
      {StringSlice(category.title)}
    </Link>
  ));

  const productsShow = products?.map((product, index) => (
    <div className="mb-4 position-relative" key={index}>
      <div
        onClick={() => handleCardDelete(product.id)}
        className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white"
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      >
        <FontAwesomeIcon width="10px" icon={faXmark} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <div
          className="col-md-4 col-12 m-0"
          style={{
            backgroundImage: `url('${BASE_URL}/products/${product.images[0].image}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "75px",
            width: "75px",
          }}
        ></div>
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">
              {(
                product.price -
                product.price * (product.discount / 100)
              ).toFixed(0)}
              $
            </h5>
            <h6
              className="m-0"
              style={{
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {product.discount !== "0" && product.price + "$"}
            </h6>
          </div>
        </div>

        <PlusMinusBtn count={product.count} />
      </div>
    </div>
  ));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productsShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>

      <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <Link className="col-3" to="/">
              <img
                width="200px"
                src={require("../../../Assets/images/Logo.png")}
                alt="Logo"
              />
            </Link>
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="form-control custom-search py-3 rounded-0"
                placeholder="Search product"
              />
              <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 lin-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
                Search
              </h3>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
              <div onClick={handleShow} style={{ cursor: "pointer" }}>
                <img
                  width="30px"
                  src={require("../../../Assets/Icons/Cart.png")}
                  alt="Cart"
                />
              </div>
              <Link to="/profile">
                <img
                  width="35px"
                  src={require("../../../Assets/Icons/Profile.png")}
                  alt="Profile"
                />
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center justify-content-start gap-5">
              {loading ? (
                <SkeletonShow
                  height="30px"
                  skeletonLength="8"
                  width="70px"
                  classes="col-16"
                />
              ) : (
                categoriesShow
              )}
              <Link
                className="text-black category-title text-nowrap"
                to="/categories"
              >
                Show All
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
