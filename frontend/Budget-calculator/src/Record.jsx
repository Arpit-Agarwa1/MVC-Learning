import axios from "axios";
import { useState, useEffect } from "react";
import "./Records.css";
import api from "../axios";

export default function Record() {
  const [records, setRecords] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleEdit = (record) => {
    setEditData(record);
  };
  const handleUpdate = async () => {
    try {
      await api.put(`/user/update/${editData._id}`, editData, {
        withCredentials: true,
      });

      setEditData(null);
      fetchRecords(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  async function fetchRecords() {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/user/records", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ THIS IS MISSING
        },
        withCredentials: true,
      });

      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/delete/${id}`, {
        withCredentials: true,
      });

      // refresh data
      setRecords(records.filter((rec) => rec._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h1>Records</h1>
      <p>Here you can view your past records.</p>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>
                  <button onClick={() => handleEdit(record)}>✍🏻</button>
                </td>

                <td>
                  <button onClick={() => handleDelete(record._id)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No records found</td>
            </tr>
          )}
        </tbody>

        {editData && (
          <div>
            <input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <input
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />

            <button onClick={handleUpdate}>Update</button>
          </div>
        )}
      </table>
    </>
  );
}
