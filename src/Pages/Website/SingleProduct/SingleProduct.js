import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { PRODUCTS_URL, CARTS_URL } from "../../../Api/Api";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";
import ImageGallery from "react-image-gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    Axios.get(`${PRODUCTS_URL}/${id}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {};
  }, [id]);

  const handleSave = async () => {
    const check = await checkStock();
    if (!check) return;
    window.location.reload();
  };

  const checkStock = async () => {
    try {
      setLoading(true);
      await Axios.post(CARTS_URL, {
        product_id: product.id,
        count: count,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const stars = Math.floor(product.rating > 5 ? 5 : product.rating);
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

  const images = product.images?.map((image) => {
    return {
      original: image.image,
      thumbnail: image.image,
    };
  });

  return (
    <Container>
      <div className="d-flex align-items-start flex-wrap">
        {loading ? (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <SkeletonShow
                height="250px"
                skeletonLength="1"
                classes="col-12"
              />
              <div className="col-12 d-flex mt-1">
                <SkeletonShow
                  height="100px"
                  skeletonLength="3"
                  classes="col-4"
                />
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <SkeletonShow height="20px" skeletonLength="1" classes="col-8" />
              <SkeletonShow
                height="210px"
                skeletonLength="1"
                classes="col-lg-8 col-12 mt-2"
              />
              <hr className="col-lg-8 col-12" />
              <div className="d-flex align-items-center justify-content-between col-lg-8 col-12">
                <SkeletonShow
                  height="20px"
                  skeletonLength="2"
                  classes="col-4 mt-2"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery sizes="height='2000px'" items={images || []} />
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-5">
                <h1>{product.title}</h1>
                <p style={{ color: "gray" }}>{product.about}</p>
                <h3 className="fw-normal">{product.description}</h3>
                <div className="d-flex align-items-center justify-content-between pt-4 border-top">
                  <div>
                    {product.stock === 1 && (
                      <p className="text-danger">There is only 1 left</p>
                    )}
                    {starsShow}
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="m-0 text-primary">
                        {(
                          product.price -
                          product.discount / product.price
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
                        {product.discount !== "0" && product.price}
                      </h6>
                    </div>
                  </div>
                  <div>
                    <PlusMinusBtn setCount={setCount} />
                    <div
                      onClick={handleSave}
                      className="border p-2 rounded"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        alt="cart"
                        src={require("../../../Assets/Icons/Cart.png")}
                        width="20px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
