import React from "react";
import { NavLink } from "react-router-dom";
import { notify } from 'react-notify-toast';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Header extends React.Component {
  Logout() {
    cookies.remove('tokenHrforte');

    notify.show('Logging out!');
    window.location.href = "/";
  }
  componentDidMount() {

  }
  render() {


    return (

      <div>
        <h1>React App For Allowances</h1>
        <ul className="header">
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
