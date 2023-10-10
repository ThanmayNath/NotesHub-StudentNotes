import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const AdminPage = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/admin");
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNotes();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/profile/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8800/admin/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="adminH1">AdminPage</h1>
      <div className="display1">
        {notes.map((note) => (
          <div className="notes1">
            <div className="card1" key={note.id}>
              <h2>{note.title}</h2>
              <div className="allowButton">
                <a
                  className="pdfview"
                  href={`http://localhost:8800/${note.file_id}`}
                  download
                >
                  <PictureAsPdfIcon style={{ fontSize: "35px" }} />
                </a>
                <a className="done" onClick={() => handleUpdate(note.id)}>
                  <DoneIcon
                    style={{
                      fontSize: "40px",
                      fontWeight: "bolder",

                      cursor: "pointer",
                    }}
                  />{" "}
                </a>
                <a className="cancel" onClick={() => handleDelete(note.id)}>
                  <ClearIcon
                    style={{
                      fontSize: "40px",
                      fontWeight: "bolder",
                      cursor: "pointer",
                    }}
                  />{" "}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
