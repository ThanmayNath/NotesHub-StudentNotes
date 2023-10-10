import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "../styles/landingPage.css";
import "../styles/profile.css";
import { authContext } from "../contexts/auth";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Profile = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const { user, setUser } = useContext(authContext);
  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/profile/${user.userid}`,
          {
            headers: { "x-access-token": localStorage.getItem("token") },
          }
        );
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
  const handleLogout = async () => {
    setUser(null);
    //localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div>
      <Nav />
      <button className="logout" onClick={() => handleLogout()}>
        log out
      </button>
      <div className="allCard">
        {notes.map((note) => (
          <div className="notes">
            <div className="note" key={note.id}>
              <h2>{note.title}</h2>
              <h3>{note.desc}</h3>
              <a
                href={`http://localhost:8800/${note.file_id}`}
                download
                className="firstAnchor"
              >
                <PictureAsPdfIcon style={{ fontSize: "35px" }} />
              </a>
              <button className="delete" onClick={() => handleDelete(note.id)}>
                Delete
              </button>
              <button className="update">
                <Link
                  to={`/update/${note.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Profile;
