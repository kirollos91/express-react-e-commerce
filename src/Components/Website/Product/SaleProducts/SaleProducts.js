import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { BASE_URL } from "../../../../Api/Api";
import "./product.css";
import { NavLink } from "react-router-dom";

export default function Product({
  id,
  title,
  description,
  discount,
  price,
  img = "",
  rating,
  classes,
}) {
  const stars = Math.floor(rating > 5 ? 5 : rating);
  const starsShow = [
    { name: regularStar, color: "" },
    { name: regularStar, color: "" },
    { name: regularStar, color: "" },
    { name: regularStar, color: "" },
    { name: regularStar, color: "" },
  ]
    .fill({ name: solid, color: "gold" }, 0, stars)
    .map((star, index) => (
      <FontAwesomeIcon key={index} icon={star.name} color={star.color} />
    ));

  return (
    <NavLink to={`/product/${id}`} className={classes}>
      <div className="m-1 border rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p className="text-truncate" style={{ color: "gray" }}>
            {title}
          </p>
          <p className="text-truncate text-black">{description}</p>
          <div className="px-5 py-4 position-relative">
            {discount !== "0" && (
              <p
                className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                style={{ width: "50px", height: "50px", lineHeight: "50px" }}
              >
                sale
              </p>
            )}
            <div
              style={{
                backgroundImage: `url('${BASE_URL}/products/${img}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "170px",
                width: "100%",
              }}
              title={title}
              className="img-fluid"
            ></div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-4 border-top">
          <div>
            {starsShow}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">
                {(price - price * (discount / 100)).toFixed(0)}$
              </h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {discount !== "0" && price + "$"}
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img
              src={require("../../../../Assets/Icons/Cart.png")}
              alt="cart"
              width="20px"
            />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
