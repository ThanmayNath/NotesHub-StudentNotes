import React, { useContext } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import "../styles/nav.css";
import { authContext } from "../contexts/auth";

const Nav = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  return (
    <>
      {/* NavBAR */}

      <div className="nav">
        <h2>
          Notes<span>Hub</span>
        </h2>
        <div className="header-list">
          <ul>
            <li>
              <Link to="/" className="allli">
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore" className="allli">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/add" className="allli">
                Add Note
              </Link>
            </li>
            <li>
              <Link to="/request" className="allli">
                Request Note
              </Link>
            </li>
            <li>
              {user ? (
                <Link to="/profile" className="lastli">
                  <AccountCircleIcon style={{ fontSize: "40px" }} />
                  {user ? <p>{user.username}</p> : <p>User</p>}
                </Link>
              ) : (
                <button className="btn" onClick={() => navigate("/login")}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* navbar End */}
    </>
  );
};
export default Nav;
