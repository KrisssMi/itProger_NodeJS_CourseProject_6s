import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    // initialize the state with an empty todos array
    this.state = { todos: [], search: "" };
  }

  //for searching event in page
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
  componentDidMount() {
    axios
      .get("http://localhost:9000/courses/")
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
      .delete("http://localhost:9000/course?id=" + id)
      .then((result) => {
        // this.forceUpdate()
        // this.props.history.push("/showcourses/")
        toast.success("Deleted successfully");
      })
      .catch((err) => {
        // then print response status
        toast.error("Course not deleted");
      });
    setTimeout(
      function () {
        //Start the timer
        window.location.reload(); //After 1 second, set render to true
      }.bind(this),
      1300
    );
  }

  // todoList() {
  //     return this.state.todos.map(function(currentTodo, i){
  //         // console.log(currentTodo.first_name)
  //         return <Todo todo={currentTodo} key={i} />;

  //     })
  // }

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
        // course.instructor.email.indexOf(this.state.search) !== -1
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

        {/* <div>
        <DataTable
          value={this.state.todos}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem", backgroundColor: "#F8F9FA" }}
          className="p-datatable-custom"
        >
          <Column field="name" header="Name" style={{ width: "25%" }}></Column>
          <Column
            field="description"
            header="Description"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="category"
            header="Category"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="action"
            header="Action"
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
        </div> */}

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
              {/* displaying data coming  */}
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
