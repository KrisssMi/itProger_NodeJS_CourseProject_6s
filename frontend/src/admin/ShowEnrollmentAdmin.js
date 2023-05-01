import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "./admin.css";

export default class EnrollList extends Component {
  constructor(props) {
    super(props);
    this.state = { enrollments: [], search: "" };
    this.refreshEnrollList = this.refreshEnrollList.bind(this);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:9000/enrollments/");
      this.setState({ enrollments: data });
    } catch (error) {
      console.log(error);
    }
  }

  delete(id) {
    // console.log(id);
    axios
      .delete("http://localhost:9000/enrollment?id=" + id)
      .then((result) => {
        // this.forceUpdate()
        toast.success("Deleted successfully");
        // this.props.history.push("/showenroll/")
      })
      .catch((err) => {
        toast.error("Course not deleted");
      });
    setTimeout(
      function () {
        window.location.reload();
      }.bind(this),
      700
    );
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
    // var message='You selected '+this.state.todos.id
    const Todo = (props) => (
      <div style={divStyle}>
        <tr>
          <td>{props.todo.User.email}</td>
          <td>{props.todo.Course.name}</td>
          <td>
            <button
              onClick={this.delete.bind(this, props.todo.id)}
              class="btn btn-danger"
            >
              Delete
            </button>
            {/* <p>{message}</p> */}
          </td>
        </tr>
      </div>
    );

    let filteredusers = this.state.enrollments.filter((enroll) => {
      return enroll.user_id !== -1 || enroll.course_id !== -1;
      // return enroll.user_id.email.indexOf(this.state.search) !== -1;
    });

    return (
      <div>
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
          <h1 style={{ marginLeft: "-200px", color: "#a5c41a" }}>
            Enrollment List
          </h1>
          <input
            type="text"
            placeholder="Search..."
            class="form-control input-sm"
            style={{ width: "250px" }}
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
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
