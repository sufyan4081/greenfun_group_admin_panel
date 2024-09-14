import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";
import logo from "../../assets/images/logo/logo.png";
import "../../App.css";

const Navbarmenu = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isResponsiveClose, setResponsiveClose] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({}); // Track each submenu separately

  const toggleClass = () => {
    setIsMenu(!isMenu);
    setResponsiveClose(!isResponsiveClose);
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName], // Toggle specific submenu
    }));
  };

  const isSubmenuOpen = (menuName) => openSubMenus[menuName];

  let boxClass = ["main-menu menu-right menuq1"];
  if (isMenu) {
    boxClass.push("menuq2");
  } else {
    boxClass.push("");
  }

  return (
    <header className="header__middle">
      <div className="container">
        <div className="row">
          {/* Add Logo */}
          <div className="header__middle__logo">
            <NavLink exact activeClassName="is-active" to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>

          <div className="header__middle__menus">
            <nav className="main-nav">
              {/* Responsive Menu Button */}
              {isResponsiveClose ? (
                <span
                  className="menubar__button"
                  style={{ display: "none" }}
                  onClick={toggleClass}
                >
                  <FiXCircle />
                </span>
              ) : (
                <span
                  className="menubar__button"
                  style={{ display: "none" }}
                  onClick={toggleClass}
                >
                  <FiAlignRight />
                </span>
              )}

              <ul className={boxClass.join(" ")}>
                {/* home */}
                <li className="menu-item">
                  <NavLink
                    exact
                    activeClassName="is-active"
                    onClick={toggleClass}
                    to={`/`}
                  >
                    Home
                  </NavLink>
                </li>

                {/* About Dropdown */}
                <li
                  className="menu-item sub__menus__arrows"
                  onClick={() => toggleSubmenu("about")}
                >
                  <Link to="#">
                    About <FiChevronDown />
                  </Link>
                  <ul
                    className={`sub__menus ${
                      isSubmenuOpen("about") ? "sub__menus__Active" : ""
                    }`}
                  >
                    <li>
                      <NavLink
                        onClick={toggleClass}
                        activeClassName="is-active"
                        to={`/about/about-us`}
                      >
                        About Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={toggleClass}
                        activeClassName="is-active"
                        to={`/about/international-presence`}
                      >
                        International Presence
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={toggleClass}
                        activeClassName="is-active"
                        to={`/about/prestigious-client`}
                      >
                        Our Prestigious Client
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={toggleClass}
                        activeClassName="is-active"
                        to={`/about/certification-process`}
                      >
                        Certification Process
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={toggleClass}
                        activeClassName="is-active"
                        to={`/about/logo-rules`}
                      >
                        Rules For Logo Use
                      </NavLink>
                    </li>
                  </ul>
                </li>

                {/* Our Services Dropdown */}
                <li className="menu-item">
                  <NavLink
                    onClick={toggleClass}
                    activeClassName="is-active"
                    to={`services`}
                  >
                    Services
                  </NavLink>
                </li>

                {/* Accreditation Dropdown */}
                <li className="menu-item">
                  <NavLink
                    onClick={toggleClass}
                    activeClassName="is-active"
                    to={`accreditation`}
                  >
                    Accreditation
                  </NavLink>
                </li>

                {/* verify */}
                <li className="menu-item">
                  <NavLink
                    onClick={toggleClass}
                    activeClassName="is-active"
                    to={`verification`}
                  >
                    Verification
                  </NavLink>
                </li>

                {/* contact */}
                <li className="menu-item">
                  <NavLink
                    onClick={toggleClass}
                    activeClassName="is-active"
                    to={`/contact`}
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbarmenu;
