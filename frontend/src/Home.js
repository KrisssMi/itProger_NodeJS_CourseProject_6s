import React, { Component } from "react";
import NavBar from "./components/NavBar";
import HeroSliderTwo from "./components/HeroSliderTwo";

class Home extends Component {
  render() {
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />
        {/* Hero slider */}
        <HeroSliderTwo />
      </div>
    );
  }
}

export default Home;
