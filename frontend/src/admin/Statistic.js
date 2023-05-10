import React, { Component } from "react";
import NavBar from "../components/NavBar";
import CanvasJSReact from "../canvas/canvasjs.react";
import axios from "../utils/axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dd = [];
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { c1: [], c2: [] };
  }
  getCoursedata() {
    axios
      .get("/courses/")
      .then((response) => {
        var dict = {};
        dd = [];

        response.data.forEach((element) => {
          console.log(element);
          if (dict[element.Category.name] == undefined) {
            dict[element.Category.name] = 1;
          } else {
            dict[element.Category.name] += 1;
          }
        });

        for (var k in dict) {
          dd.push({ y: dict[k], name: k });
        }
        console.log(dd);

        this.setState({ c2: dd });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getEnrollmentdata() {
    axios
      .get("/enrollments/")
      .then((response) => {
        var dict = {};
        dd = [];
        response.data.forEach((element) => {
          if (dict[element.Course.name] == undefined) {
            dict[element.Course.name] = 1;
          } else {
            dict[element.Course.name] += 1;
          }
        });

        for (var k in dict) {
          dd.push({ y: dict[k], label: k });
        }
        console.log(dd);
        this.setState({ c1: dd });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getCoursedata();
    this.getEnrollmentdata();
  }

  render() {
    const options1 = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Students Per Course",
        fontFamily: "Nunito",
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "column",
          dataPoints: this.state.c1,
        },
      ],
    };

    const options2 = {
      exportEnabled: true,
      animationEnabled: true,

      title: {
        text: "Courses Per Category",
        fontFamily: "Nunito",
      },
      subtitles: [
        {
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###",
          dataPoints: this.state.c2,
        },
      ],
    };

    return (
      <div>
        <NavBar />
        <div className="container">
          <tr
            className="row"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <th className="col-md-6">
              <CanvasJSChart options={options2} />
            </th>
          </tr>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="row">
            <CanvasJSChart options={options1} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
