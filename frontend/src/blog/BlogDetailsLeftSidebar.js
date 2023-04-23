import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import axios from "axios";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

//const KEY = "AIzaSyC41NHooeOCgkfQlI3MXIAHDVSy_q2nOrk";

class BlogDetailsLeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      user: JSON.parse(localStorage.getItem("id")),
      userRole: JSON.parse(localStorage.getItem("role")),
      selectedVideo: null,
      enrolled: "ADD TO COURSE LIST",
      buttonclass: "btn btn-success",
      addcourse: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    // this.setState({
    //   course: this.props.match.params.id,
    //   student:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNjgyMTQ1MjAzLCJleHAiOjE2ODIyMzE2MDN9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNjgyMTQ1MjAzLCJleHAiOjE2ODIyMzE2MDN9.soyCuoK13jyuEm_4rTfeZ6Mer6lIfcGluxz8JGBEA8g+Y=",
    //   approved: true,
    // });
    console.log(`Form submitted:`);
    console.log(`Todo userid: ` + this.state.user);
    console.log(`Todo courseId: ` + this.props.match.params.id);
    //console.log(`Todo approved: `);

    const newTodo = {
      student: this.state.user,
      course: this.props.match.params.id,
      approved: true,
    };
    if (this.state.buttonclass == "btn btn-success") {
      axios
        .post("http://localhost:5000/enrollbystudent/add", newTodo)
        .then((result) => {
          //this.props.history.push("/addtoplaylist/"+this.props.match.params.id)
          toast.success("Added successfully");
        })
        .catch((err) => {
          // then print response status
          toast.error("Course not added");
        });
    } else {
      console.log(this.state.buttonclass);
      toast.error("Course already added");
    }
  }
  componentDidMount() {
    this.onTextSubmit("react tutorials");
  }

  onTextSubmit = async (text) => {
    if (this.state.userRole == "USER") {
      this.setState({
        addcourse: true,
      });
    }

    const response = await axios
      .get("http://localhost:9000/lectures?id=" + this.props.match.params.id)
      .then((result) => {
        console.log(
          "http://localhost:9000/checkenrollment?id=" +
            this.state.user +
            "&&courseid=" +
            this.props.match.params.id
        );
        const responseEnrolled = axios
          .get(
            "http://localhost:9000/checkenrollment?id=" +
              this.state.user +
              "&&courseid=" +
              this.props.match.params.id
          )
          .then((result) => {
            if (result.data != undefined) {
              this.setState({
                enrolled: "ALREADY ENROLLED",
                buttonclass: "btn btn-danger",
              });
            } else {
              console.log(result.data);
            }
            //return result;
          });
        console.log(result.data[0]);
        return result;
      });

    this.setState({
      videos: response.data,
      selectedVideo: response.data[0],
      status: "loading",
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/* breadcrumb */}
        {/*====================  breadcrumb area ====================*/}
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-banner text-center">
                  <h1>Course Details</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/services">Courses</a>
                    </li>
                    <li>Course Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====================  End of breadcrumb area  ====================*/}

        {/*====================  project details page content ====================*/}
        <div className="page-wrapper section-space--inner--120">
          {/*Projects section start*/}
          <div className="project-section">
            <div className="container">
              {/* <SearchBar onFormSubmit={this.onTextSubmit} /> */}
              <div className="row">
                <div className="col-12 section-space--bottom--40">
                  <div className="ui container">
                    <div className="ui grid">
                      <div className="ui row">
                        <div className="eleven wide column">
                          <VideoDetail video={this.state.selectedVideo} />
                        </div>

                        <div className="five wide column">
                          <VideoList
                            onVideoSelect={this.onVideoSelect}
                            videos={this.state.videos}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-12 section-space--bottom--30 pl-30 pl-sm-15 pl-xs-15">
                  <div className="project-details">
                    <h2>
                      {" "}
                      {this.state.selectedVideo
                        ? this.state.selectedVideo.title
                        : this.state.status}
                    </h2>
                    <p>
                      {this.state.selectedVideo
                        ? this.state.selectedVideo.course.description
                        : this.state.status}
                    </p>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div>
                    <ToastContainer />
                    <button
                      type="button"
                      style={this.state.addcourse ? {} : { display: "none" }}
                      className={this.state.buttonclass}
                      onClick={this.onClick}
                    >
                      {this.state.enrolled}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Projects section end*/}
        </div>
        {/*====================  End of project details page content  ====================*/}
      </div>
    );
  }
}

export default BlogDetailsLeftSidebar;
