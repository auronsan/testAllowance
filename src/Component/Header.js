import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Materialize = window.Materialize;
class Header extends React.Component {
  
  Logout() {
    cookies.remove('tokenHrforte');
    Materialize.toast('Logging out!', 4000);
    window.location.href = "/";
  }
  render() {


    return (

      <div>
        <h1>React App For Allowances</h1>
        <ul className="header ">
          {!this.props.isLogged && <li><NavLink to="/" >Login</NavLink></li>}
          {this.props.isLogged && <li><NavLink to="/home" >Home</NavLink></li>}
          {this.props.isLogged && <li><NavLink to="/company">Company</NavLink></li>}
          {this.props.isLogged && <li><a style={{ cursor: "pointer" }} onClick={this.Logout.bind(this)}>Logout</a></li>}

        </ul>
      </div>
    );
  }
}


export default Header;
