import logo from './logo.svg';
// import React from 'react';
import React, { Component } from "react";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import LoginForm from './Components/Login/LoginForm';
import RegistrationForm from './Components/Registration/RegistrationForm';
import Home from './Components/Home/Home';
import Details from './Components/Home/Details';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
         
          spinner:true,
          client_org_password:'',
          client_org_email:'',
          manage:false
      }
      this.submit = this.submit.bind(this);
  }
  componentDidMount(){
    // localStorage.clear();
    this.setState({spinner:false})
    var key = localStorage.getItem("token");
  
  
    if(key == null){
    this.setState({manage:false});
    }
    else{
      this.setState({manage:true});
      // this.props.history.push("Home");
    }
   
  }
  submit(){
    localStorage.clear();
    // <Redirect  to={"/LoginForm"} />
    // this.props.history.push("/LoginForm");
  }
  render() {

    return (
    <Router>
    <div className="App">
      
{this.state.manage == false ?
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
         
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
               
                <Link className="nav-link" to={"/LoginForm"}>Login</Link>
              </li>
              <li className="nav-item">


                <Link className="nav-link" to={"/RegistrationForm"}>Register</Link>
              </li>
              <li className="nav-item">


<Link className="nav-link" to={"/Home"}>Home</Link>
</li>
            </ul>
          </div>
        </div>
      </nav>
:

      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
         
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
               
                <Link className="nav-link" onClick={this.submit}>Logout</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      
  }
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
           
            <Route path="/LoginForm" component={LoginForm} />
            <Route path="/RegistrationForm" component={RegistrationForm} />
            <Route path="/Home" component={Home} />
            <Route path="/Details" component={Details} />
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}
}
