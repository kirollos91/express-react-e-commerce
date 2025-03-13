import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES_URL } from "../../../Api/Api";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";

export default function Categories() {
  document.title = "Categories";
  const [categories, setCategories] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState(0);
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const header = [
    {
      name: "Title",
      key: "title",
      style: { width: "45%" },
    },
    {
      name: "Image",
      key: "image",
      style: {},
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
    Axios.get(`${CATEGORIES_URL}?page=${page}&limit=${limit}&search=${search}`)
      .then((response) => {
        setCategories(response.data.categories);
        setDataLength(response.data.dataLength);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
    setLoading(false);
  }, [deleteCategory, page, limit, search]);

  return (
    <div className="bg-white px-4 px-3 w-100 rounded shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>
      <TableShow
        header={header}
        data={categories}
        setDelete={setDeleteCategory}
        PATH={CATEGORIES_URL}
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
