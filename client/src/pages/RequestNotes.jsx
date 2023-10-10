import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import "../styles/Request.css";
import { authContext } from "../contexts/auth";

const RequestNotes = () => {
  const [error, setError] = useState(false);
  const [content, setcontent] = useState("");
  const [reqnotes, setReqnotes] = useState([]);
  const { user } = useContext(authContext);
  const handleContentChange = (event) => {
    setcontent(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/reqnotes/add", {
        user: user.userid,
        content: content,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  useEffect(() => {
    const fetchAllReqnotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/reqnotes", {
          headers: { "x-access-token": localStorage.getItem("token") },
        });
        setReqnotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReqnotes();
  }, []);
  return (
    <>
      <Nav />
      <div className="con">
        <div className="form">
          <h1>Request Notes</h1>
          <form className="Req-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="content"
              placeholder="Enter the note title"
              name="content"
              onChange={handleContentChange}
            />
            <button type="submit">Request</button>
          </form>
          {reqnotes
            .slice(0)
            .reverse()
            .map((notes) => (
              <div className="request">
                <div className="note" key={notes.id}>
                  <p>{notes.req_notes}</p>
                  <Link to="/add">
                    <button className="add-button" type="submit">
                      ADD
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          {error && "Something went wrong!"}
        </div>
      </div>
    </>
  );
};

export default RequestNotes;
