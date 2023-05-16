import React, { Component } from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

import Login from "./auth/Login";
import Register from "./auth/Register";
import UserList from "./admin/ShowAllUsers";
import EditUser from "./admin/EditUser";
import ShowCategoryList from "./admin/ShowCategoryAdmin";
import ShowCourseList from "./admin/ShowCourseAdmin";
import EditCourseList from "./admin/EditCourseAdmin";
import CreateCategoryAdmin from "./admin/CreateCategoryAdmin";
import EditCategoryList from "./admin/EditCategoryAdmin";
import EnrollmentList from "./admin/ShowEnrollmentAdmin";
import Statistic from "./admin/Statistic";
import CreateEnrollAdmin from "./admin/CreateEnrollmentAdmin";
import HomeTwo from "./Home";
import Services from "./listOfCourses/Courses";
import Servicesforstudent from "./listOfCourses/CoursesForStudent";
import AddCourse from "./blog/AddCourse";
import AddLecture from "./blog/AddLecture";
import Notification from "./blog/Notification";
import BlogDetailsLeftSidebar from "./blog/BlogDetailsLeftSidebar";
import PageNotFound from "./pages/404";
import NoMAtch from "./pages/404";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/common/PrivateRoute";
//actions
import { setCurrentUser, logoutUser } from "./actions/authActions";

//profile stuff
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profile from "./components/profile/Profile";
import FinalDashboard from "./components/FinalDashboard";
import FinalProfiles from "./components/FinalProfiles";

//check for token  to avoid state destroy on reload
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and export default
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isauthenticated
  //we can call any action using below method
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //Redirect to login
    window.location.href = "/";
  }
}

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={HomeTwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home`}
              component={HomeTwo}
            />

            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/servicesforstudent/:id`}
              component={Servicesforstudent}
              roles={["USER"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/services`}
              component={Services}
              roles={["USER", "ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/addcourse/:id`}
              component={AddCourse}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/:id`}
              component={BlogDetailsLeftSidebar}
              roles={["USER", "ADMIN"]}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register`}
              component={Register}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/allusers`}
              component={UserList}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/allusers/edit/:id`}
              component={EditUser}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/statistic`}
              component={Statistic}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/createEnrollAdmin`}
              component={CreateEnrollAdmin}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/EnrollmentList`}
              component={EnrollmentList}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/ShowCourseList`}
              component={ShowCourseList}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/ShowCategoryList`}
              component={ShowCategoryList}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/ShowCourseList/edit/:id`}
              component={EditCourseList}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/ShowCategoryList/edit/:id`}
              component={EditCategoryList}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/CreateCategoryAdmin`}
              component={CreateCategoryAdmin}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/add-lecture/:id`}
              component={AddLecture}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/Notifications`}
              component={Notification}
              roles={["USER"]}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/404`}
              component={PageNotFound}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/finaldashboard`}
              component={FinalDashboard}
              roles={["USER"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/create-profile`}
              component={CreateProfile}
              roles={["USER"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/edit-profile`}
              component={EditProfile}
              roles={["USER"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/finalprofiles`}
              component={FinalProfiles}
              roles={["ADMIN"]}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/profile/:handle`}
              component={Profile}
              roles={["USER", "ADMIN"]}
            />
            <Route component={NoMAtch} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Root />);
