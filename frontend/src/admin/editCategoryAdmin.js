import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import axios from "axios";

export default class CatEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  // Чтобы извлечь данные из бд--> use the componentDidMount lifecycle method
  componentDidMount() {
    axios
      .get("http://localhost:9000/category?id=" + this.props.match.params.id)
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange = (e) => {
    const state = this.state.todos;
    state[e.target.name] = e.target.value;
    this.setState({ todos: state });
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  onSubmit = (e) => {
    e.preventDefault();

    const { no, name } = this.state.todos;
    console.log(this.state.todos);

    // Проверка, чтобы поле "name" не было пустым
    if (!name) {
      toast.error("Category name cannot be empty");
      return;
    }

    axios
      .put("http://localhost:9000/category?id=" + this.props.match.params.id, {
        no,
        name,
      })
      .then((result) => {
        this.props.history.push("/ShowCategoryList/");
      });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                <Link to="/ShowCategoryList" className="btn btn-light">
                  Go Back
                </Link>
                <br />
                <br />
                <h1 className="h3 mb-3 font-weight-bold">EDIT Category</h1>
                <br />
                <div>
                  <label>Category Name: </label>
                  <br />
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    value={this.state.todos.name}
                    onChange={this.onChange}
                    placeholder="Category name"
                  />
                </div>
                <br />
                <ToastContainer />
                <button type="submit" className="btn btn-lg btn-info btn-block">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
