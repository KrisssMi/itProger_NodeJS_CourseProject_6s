import React, { Component } from "react";
import NavBar from "../components/NavBar";
class PageNotFound extends Component {
  render() {
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/*====================  404 page content ====================*/}
        <div>
          <div className="error-page-wrapper d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-9 m-auto text-center">
                  <div className="error-content-centered d-flex align-items-center justfy-content-center">
                    <div className="error-page-content-wrap">
                      <h2>404</h2>
                      <h3>PAGE NOT FOUND</h3>
                      <p>
                        Error has occurred or that the requested page has been
                        deleted or moved to another address.
                      </p>
                      <a
                        href="/"
                        className="ht-btn ht-btn--default ht-btn--default--dark-hover"
                      >
                        Back to Home Page
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*====================  End of 404 page content  ====================*/}
      </div>
    );
  }
}

export default PageNotFound;
