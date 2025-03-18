import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GET } from "../api";

function Header({ shouldShowHeader }) {
  // console.log(shouldShowHeader, "shouldShowHeader");

  const [project, setProject] = useState([]);
  useEffect(() => {
    GET("project_list").then((response) => {
      if (response.status == "success") {
        setProject(response.data);
      }
    });
  }, []);
  return (
    <header
      className={`${shouldShowHeader === false ? "fixHeader" : ""} header`}
    >
      <div className="container">
        <div className="logo">
          <Link to="/">
            DCT Homes
            {/* <img src="/assets/images/logo.png" alt="logo" title="logo" /> */}
          </Link>
        </div>
        <nav className="navigation">
          <ul className="main-menu">
            <li className="menu-links">
              <Link to="/">HOME</Link>
            </li>
            <li className="menu-links sub-head">
              PROJECTS
              <div className="sub-menu">
                <ul className="sub-links">
                  {project.map((data) => {
                    return (
                      <Link key={data._id} to={"/property-list/" + data.slug}>
                        {data.name}
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li className="menu-links">
              <Link to="/blog">BLOG</Link>
            </li>
            <li className="menu-links sub-head">
              MORE
              <div className="sub-menu">
                <ul className="sub-links">
                  <Link to="/news">News</Link>
                  <Link to="/testimonials">Testimonials</Link>
                  {/* <Link to="/more-developers">More Developers</Link> */}
                  <Link to="/privacy-of-users">Privacy Of Users</Link>
                  <Link to="/terms-and-conditions">Terms & Conditions</Link>
                </ul>
              </div>
            </li>
            <li className="menu-links">
              <Link to="/about-us">ABOUT US</Link>
            </li>
            <li className="menu-links">
              <Link to="contact-us">CONTACT US</Link>
            </li>
          </ul>
        </nav>
        <button className="mob-menu">
          <span className="btn-border"></span>
          <span className="btn-border"></span>
          <span className="btn-border"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
