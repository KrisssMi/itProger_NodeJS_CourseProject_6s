import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

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
                            <a href={`${process.env.PUBLIC_URL}/home-two`}>
                              <div className="logoHead">
                                <h2>itProger</h2>
                              </div>
                            </a>
                            <ul id="main-nav-ul">
                              <li>
                                <a href={`${process.env.PUBLIC_URL}/dashboard`}>
                                  DASHBOARD
                                </a>
                              </li>
                              <li>
                                <a href={`${process.env.PUBLIC_URL}/allusers`}>
                                  USERS
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/ShowCourseList`}
                                >
                                  COURSES
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/ShowCategoryList`}
                                >
                                  CATEGORIES
                                </a>
                              </li>
                              <li>
                                <a
                                  href={`${process.env.PUBLIC_URL}/EnrollmentList`}
                                >
                                  ENROLLED USERS
                                </a>
                              </li>
                              <li>
                                <a
                                  href=""
                                  onClick={this.onLogoutClick.bind(this)}
                                  className="nav-link"
                                >
                                  {" "}
                                  LOGOUT
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
          <li className="has-children has-children--multilevel-submenu">
            <a>COURSES</a>
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
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              {" "}
              LOGOUT
            </a>
          </li>
        </React.Fragment>
      );
    }
    if (users.roles && users.roles.includes("INSTRUCTOR")) {
      console.log("test Teacher");
      var authLinks = (
        <React.Fragment>
          <li className="has-children has-children--multilevel-submenu">
            <a>COURSES</a>
            <ul className="submenu">
              <li>
                <a href={`${process.env.PUBLIC_URL}/services/` + users.id}>
                  MY COURSES
                </a>
              </li>
              <li>
                <a href={`${process.env.PUBLIC_URL}/addcourse/` + users.id}>
                  ADD COURSES
                </a>
              </li>
              <li>
                <a href={`${process.env.PUBLIC_URL}/add-lecture/` + users.id}>
                  ADD LECTURE
                </a>
              </li>
              <li>
                <a href={`${process.env.PUBLIC_URL}/services`}>ALL COURSES</a>
              </li>
            </ul>
          </li>
          <li>
            <a href={`${process.env.PUBLIC_URL}/finaldashboard`}>PROFILE</a>{" "}
          </li>
          <li>
            <a href={`${process.env.PUBLIC_URL}/finalprofiles`}>ALL PROFILES</a>
          </li>
          {/* <li>
              <a href={`${process.env.PUBLIC_URL}/services/`}>
                SERVICE
              </a>{" "}
              </li> */}
          <li>
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              {" "}
              LOGOUT
            </a>
          </li>
        </React.Fragment>
      );
    }
    const guestLinks = // if user is not logged in
      (
        <React.Fragment>
          <li>
            <Link className="nav-link" to="/login/student">
              LOGIN
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/login/instructor">
              Teach On itProger
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
                          <a href={`${process.env.PUBLIC_URL}/home-two`}>
                            <div className="logoHead">
                              <h2>itProger</h2>
                            </div>
                          </a>
                          <ul id="main-nav-ul">
                            <li>
                              <a href={`${process.env.PUBLIC_URL}/home-two`}>
                                HOME
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
                              <a href={`${process.env.PUBLIC_URL}/home-two`}>
                                HOME
                              </a>
                              <ul className="submenu">
                                <li>
                                  <a
                                    href={`${process.env.PUBLIC_URL}/home-two`}
                                  >
                                    Homepage Two
                                  </a>
                                </li>
                              </ul>
                            </li>
                            {/* <li> <a herf =" http://localhost:9000/hostname/:id">
                              image
                            </a>
                            </li> */}
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
