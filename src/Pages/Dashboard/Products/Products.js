import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { PRODUCTS_URL } from "../../../Api/Api";
import TableShow from "../../../Components/Dashboard/Table";
import { Link } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [deleteProduct, setProductDelete] = useState(0);
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const header = [
    {
      key: "images",
      name: "Images",
      style: { width: "20%" },
    },
    {
      key: "title",
      name: "Title",
      style: { minWidth: "30%" },
    },
    {
      key: "description",
      name: "Description",
      style: { minWidth: "50%" },
    },
    {
      key: "price",
      name: "Price",
      style: { minWidth: "12%" },
    },
    {
      key: "rating",
      name: "Rating",
      style: { minWidth: "4%" },
    },
    {
      name: "Created",
      key: "created_at",
      style: { minWidth: "50px", maxWidth: "50px" },
    },
    {
      name: "Updated",
      key: "updated_at",
      style: { minWidth: "50px", maxWidth: "50px" },
    },
  ];

  useEffect(() => {
    setLoading(true);
    Axios.get(`${PRODUCTS_URL}?page=${page}&limit=${limit}&search=${search}`)
      .then((response) => {
        setProducts(response.data.products);
        setDataLength(response.data.dataLength);
        // console.log(response.data.products);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
    setLoading(false);
  }, [deleteProduct, page, limit, search]);

  return (
    <div className="bg-white px-4 px-3 w-100 rounded shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link to="../product/add" className="btn btn-primary">
          Add Product
        </Link>
      </div>
      <TableShow
        header={header}
        data={products}
        setDelete={setProductDelete}
        PATH={PRODUCTS_URL}
        page={setPage}
        dataLength={dataLength}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        setSearch={setSearch}
      />
    </div>
  );
}
