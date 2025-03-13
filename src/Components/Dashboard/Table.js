import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { BASE_URL } from "../../Api/Api";
import PaginatedItems from "../Dashboard/Pagination/Pagination";
import { useRef } from "react";
import transformDate from "../../helpers/transformDate";

export default function TableShow(props) {
  const searchData = useRef("");

  function handleSearch(e) {
    if (e.key !== "Enter" && e.type !== "click") return;
    props.setSearch(searchData.current.value);
    props.page(1);
  }

  const headerShow = props.header.map((hd, index) => {
    return (
      <th className="f-cairo text-white" key={index} style={hd.style}>
        {hd.name}
      </th>
    );
  });

  const body = props.data.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      {props.header.map((key, index2) => {
        if (item?.is_active && key.key === "name")
          return <td key={index2}>{item[key.key] + " (YOU)"}</td>;
        else if (key.key === "image")
          return (
            <td className="category-image-td" key={index2}>
              <div
                className="category-image"
                style={{ backgroundImage: `url(${item[key.key]})` }}
              ></div>
            </td>
          );
        else if (key.key === "images")
          return (
            <td key={index2}>
              <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
                {item.images?.map((img, index) => (
                  <img
                    key={index}
                    width="30px"
                    height="20px"
                    src={`${BASE_URL}/products/${img.image}`}
                    alt=""
                  />
                ))}
              </div>
            </td>
          );
        else if (key.key === "created_at" || key.key === "updated_at")
          return (
            <td style={{ fontSize: "13px", textWrap: "nowrap" }} key={index2}>
              {transformDate(item[key.key])}
            </td>
          );
        return <td key={index2}>{item[key.key]}</td>;
      })}
      <td>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              cursor="pointer"
              fontSize="19px"
              icon={faPenToSquare}
            />
          </Link>

          {!item.is_active && (
            <FontAwesomeIcon
              onClick={() => {
                handleDeleted(item.id);
              }}
              color="red"
              cursor="pointer"
              fontSize="19px"
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  async function handleDeleted(id) {
    if (!id) return;
    const checkDelete = window.confirm("Are you sure you want delete it?");
    if (!checkDelete) return;

    try {
      await Axios.delete(`${props.PATH}/${id}`);
      props.setDelete((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="col-4 d-flex mb-3 gap-3 align-items-center">
        <Form.Control
          ref={searchData}
          type="search"
          placeholder="search..."
          aria-label="searching"
          className="my-2"
          // onChange={(e) => {}}
          onKeyDown={handleSearch}
        />
        <Button style={{ height: "40px" }} onClick={handleSearch}>
          search
        </Button>
      </div>
      <Table
        striped
        className="table-shadow rounded overflow-hidden text-white"
        hover
      >
        <thead className="px-2">
          <tr>
            <th className="f-cairo text-white" style={{ width: "4%" }}>
              #
            </th>
            {headerShow}
            <th className="f-cairo text-white" style={{ width: "7%" }}>
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {props.loading ? (
            <tr className="text-center">
              <td colSpan="12">Loading...</td>
            </tr>
          ) : (
            body
          )}
        </tbody>
      </Table>

      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            aria-label="limit"
            value={props.limit}
            onChange={(e) => {
              props.setLimit(e.target.value);
              props.page(1);
            }}
          >
            <option disabled>Select Limit</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          itemsPerPage={props.limit}
          dataLength={props.dataLength}
          page={props.page}
        />
      </div>
    </>
  );
}
