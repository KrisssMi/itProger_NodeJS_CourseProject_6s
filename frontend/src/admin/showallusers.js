import React, { Component } from "react";
import NavBar from "../components/NavBar";
import axios from "../utils/axios";
import "./admin.css";

const divStyle = {
  display: "contents",
};

const Todo = (props) => (
  <div style={divStyle}>
    <tr>
      <td>{props.todo.name}</td>
      <td>{props.todo.email}</td>
      <td>{props.todo.role}</td>
      <td>
        <a
          href={"/allusers/edit/" + props.todo.id}
          className="btn btn-primary btn-info"
          role="button"
          aria-pressed="true"
        >
          Edit
        </a>
      </td>
    </tr>
  </div>
);

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], search: "" };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  async componentDidMount() {
    axios
      .get("/auth/users/", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
      })
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let filteredusers = this.state.todos.filter((user) => {
      return (
        user.name.indexOf(this.state.search) !== -1 ||
        user.email.indexOf(this.state.search) !== -1
      );
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
          <input type="hidden" />
          <h1
            style={{
              marginLeft: "600px",
              color: "#a5c41a",
            }}
          >
            Manage Users
          </h1>
          <input
            type="text"
            placeholder="Search..."
            className="form-control input-sm"
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>

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
