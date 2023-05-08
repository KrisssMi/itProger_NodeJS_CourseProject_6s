import React, { Component } from "react";
import "./style.css";
import axios from "../utils/axios";
import classnames from "classnames";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.props.match.params.role,
    };
    axios
      .post("/auth/registration", newUser)
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/login/");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState({ errors: err.response.data });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <NavBar />
        <div className="auth-wrapper">
          <div className="auth-content container">
            <div className="card">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="card-body">
                    <div className="logoHead">
                      <h3>itProger</h3>
                    </div>
                    <h4 className="mb-3 f-w-400">Sign up into your account</h4>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">☺ </span>
                        </div>
                        <input
                          type="text"
                          name="name"
                          className={classnames("form-control", {
                            "is-invalid": errors.name,
                          })}
                          placeholder="Name"
                          value={this.state.name}
                          onChange={this.onChange}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">✉</span>
                        </div>
                        <input
                          type="email"
                          name="email"
                          className={classnames("form-control", {
                            "is-invalid": errors.email,
                          })}
                          placeholder="Email address"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">✔</span>
                        </div>
                        <input
                          type="password"
                          name="password"
                          className={classnames("form-control", {
                            "is-invalid": errors.password,
                          })}
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">☑</span>
                        </div>
                        <input
                          type="password"
                          name="password2"
                          className={classnames("form-control", {
                            "is-invalid": errors.password2,
                          })}
                          placeholder="Confirm Password"
                          value={this.state.password2}
                          onChange={this.onChange}
                        />
                        {errors.password2 && (
                          <div className="invalid-feedback">
                            {errors.password2}
                          </div>
                        )}
                      </div>
                      <div className="form-group text-left mt-2" />
                      <input
                        type="submit"
                        value="Sign Up"
                        className="btn btn-primary shadow-2 mb-4"
                      />
                    </form>

                    <p className="mb-2">
                      Already have an account?{" "}
                      <a
                        href={`${process.env.PUBLIC_URL}/login/`}
                        className="f-w-400"
                      >
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src="../assets/img/slider/register2.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
