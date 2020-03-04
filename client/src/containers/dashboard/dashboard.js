import React, { Component } from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../landing/landing";
import Footer from "../landing/Footer";
import Axios from "axios";


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      subjects: [],
      // "baseUrl": 'https://jssstu-cs.herokuapp.com',
      // "baseUrl": "http://localhost:4000",
      "baseUrl": "http://10.24.30.34:4000",
      "currentPassword": "",
      "newPassword": "",
      "confirmPassword": "",
      'msg': "",
      'user': "",
      'status': ""
    };
  }


  publications = event => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/dashboard/publications"
    });
  };

  researchs = event => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/dashboard/researchs"
    });
  };

  awards = event => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/dashboard/awards"
    });
  };

  trainingConducted = event => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/dashboard/training/conducted"
    });
  };

  trainingAttended = event => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/dashboard/training/attended"
    });
  };

  subject = event => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/dashboard/subject",
    });
  };

  changePassword = event => {
    event.preventDefault();
    // console.log(this.props.user)
    if (this.state.confirmPassword !== this.state.newPassword || this.state.confirmPassword === "" || this.state.newPassword === "" || this.state.currentPassword === "") {
      this.setState({ msg: "Password Doesn't Matched", 'status': 'danger' })
      setTimeout(() => {
        this.setState({ msg: "" });
      }, 2000);
    } else {
      Axios.post(`${this.state.baseUrl}/change/password`, this.state).then(response => {
        // console.log(response)
        if (response.status === 200) {
          this.setState({ msg: "Password Changed Successfully", 'status': 'success' })
          this.setState({ "confirmPassword": "", "newPassword": "", "currentPassword": "" })
        } else {
          this.setState({ msg: "Current Entered password is not correct", status: 'danger' })
        }
        setTimeout(() => {
          this.setState({ msg: "" });
        }, 2000);
      })
    }
  };

  alert = () => {
    return (<div className={'alert alert-' + this.state.status}>{this.state.msg}</div>)
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  componentDidMount() {
    this.setState({ 'user': this.props.user.username })
    Axios.get(this.state.baseUrl + '/subject/' + this.props.user._id)
      .then(subjects => {
        // console.log(subjects);
        this.setState({ subjects: subjects.data })
        // console.log(this.state.Subjects)
      })
  }

  componentDidUpdate() { }

  onDummyHandler = () => {
    console.log("Card Clicked");
  };

  render() {
    const subjects = this.state.subjects;
    return (
      <div className="Dashboard  mt-2">
        <Navbar loggedIn={this.props.loggedIn} />
        <div className="container mt-4">
          <div className="box well">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={this.props.user.image}
                  alt=""
                  className="img-fluid mx-auto rounded-circle"
                />
              </div>
              <div className="col-md-8">
                <h2>{this.props.user.name}</h2>
                <p>
                  <strong>About: </strong>
                  {this.props.user.designation.split("_").join(" ")}
                </p>
                <p>
                  <strong>Subjects Handled: </strong>
                  {
                    subjects.map(subject => (
                      <span key={subject._id}><span className="tags">{subject.code}</span> <span> </span></span>
                    ))
                  }
                </p>
                <button type="button" className="btn btn-primary my-3 text-center" data-toggle="modal" data-target="#exampleModal">Change Password</button>

                <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLabel">Change Password</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body text-left">
                        {this.state.msg !== "" ? this.alert() : ""}
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Current Password</label>
                          <input type="password" id="exampleInputEmail1" name="currentPassword" value={this.state.currentPassword} placeholder="Enter your current Password" onChange={this.myChangeHandler} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Password</label>
                          <input type="password" id="exampleInputPassword1" name="newPassword" value={this.state.newPassword} placeholder="Enter new password" onChange={this.myChangeHandler} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword2">Confirm Password</label>
                          <input type="password" id="exampleInputPassword2" name="confirmPassword" value={this.state.confirmPassword} placeholder="Retype new password" onChange={this.myChangeHandler} required />
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.changePassword} id="buttonChangePassword" className="btn btn-success">Confirm Change</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section id="dashboard" className="section-bg">
            <div className="row">
              <div className="col-md-6 col-lg-5 offset-lg-1">
                <div className="box" onClick={this.publications}>
                  <div className="icon">
                    <i className="fa fa-pencil card-img-top"></i>
                  </div>
                  <h4 className="title">
                    <a href={this.onDummyHandler} onClick={this.publications}>Publications</a>
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-lg-5">
                <div className="box" onClick={this.researchs}>
                  <div className="icon">
                    <i className="fas fa-search card-img-top"></i>
                  </div>
                  <h4 className="title">
                    <a href={this.onDummyHandler}>Research Projects</a>
                  </h4>
                </div>
              </div>

              <div className="col-md-6 col-lg-5 offset-lg-1">
                <div className="box" onClick={this.awards}>
                  <div className="icon">
                    <i className="fa fa-trophy " aria-hidden="true"></i>                  </div>
                  <h4 className="title">
                    <a href={this.onDummyHandler}>Achievments & Awards</a>
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-lg-5">
                <div className="box" onClick={this.subject}>
                  <div className="icon">
                    <i className="fas fa-chalkboard-teacher card-img-top"></i>
                  </div>
                  <h4 className="title">
                    <a href={this.onDummyHandler}>Subjects Handled</a>
                  </h4>
                </div>
              </div>

              <div className="col-md-6 col-lg-5 offset-lg-1">
                <div className="box" onClick={this.trainingConducted}>
                  <div className="icon">
                    <i className="fas fa-chalkboard card-img-top"></i>
                  </div>
                  <h4 className="title">
                    <a href={this.onDummyHandler}>
                      Trainings & Workshops Conducted
                    </a>
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-lg-5">
                <div className="box" onClick={this.trainingAttended}>
                  <div className="icon">
                    <i className="fas fa-school card-img-top"></i>
                  </div>
                  <h4 className="title">
                    <a href={this.onDummyHandler}>
                      Trainings & Workshops Attended
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default (withRouter(Dashboard));
