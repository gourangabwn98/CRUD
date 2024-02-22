import React, { useEffect, useState } from "react";
import Empdata from "./Empdata";
import edit from "../assets/edit.png";
import del from "../assets/delete.png";

function Manage() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editableValues, setedit] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setData(Empdata);
  }, []);

  const handleEditClick = (index) => {
    setSelectedItem(index);
    setedit({
      Name: data[index].Name,
      Address: data[index].Address,
      Email: data[index].Email,
      Phone: data[index].Phone,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setedit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    setIsCreating(true);
    setedit({
      Name: "",
      Address: "",
      Email: "",
      Phone: "",
    });
  };

  const handleSave = () => {
    if (isCreating) {
      setData([...data, edit]);
      setIsCreating(false);
    } else {
      const newData = [...data];
      newData[selectedItem] = {
        ...newData[selectedItem],
        Name: edit.Name,
        Address: edit.Address,
        Email: edit.Email,
        Phone: edit.Phone,
      };
      setData(newData);
      setSelectedItem(null);
    }
    setedit({});
  };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedItem(null);
    setedit({});
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    const newData = [...data];
    newData.splice(deleteIndex, 1);
    setData(newData);
    setShowDeleteConfirmation(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteIndex(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleallDelete = () => {
    setData([]);
  };

  const renderRows = () => {
    return data
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((item, index) => {
        const rowIndex = (currentPage - 1) * itemsPerPage + index;
        return (
          <tr
            key={rowIndex}
            style={{
              backgroundColor: rowIndex % 2 === 0 ? "white" : "#f0f5f5",
            }}
          >
            <input
              value="test"
              type="checkbox"
              onChange={console.log("true")}
            />
            <td style={{ padding: "20px", fontSize: 16, color: "black" }}>
              {item.Name}
            </td>
            <td style={{ padding: "20px", fontSize: 16, color: "black" }}>
              {item.Email}
            </td>
            <td style={{ padding: "20px", fontSize: 16, color: "black" }}>
              {item.Address}
            </td>
            <td style={{ padding: "20px", fontSize: 16, color: "black" }}>
              {item.Phone}
            </td>
            <td style={{ padding: "20px", marginLeft: "25px" }}>
              <img
                src={edit}
                alt="edit"
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => handleEditClick(rowIndex)}
              />
              <img
                src={del}
                alt="delete"
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                onClick={() => handleDelete(rowIndex)}
              />
            </td>
          </tr>
        );
      });
  };

  return (
    <div>
      <div style={{ margin: 20, height: "500px" }}>
        <nav style={{ backgroundColor: "lightblue", padding: "10px" }}>
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <li>
              <div
                style={{ fontSize: "31px", fontWeight: "bold", color: "white" }}
              >
                Manage Employees
              </div>
            </li>
            <li>
              <button
                style={{ backgroundColor: "red", fontSize: 15, padding: 4 }}
                onClick={() => handleallDelete()}
              >
                - Delete
              </button>

              <button
                style={{
                  backgroundColor: "green",
                  marginLeft: "10px",
                  fontSize: 15,
                  padding: 4,
                }}
                onClick={handleCreate}
              >
                + Add New Employee
              </button>
            </li>
          </ul>
        </nav>

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr
              style={{
                marginTop: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <div
                style={{
                  marginTop: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              > */}
              <input
                value="test"
                type="checkbox"
                onChange={console.log("true")}
              />
              {/* </div> */}
              <td style={{ padding: "20px", fontSize: 20, fontWeight: "bold" }}>
                Name
              </td>
              <td style={{ padding: "20px", fontSize: 20, fontWeight: "bold" }}>
                Email
              </td>
              <td style={{ padding: "20px", fontSize: 20, fontWeight: "bold" }}>
                Address
              </td>
              <td style={{ padding: "20px", fontSize: 20, fontWeight: "bold" }}>
                Phone
              </td>
              <td
                style={{
                  padding: "20px",
                  marginLeft: "25px",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Action
              </td>
            </tr>
          </thead>

          <tbody>{renderRows()}</tbody>
        </table>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <div>Showing 5 out of {data.length} entries</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 15,
              cursor: "pointer",
            }}
          >
            <div onClick={() => handlePageChange(1)}>1</div>
            <div onClick={() => handlePageChange(2)}>2</div>
            <div onClick={() => handlePageChange(3)}>3</div>
            <div onClick={() => handlePageChange(4)}>4</div>
            <div onClick={() => handlePageChange(5)}>5</div>
            <div
              onClick={() =>
                handlePageChange(
                  Math.min(
                    currentPage + 1,
                    Math.ceil(data.length / itemsPerPage)
                  )
                )
              }
            >
              Next
            </div>
          </div>
        </div>

        {showDeleteConfirmation && (
          <div
            style={{
              position: "absolute",
              height: "25%",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: "bold" }}>
              Delete Employee
            </div>

            <p>Are you sure you want to delete this record?</p>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
            >
              <button
                style={{ backgroundColor: "red" }}
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        )}

        {(selectedItem !== null || isCreating) && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              height: "80%",
              width: "25%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <label>Name : </label>
              <input
                style={{
                  width: "90%",
                  height: 40,
                  marginTop: 5,
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="Enter the name"
                type="text"
                name="Name"
                value={edit.Name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Address : </label>
              <input
                style={{
                  width: "90%",
                  height: 40,
                  marginTop: 5,
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="Enter the Address"
                type="text"
                name="Address"
                value={edit.Address}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Email : </label>
              <input
                style={{
                  width: "90%",
                  height: 40,
                  marginTop: 5,
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="Enter the Email"
                type="text"
                name="Email"
                value={edit.Email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Phone : </label>
              <input
                style={{
                  width: "90%",
                  height: 40,
                  marginTop: 5,
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="Enter the Phone No"
                type="text"
                name="Phone"
                value={editableValues.Phone}
                onChange={handleInputChange}
              />
            </div>

            <div style={{ flex: 1, marginTop: 10, justifyContent: "flex-end" }}>
              <button
                style={{ height: 50, width: 80, backgroundColor: "green" }}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                style={{
                  height: 50,
                  width: 80,
                  backgroundColor: "gray",
                  marginLeft: 5,
                }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Manage;
