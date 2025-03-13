import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { PRODUCTS_URL } from "../../../../Api/Api";
import TopRated from "./TopRated";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${PRODUCTS_URL}?&page=1&limit=6&orderBy=rating`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const productsShow = products.map((product, index) => (
    <TopRated
      key={index}
      id={product.id}
      title={product.title}
      description={product.description}
      img={
        product.images && (product.images[1]?.image || product.images[0].image)
      }
      price={product.price}
      discount={product.discount}
      rating={product.rating}
    />
  ));

  return (
    <div className="col-md-6 col-12" style={{ border: "2px solid #0D6EFD" }}>
      <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
      <div className="p-5">
        {loading ? (
          <SkeletonShow height="800px" skeletonLength="1" classes="col-12" />
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
