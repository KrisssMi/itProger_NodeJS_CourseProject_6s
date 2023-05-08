import React, { Component } from "react";
import axios from "../utils/axios";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], search: "" };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
  componentDidMount() {
    axios
      .get("/courses/")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  delete(id) {
    console.log(id);
    axios
      .delete("/course?id=" + id)
      .then((result) => {
        toast.success("Deleted successfully");
      })
      .catch((err) => {
        toast.error("Course not deleted");
      });
    setTimeout(
      function () {
        window.location.reload();
      }.bind(this),
      1000
    );
  }

  render() {
    const divStyle = {
      display: "contents",
    };
    const Todo = (props) => (
      <div style={divStyle}>
        <tr>
          <td>{props.todo.name}</td>
          <td>{props.todo.description}</td>
          <td>{props.todo.Category.name}</td>
          <td>
            <a
              href={"/ShowCourseList/edit/" + props.todo.id}
              class="btn btn-primary btn-info"
              role="button"
              aria-pressed="true"
            >
              Edit
            </a>
            <button
              onClick={this.delete.bind(this, props.todo.id)}
              class="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </div>
    );

    let filteredusers = this.state.todos.filter((course) => {
      return (
        course.name.indexOf(this.state.search) !== -1 ||
        course.description.indexOf(this.state.search) !== -1 ||
        (course.Category.name &&
          course.Category.name.indexOf(this.state.search) !== -1)
      );
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
          <input type="hidden" />
          <h1
            style={{
              marginLeft: "600px",
              color: "#a5c41a",
              fontFamily: "Nunito",
            }}
          >
            Course List
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
            style={{ marginTop: 20 }}
            ref={(el) => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Description</th>
                <th>Category</th>

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
