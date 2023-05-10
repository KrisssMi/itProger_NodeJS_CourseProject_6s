import React, { Component, useState } from "react";
import "./style.css";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import NavBar from "../components/NavBar";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      role: "",
    };
    this.onChange = this.onChange.bind(this); // подключаем метод onChange, который будет обрабатывать изменения в полях формы
    this.onSubmit = this.onSubmit.bind(this); // подключаем метод onSubmit, который будет обрабатывать отправку формы
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }); // устанавливаем значение поля формы в state
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(newUser);
  }

  componentWillReceiveProps(nextProps) {
    // вызывается каждый раз, когда компонент получает новые свойства
    if (nextProps.auth.isAuthenticated) {
      // проверяем авторизован ли пользователь
      this.state.role = nextProps.auth.users.role; // получаем роль пользователя
      if (nextProps.auth.users.role == "ADMIN") {
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/home");
      }
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    // отрисовываем форму
    const { errors } = this.state;
    const responseGoogle = (response) => {
      console.log(response);
    };

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
                    <h4 className="mb-3 f-w-400">Login into your account</h4>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">✉</span>
                        </div>
                        <input
                          name="email"
                          type="email"
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
                        {this.state.errorMessage && (
                          <div className="invalid-feedback">
                            {this.state.errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">✔</span>
                        </div>
                        <input
                          name="password"
                          type="password"
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
                      <div className="form-group text-left mt-2">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="checkbox-fill-1"
                            id="checkbox-fill-1"
                            checked=""
                          />

                          <input
                            type="checkbox"
                            name="checkbox-fill-2"
                            id="checkbox-fill-2"
                          />

                          <label htmlFor="checkbox-fill-2" className="cr">
                            Save Credentials.
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-primary shadow-2 mb-4">
                        Login
                      </button>
                    </form>
                    <p className="mb-0 text-muted">
                      Don’t have an account?{" "}
                      <a
                        href={`${process.env.PUBLIC_URL}/register/`}
                        className="f-w-400"
                      >
                        Signup
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src="../assets/img/slider/login1.png"
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

// указываем свойства, которые должны быть переданы компоненту
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // получаем свойства из хранилища
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  // подключаем компонент к хранилищу
  mapStateToProps, // подключаем свойства из хранилища
  { loginUser }
)(Login);
