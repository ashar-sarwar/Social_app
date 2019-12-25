import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const loginUser = {
      email: this.state.email,
      password: this.state.password
    };

  this.props.loginUser(loginUser)
  };

  componentWillReceiveProps(nextProps) {
if(nextProps.auth.isAuthenticated){
  this.props.history.push("/dashboard")
}

    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Sign in to your account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    // className="form-control form-control-lg"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email address"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                  //  className="form-control form-control-lg"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password} </div>
                  )}{" "}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapSateToProps,
  { loginUser }
)(withRouter(Login));
