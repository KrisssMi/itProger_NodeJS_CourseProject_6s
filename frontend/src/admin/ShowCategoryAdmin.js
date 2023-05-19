import React, { Component } from "react";
import axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";

export default class ShowCategory extends Component {
  constructor(props) {
    super(props);

    /** Установка начального состояния компонента путем присвоения этому объекту this.state **/
    this.state = {
      todos: [],
      search: "",
    };
  }

  // для поиска события на странице
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  async componentDidMount() {
    axios
      .get("/categories/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ todos: response.data ? response.data : [] });
      })
      .catch((error) => {
        if (
          (error.response && error.response.status === 401) ||
          (error.response && error.response.status === 403)
        ) {
          window.location.href = "/login";
        } else {
          console.log(error);
        }
      });
  }

  async delete(id) {
    axios
      .delete("/category?id=" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((result) => {
        toast.success("Deleted successfully");
        setTimeout(() => {
          window.location.reload(); // обновление страницы после задержки
        }, 1000);
      })
      .catch((error) => {
        if (
          (error.response && error.response.status === 401) ||
          (error.response && error.response.status === 403)
        ) {
          window.location.href = "/login";
        } else {
          toast.error("Category not deleted");
        }
      });
  }

  render() {
    const divStyle = {
      display: "contents",
    };
    const Todo = (props) => (
      <div style={divStyle}>
        <tr>
          <td>{props.todo.name}</td>

          <td>
            <a
              href={"/ShowCategoryList/edit/" + props.todo.id}
              className="btn btn-primary btn-info"
              role="button"
              aria-pressed="true"
            >
              Edit
            </a>
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
    // используется при фильтрации содержимого, поступающего из базы данных
    let filteredusers = this.state.todos.filter((category) => {
      return category.name.indexOf(this.state.search) !== -1;
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
            href="/CreateCategoryAdmin/"
            className="btn btn-outline-info"
            role="button"
            aria-pressed="true"
          >
            Create Category
          </a>{" "}
          <br />
          <h1
            style={{
              marginLeft: "-200px",
              color: "#a5c41a",
            }}
          >
            Category List
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
            style={{ marginTop: 20 }}
            ref={(el) => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
              <tr>
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
