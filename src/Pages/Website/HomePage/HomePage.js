import "./Home.css";

import Landing from "../../../Components/Website/Landing/Landing";
import LatestSaleProduct from "../../../Components/Website/Product/SaleProducts/ShowLatestSaleProduct";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import { Container } from "react-bootstrap";
import ShowLatestProducts from "../../../Components/Website/Product/LatestProducts/ShowLatestProducts";

export default function HomePage() {
  return (
    <div>
      <Landing />
      <LatestSaleProduct />
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
    </div>
  );
}
