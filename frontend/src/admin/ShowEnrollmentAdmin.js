import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "./admin.css";

export default class EnrollList extends Component {
  constructor(props) {
    super(props);
    this.state = { enrollments: [] };
    this.refreshEnrollList = this.refreshEnrollList.bind(this);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  async componentDidMount() {
    axios
      .get("/enrollments/")
      .then((response) => {
        console.log(response.data);
        this.setState({ enrollments: response.data ? response.data : [] });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async delete(id) {
    axios
      .delete("/enrollment?id=" + id)
      .then((result) => {
        toast.success("Deleted successfully");
        setTimeout(() => {
          window.location.reload(); // обновление страницы после задержки
        }, 1000);
      })
      .catch((err) => {
        toast.error("Course not deleted");
      });
  }

  refreshEnrollList = (res) => {
    this.setState({
      enrollments: res.data.enrollments.map((todo) => {
        return {
          user: todo.User,
          course: todo.Course,
        };
      }),
    });
  };
  render() {
    const divStyle = {
      display: "contents",
    };
    const Todo = (props) => (
      <div style={divStyle}>
        <tr>
          <td>{props.todo.User.email}</td>
          <td>{props.todo.Course.name}</td>
          <td>
            <button
              onClick={this.delete.bind(this, props.todo.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </div>
    );

    let filteredusers = this.state.enrollments.filter((enroll) => {
      return enroll.user_id !== -1 || enroll.course_id !== -1;
    });

    return (
      <div style={{ overflow: "auto", height: "100vh" }}>
        <NavBar />
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/createEnrollAdmin"
            className="btn btn-outline-info"
            role="button"
            aria-pressed="true"
          >
            Create Enrollment
          </a>{" "}
          <br />
          <h1 style={{ marginRight: "640px", color: "#a5c41a" }}>
            Enrollment List
          </h1>
        </div>

        <div className="container" style={{ border: "10px solid lightgray" }}>
          <table
            className="table table-striped"
            id="usertable"
            ref={(el) => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
              <tr>
                <th>Student Email</th>
                <th>Course Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <ToastContainer />
            <tbody>
              {filteredusers.map(function (currentTodo, i) {
                return <Todo todo={currentTodo} key={i} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
