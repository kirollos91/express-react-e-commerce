import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES_URL } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import StringSlice from "../../../helpers/StringSlice";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(CATEGORIES_URL)
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

  const categoriesShow = categories.map((category, index) => (
    <div
      className="col-lg-2 col-md-4 col-12 bg-transparent border-0 overflow-hidden"
      key={index}
    >
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img
          className="ms-3"
          width="50%"
          height="50px"
          src={category.image}
          alt={category.title}
          loading="lazy"
        />
        <p className="m-0 text-nowrap overflow-hidden" title={category.title}>
          {StringSlice(category.title, 5)}
        </p>
      </div>
    </div>
  ));
  return (
    <>
      <div className="bg-info py-5">
        <Container>
          <div className="d-flex align-items-center justify-content-start flex-wrap row-gap-2">
            {loading ? (
              <SkeletonShow
                height="70px"
                skeletonLength="15"
                baseColor="white"
                highlightColor="gray"
                classes="col-lg-2 col-md-6 col-12"
              />
            ) : (
              categoriesShow
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
