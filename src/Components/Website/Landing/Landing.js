import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap hand">
      <Container>
        <div className="col-lg-5 col-md-8 col-12 text-md-start text-center">
          <h1 className="display-2 fw-bold text-white">Shampoo Nice</h1>
          <h5 style={{ color: "#aaa" }} className="fw-normal">
            Another Nice Thing Which is used by someone i don't know (Just
            random text)
          </h5>
          <Link
            to="/shop"
            className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light"
          >
            Shop Now
          </Link>
        </div>
      </Container>
    </div>
  );
}
