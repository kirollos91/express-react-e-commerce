import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { BASE_URL } from "../../../../Api/Api";
import { NavLink } from "react-router-dom";

export default function TopRated({
  id,
  title,
  description,
  discount,
  price,
  img,
  rating,
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
    <NavLink
      to={`/product/${id}`}
      className="col-12 border-bottom d-flex align-items-start flex-wrap mb-2"
    >
      <div
        className="col-md-4 col-12"
        style={{
          backgroundImage: `url('${BASE_URL}/products/${img}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "170px",
        }}
      ></div>

      <div className="m-1 col-md-7 col-12 rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p className="text-truncate" style={{ color: "gray" }}>
            {title}
          </p>
          <p className="text-truncate text-black">{description}</p>
        </div>

        <div className="d-flex align-items-center justify-content-between pt-4">
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
