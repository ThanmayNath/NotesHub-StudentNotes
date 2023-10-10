import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/addnote.css";
import Nav from "./Nav";
import { authContext } from "../contexts/auth";

const Add = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(authContext);

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("user", user.userid);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("filename", filename);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8800/add", formData);
      navigate("/explore");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <>
      <Nav />
      <div className="main1">
        <form
          className="Add-form"
          encType="multipart/form"
          onSubmit={handleSubmit}
        >
          <h1>Add New Note</h1>
          <div className="textInput">
            <input
              type="text"
              id="title"
              placeholder="Note title"
              name="title"
              onChange={handleTitleChange}
            />
          </div>
          <div className="textArea">
            <textarea
              rows={5}
              type="text"
              id="desc"
              placeholder="Note desc"
              name="desc"
              onChange={handleDescChange}
            />
          </div>
          <div className="file">
            <input
              type="file"
              id="file"
              name="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <br></br>
          </div>
          <button type="submit">Add</button>
        </form>
        {error && "Something went wrong!"}
        <Link to="/profile">See your notes</Link>
      </div>
    </>
  );
};
export default Add;
