import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import "../styles/landingPage.css";
import "../styles/home.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ErrorIcon from "@mui/icons-material/Error";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/home", {
          headers: { "x-access-token": localStorage.getItem("token") },
        });
        console.log(res.data);
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNotes();
  }, []);
  useEffect(() => {
    const results = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, notes]);
  const handleReport = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8800/report/${id}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="home">
      <Nav />
      <input
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="display">
        {filteredData.map((note) => (
          <div className="notes">
            <div className="card" key={note.id}>
              <h2>{note.title}</h2>
              <h3>{note.desc}</h3>
              <a
                href={`http://localhost:8800/${note.file_id}`}
                download
                className="firstAnchor"
              >
                <PictureAsPdfIcon style={{ fontSize: "35px" }} />
              </a>
              <a onClick={() => handleReport(note.id)} className="secondAnchor">
                <ErrorIcon style={{ fontSize: "35px" }} />{" "}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
