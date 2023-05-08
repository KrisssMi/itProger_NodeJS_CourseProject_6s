import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Progress } from "reactstrap";
import NavBar from "../components/NavBar";
import axios from "axios";

const ShowCat = (props) => (
  <option key={props.todo.name} value={props.todo.name}>
    {props.todo.name}
  </option>
);
export default class AddCourse extends Component {
  constructor(props) {
    super(props);

    /** Setting the initial state of the component by assigned an object to this.state **/
    this.state = {
      name: "",
      description: "",
      category: [],
      todos: [],
    };
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:9000/categories/")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  CatList() {
    const categoryList = this.state.todos.map(function (currentTodo, i) {
      return <ShowCat todo={currentTodo} key={i} />;
    });
    categoryList.unshift(
      <option key="default" value="" disabled>
        Select category...
      </option>
    );
    return categoryList;
  }

  onChangeCourseName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeCategory(e) {
    const selectedCategory = e.target.value;
    this.setState({
      category: selectedCategory,
    });
  }
  onSubmit(e) {
    e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

    // Check if the name field is not empty
    if (this.state.name.trim() === "") {
      // Display an error message or take appropriate action
      toast.error("Course name cannot be empty");
      return;
    }
    if (
      typeof this.state.category !== "string" ||
      this.state.category.trim() === ""
    ) {
      // Display an error message or take appropriate action
      toast.error("Please select a category");
      return;
    }

    // console.log(`Form submitted:`);
    // console.log(`Todo name: ${this.state.name}`);
    // console.log(`Todo description: ${this.state.description}`);
    // console.log(`Todo instructor: ${this.state.instructor}`);
    // console.log(`Todo category: ${this.state.category}`);

    const newTodo = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
    };
    console.log(newTodo);
    axios
      .post("http://localhost:9000/course/add", newTodo)

      .then((result) => {
        this.props.history.push("/add-lecture/" + this.props.match.params.id);
      });
  }
  render() {
    var message = "You selected " + this.state.category;
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Add Course</h1>
                <div className="form-group">
                  <label>Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="coursename"
                    placeholder="Enter Course name"
                    value={this.state.name}
                    onChange={this.onChangeCourseName}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Enter Description"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                </div>
                <div>
                  <label>Course Category</label>
                  <br />
                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #95c4e2",
                      borderRadius: "5px",
                    }}
                    name="category"
                    id="ada"
                    onChange={this.onChangeCategory}
                    value={this.state.category || ""}
                  >
                    {this.CatList()}
                  </select>
                </div>
                <p>{message}</p>
                <br />
                <div class="form-group">
                  <ToastContainer />
                </div>
                <button
                  type="submit"
                  value="add course"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Add Course
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
