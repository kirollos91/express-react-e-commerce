import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USERS_URL } from "../../../Api/Api";
import TableShow from "../../../Components/Dashboard/Table";
import { Axios } from "../../../Api/axios";

export default function Users() {
  document.title = "Users";

  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(0);

  const header = [
    { name: "Name", key: "name", style: { width: "35%" } },
    { name: "Email", key: "email", style: { width: "45%" } },
    { name: "Roles", key: "roles", style: { width: "9%" } },
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
    Axios.get(`${USERS_URL}?page=${page}&limit=${limit}&search=${search}`)
      .then((response) => {
        setUsers(response.data.users);
        setDataLength(response.data.dataLength);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
    setLoading(false);
  }, [deleteUser, page, limit, search]);

  return (
    <div className="bg-white px-4 px-3 w-100 rounded shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>
      <TableShow
        header={header}
        data={users}
        setDelete={setDeleteUser}
        PATH={USERS_URL}
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
