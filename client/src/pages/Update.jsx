import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "../styles/update.css";

const Update = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFilename(document.getElementById("file").value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const noteId = location.pathname.split("/")[2];

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("filename", filename);
    formData.append("file", file);

    try {
      await axios.put(`http://localhost:8800/profile/${noteId}`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="update">
      <Nav />
      <h2>Update Note</h2>
      <form
        className="Add-form"
        encType="multipart/form"
        onSubmit={handleSubmit}
      >
        <input
          className="text"
          type="text"
          id="title"
          placeholder="Note title"
          name="title"
          onChange={handleTitleChange}
        />
        <textarea
          rows={5}
          type="text"
          id="desc"
          placeholder="Note desc"
          name="desc"
          onChange={handleDescChange}
        />
        <input
          className="file"
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <br></br>
        <button type="submit">Update</button>
      </form>
      {error && "Something went wrong!"}
      <Link to="/profile">See your notes</Link>
    </div>
  );
};

export default Update;
