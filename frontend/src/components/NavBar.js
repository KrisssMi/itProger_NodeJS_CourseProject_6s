import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCode,
  faUser,
  faBlog,
  faUsers,
  faList,
  faFileCode,
  faComputer,
  faSignOutAlt,
  faSignIn,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import "../components/NavBarStyle.css";

class NavBar extends Component {
  onLogoutClick(e) {
    // метод для выхода из аккаунта
    e.preventDefault();

    this.props.logoutUser();
    // window.location.href = "/";
  }

  state = {
    displayProp: "none", // свойство для отображения меню
    flexProp: "row",
  };
  classToggle = () => {
    const { displayProp, flexProp } = this.state;
    this.setState({
      displayProp: displayProp === "none" ? "flex" : "none",
      flexProp: flexProp === "row" ? "column" : "row",
    });
  };

  render() {
    const { isAuthenticated, users } = this.props.auth; // получаем данные из authReducer.js
    localStorage.setItem("userid", JSON.stringify(users.id));
    if (users.roles && users.roles.length > 0) {
      localStorage.setItem("userRole", JSON.stringify(users.roles[0]));
    } else {
      console.warn("User has no roles!");
    }

    const { displayProp, flexProp } = this.state;

    console.log("isAuthenticated:", isAuthenticated);
    console.log("users:", users);

    if (users.roles && users.roles.includes("ADMIN")) {
      console.log("test Admin");
      return (
        <div>
          {/*====================  header area ====================*/}
          <div className="header-area header-sticky header-sticky--default">
            <div className="header-area__desktop header-area__desktop--default">
              {/*=======  header navigation area  =======*/}
              <div className="header-navigation-area default-bg">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      {/* header navigation */}
                      <div className="header-navigation header-navigation--header-default position-relative">
                        <div
                          className="header-navigation__nav position-static"
                          style={{ width: "100%" }}
                        >
                          <nav className="main-nav">
                            <a href={`${process.env.PUBLIC_URL}/home`}>
                              <div className="logoHead">
                                <h2>itProger</h2>
                              </div>
                            </a>
                            <ul id="main-nav-ul">
                              <li>
                                <Link
                                  to={`${process.env.PUBLIC_URL}/statistic`}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faHome} size="2x" />
                                    <span
                                      style={{
                                        fontSize: "9px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      STATISTIC
                                    </span>
                                  </div>
                                </Link>
                              </li>
                              <li className="has-children has-children--multilevel-submenu">
                                <a>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faCode} size="2x" />
                                    <span
                                      style={{
                                        fontSize: "9px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      COURSES
                                    </span>
                                  </div>
                                </a>
                                <ul className="submenu">
                                  <li>
                                    <a
                                      href={
                                        `${process.env.PUBLIC_URL}/addcourse/` +
                                        users.id
                                      }
                                    >
                                      ADD COURSES
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href={
                                        `${process.env.PUBLIC_URL}/add-lecture/` +
                                        users.id
                                      }
                                    >
                                      ADD LECTURE
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href={`${process.env.PUBLIC_URL}/services`}
                                    >
                                      ALL COURSES
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/finalprofiles`}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faBlog} size="2x" />
                                    <span
                                      style={{
                                        fontSize: "9px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      ALL PROFILES
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a href={`${process.env.PUBLIC_URL}/allusers`}>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faUsers} size="2x" />
                                    <span
                                      style={{
                                        fontSize: "9px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      USERS
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/ShowCourseList`}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faList} size="2x" />
                                    <span
                                      style={{
                                        fontSize: "9px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      COURSES
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/ShowCategoryList`}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faFileCode}
                                      size="2x"
                                    />
                                    <span
                                      style={{
                                        fontSize: "9px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      CATEGORIES
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/EnrollmentList`}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faComputer}
                                      size="2x"
                                    />
                                    <span
                                      style={{
                                        fontSize: "9px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      ENROLLED USERS
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href=""
                                  onClick={this.onLogoutClick.bind(this)}
                                  className="nav-link"
                                >
                                  {" "}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faSignOutAlt}
                                      size="2x"
                                    />
                                    <span
                                      style={{
                                        fontSize: "9px",
                                        marginTop: "5px",
                                      }}
                                    >
                                      {" "}
                                      LOGOUT
                                    </span>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (users.roles && users.roles.includes("USER")) {
      console.log("test User");
      var authLinks = (
        <React.Fragment>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/Notifications`}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faComments} size="2x" />
                <span
                  style={{
                    fontSize: "9px",
                    marginTop: "5px",
                  }}
                >
                  NOTIFICATIONS
                </span>
              </div>
            </Link>
          </li>
          <li className="has-children has-children--multilevel-submenu">
            <a>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faList} size="2x" />
                <span
                  style={{
                    fontSize: "9px",
                    marginTop: "5px",
                  }}
                >
                  COURSES
                </span>
              </div>
            </a>
            <ul className="submenu">
              <li>
                <a
                  href={
                    `${process.env.PUBLIC_URL}/servicesforstudent/` + users.id
                  }
                >
                  MY COURSES
                </a>
              </li>
              <li>
                <a href={`${process.env.PUBLIC_URL}/services`}>ALL COURSES</a>
              </li>
            </ul>
          </li>
          <li>
            <Link to={`${process.env.PUBLIC_URL}/finaldashboard`}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faUser} size="2x" />
                <span
                  style={{
                    fontSize: "9px",
                    marginTop: "5px",
                  }}
                >
                  PROFILE
                </span>
              </div>
            </Link>{" "}
          </li>
          <li>
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                <span
                  style={{
                    fontSize: "9px",
                    marginTop: "5px",
                  }}
                >
                  LOGOUT{" "}
                </span>
              </div>
            </a>
          </li>
        </React.Fragment>
      );
    }
    const guestLinks = // if user is not logged in
      (
        <React.Fragment>
          <li>
            <Link className="nav-link" to="/login">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faSignIn} size="2x" />
                <span
                  style={{
                    fontSize: "9px",
                    marginTop: "5px",
                  }}
                >
                  LOGIN
                </span>
              </div>
            </Link>
          </li>
        </React.Fragment>
      );

    return (
      <div>
        {/*====================  header area ====================*/}
        <div className="header-area header-sticky header-sticky--default">
          <div className="header-area__desktop header-area__desktop--default">
            {/*=======  header navigation area  =======*/}
            <div className="header-navigation-area default-bg">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    {/* header navigation */}
                    <div className="header-navigation header-navigation--header-default position-relative">
                      <div
                        className="header-navigation__nav position-static"
                        style={{ width: "100%" }}
                      >
                        <nav className="main-nav">
                          <a href={`${process.env.PUBLIC_URL}/home`}>
                            <div className="logoHead">
                              <h2>itProger</h2>
                            </div>
                          </a>
                          <ul id="main-nav-ul">
                            <li>
                              <a href={`${process.env.PUBLIC_URL}/home`}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faHome} size="2x" />
                                  <span
                                    style={{
                                      fontSize: "9px",
                                      marginTop: "5px",
                                    }}
                                  >
                                    HOME
                                  </span>
                                </div>
                              </a>
                            </li>
                            {isAuthenticated ? authLinks : guestLinks}{" "}
                            {/* if user is logged in then show authLinks else show guestLinks */}
                          </ul>
                          <div
                            className="Navbar__Link Navbar__Link-toggle"
                            onClick={this.classToggle}
                          >
                            <i className="fas fa-bars" />
                          </div>
                        </nav>
                        <nav
                          className="Navbar__Items"
                          style={{
                            display: displayProp,
                          }}
                        >
                          <ul
                            style={{
                              display: displayProp,
                              flexDirection: flexProp,
                            }}
                          >
                            <li className="has-children has-children--multilevel-submenu">
                              <a href={`${process.env.PUBLIC_URL}/home`}>
                                HOME
                              </a>
                              <ul className="submenu">
                                <li>
                                  <a href={`${process.env.PUBLIC_URL}/home`}>
                                    Homepage Two
                                  </a>
                                </li>
                              </ul>
                            </li>
                            {isAuthenticated ? authLinks : guestLinks}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*=======  End of header navigation area =======*/}
          </div>
        </div>
        {/*====================  End of header area  ====================*/}
      </div>
    );
  }
}

NavBar.propTypes = {
  // to check if the props are passed correctly
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
