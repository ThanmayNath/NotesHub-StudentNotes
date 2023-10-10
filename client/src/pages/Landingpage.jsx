import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "../styles/landingPage.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { authContext } from "../contexts/auth";
//import NotInterestedIcon from '@mui/icons-material/NotInterested';

import Aos from "aos";
import "aos/dist/aos.css";
import Img1 from "../image/image1.png";
import Img2 from "../image/image2.png";

const Landingpage = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <Nav />
      {/* section 2 start */}

      <div className="section2" data-aos="zoom-in">
        <div className="box">
          <div className="header">
            <h1>
              Welcome to Notes<span>Hub</span>
            </h1>
          </div>
          <div className="main">
            <div className="text">
              <p>
                NoteHub allows students to share notes , study Guides etc.. The
                website will contain various features to help student with their
                studies. All notes are reviewed every 24 hours to ensure to a
                high quality.
              </p>
              {/* <p>
        We want to connect the students who have knowledge to the students who need it, to bring together students with different perspectives so they can understand each other better, and to empower everyone to share their knowledge for the benefit of the rest of the world.
        </p> */}
            </div>
            <div className="img">
              <img src={Img1} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* section 2 end */}

      {/* section  3 start  */}
      <div
        className="section3"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <div className="img">
          <img src={Img2} alt="" />
        </div>
        <div className="card">
          <div className="header">
            <h2>Note Hub --</h2>

            <span>Your Learning Partner</span>
          </div>

          <div className="text">
            <p>
              Notehub offers students the opportunity to get the most of their
              hard work. Students can Download their notes. Start Now to improve
              your grades
            </p>
          </div>
        </div>
      </div>
      {/* section 3 end */}

      {/* section 4 start */}
      <div className="section4">
        <h2>FEATURES</h2>
        <div className="allcards">
          <div className="firstBlock">
            <div className="card1" data-aos="fade-right">
              <UploadFileIcon
                style={{ fontSize: "79px", color: " rgb(119, 119, 254)" }}
              />
              <h4>Upload Files</h4>
              <p>{/* UPLOAD FILES */}</p>
            </div>
            <div className="card1 " data-aos="fade-right">
              <FileDownloadIcon
                style={{ fontSize: "79px", color: " rgb(119, 119, 254)" }}
              />
              <h4>Download Files</h4>
              <p></p>
            </div>
          </div>

          <div className="secondBlock">
            <div className="card1 second-block" data-aos="fade-right">
              <PageviewOutlinedIcon
                style={{ fontSize: "79px", color: " rgb(119, 119, 254)" }}
              />
              <h4>View Files</h4>
              <p></p>
            </div>
            <div className="card1 second-block" data-aos="fade-right">
              <SupportAgentIcon
                style={{ fontSize: "79px", color: " rgb(119, 119, 254)" }}
              />
              <h4>
                24*7 Customer
                <br /> Support
              </h4>
              <p></p>
            </div>
          </div>

          {/* <br /><br /> */}
        </div>
      </div>
      {/* section 4 end */}

      {/* footer  start*/}
      <footer>
        <div className="copyRights">
          <h2>About Us</h2>
          <p>
            NoteHub allows students to share notes , study Guides etc.. The
            website will contain various features to help student with their
            studies. All notes are reviewed every 24 hours to ensure to a high
            quality.
          </p>
          <span className="span">
            <CopyrightIcon />
            2023 Inc.All rights reserved
          </span>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Accessibility</li>
          </ul>
        </div>
        <ul>
          <li>
            {" "}
            <LocationOnIcon />
            21/7 Kozhikode kerala
          </li>
          <li>
            {" "}
            <LocalPhoneIcon />
            93872971212
          </li>
          <li>
            {" "}
            <EmailIcon />
            support@gmail.com
          </li>
          <li>
            {user ? null : (
              <button className="btn" onClick={() => navigate("/adminlogin")}>
                Admin
              </button>
            )}
          </li>
        </ul>
      </footer>
      {/* footer end */}
    </>
  );
};

export default Landingpage;
