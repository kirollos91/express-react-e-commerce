import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { PRODUCTS_URL } from "../../../../Api/Api";
import SaleProducts from "./SaleProducts";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${PRODUCTS_URL}?page=1&limit=4&orderBy=updated_at`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product, index) => (
    <SaleProducts
      key={index}
      id={product.id}
      title={product.title}
      description={product.description}
      discount={product.discount}
      price={product.price}
      img={
        product.images && (product.images[1]?.image || product.images[0].image)
      }
      rating={product.rating}
      classes="col-lg-3 col-md-6 col-12"
    />
  ));

  return (
    <Container>
      <h1 className="mt-5">Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
        {loading ? (
          <SkeletonShow
            height="300px"
            skeletonLength="4"
            classes="col-lg-2 col-md-6 col-12 col-lg-3"
          />
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
