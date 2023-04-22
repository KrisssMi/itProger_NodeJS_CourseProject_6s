import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowCourse = (props) => (
  <option key={props.todo.name} value={props.todo.name}>
    {props.todo.name}
  </option>
  // <button type="button" class="list-group-item list-group-item-action">{props.todo.courseName}</button>
);
export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      Courses: [],
      course: "",
      title: "",
    };
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/courses/")
      .then((response) => {
        this.setState({ Courses: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  CourseList() {
    return this.state.Courses.map(function (currentTodo, i) {
      return <ShowCourse todo={currentTodo} key={i} />;
    });
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value,
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = [];
    // list allow mime type
    const types = ["video/mp4", "video/mkv"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };
  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 2000000000000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onChangeHandler = (event) => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0,
      });
    }
  };
  onClickHandler = (event) => {
    event.preventDefault();
    console.log(`Todo course: ${this.state.course}`);
    console.log(`Todo title: ${this.state.title}`);

    // const data = new FormData();
    // data.append("course", this.state.course); // добавить данные в FormData
    // data.append("title", this.state.title); // добавить данные в FormData

    // console.log(data.has("course")); // true, если данные 'course' были добавлены в FormData
    // console.log(data.get("course")); // значение, связанное с ключом 'course'

    // console.log(data.has("title")); // true, если данные 'title' были добавлены в FormData
    // console.log(data.get("title"));
    // console.log("data na fronte");
    // console.log(data.values());

    const form = new FormData();
    form.append("course", this.state.course);
    form.append("name", this.state.title);
    form.append("video", this.state.selectedFile[0]);
    axios
      .post("http://localhost:9000/lecture/add", form, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        toast.success("upload success");
      })
      .catch((err) => {
        toast.error("upload fail");
      });
    // setTimeout(function(){
    //   window.location.reload()
    // }.bind(this), 1300
    // )
  };

  render() {
    var message2 = "you have selected " + this.state.course;
    return (
      <div>
        <NavBar />
        <div class="container">
          <div class="row">
            <div class="offset-md-3 col-md-6">
              <form
                action="lectures/localupload"
                method="POST"
                encType="multipart/form-data"
              >
                <div class="form-group files">
                  <div className="form-group">
                    <label>Course Name </label>
                    <select
                      className="form-control"
                      name="course"
                      id="ada"
                      onChange={this.onChangeCourse}
                      value={this.state.course}
                    >
                      {this.CourseList()}
                    </select>
                    <p>{message2}</p>
                  </div>
                  <div className="form-group">
                    <label>Video Title </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>

                  <label>Upload Your File </label>
                  <input
                    type="file"
                    name="file"
                    class="form-control"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <ToastContainer />
                  <Progress max="100" color="success" value={this.state.loaded}>
                    {Math.round(this.state.loaded, 2)}%
                  </Progress>
                </div>

                <button
                  type="button"
                  class="btn btn-success btn-block"
                  onClick={this.onClickHandler}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
