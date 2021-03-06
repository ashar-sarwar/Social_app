import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextFields from "./commons/textFields";
import { addExperience } from "../actions/profileActions";

class AddExperience extends Component {
  state = {
    company: "",
    position: "",
    from: "",
    to: "",
    current: false,
    errors: {},
    disabled: false
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
        this.setState({errors:nextProps.errors})
    }

}



  onSubmit = e => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      position: this.state.position,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
    };

    this.props.addExperience(expData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFields
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={errors.company}
                />
                <TextFields
                  placeholder="* Job Position"
                  name="position"
                  value={this.state.position}
                  onChange={this.onChange}
                  errors={errors.position}
                />
           
                <h6>From Date</h6>
                <TextFields
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  errors={errors.from}
                />
                <h6>To Date</h6>
                <TextFields
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  errors={errors.to}
                  disabled={this.state.disabled ? true : false}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
              
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(AddExperience);
