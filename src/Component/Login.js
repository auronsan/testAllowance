
import React from "react";
import Cookies from 'universal-cookie';
import $ from 'jquery';
import { notify } from 'react-notify-toast';
const cookies = new Cookies();

class Login extends React.Component {

  onLogin(e) {
    e.preventDefault();
    if ($("#email").val() === "" || $("#password").val() === "") {
      notify.show('Please Input email & Password');
    } else {
      $.ajax({
        url: 'https://zoe.hrforte.com/v1/Account/token',
        data: JSON.stringify({
          email: $("#email").val(),
          password: $("#password").val()
        }),
        contentType: "application/json",
        dataType: "json",
        type: 'POST',
        success: (response) => {
          if (response !== null && response !== "") {
            const date = new Date(response.expiration);
            cookies.set('tokenHrforte', response.token, {
              expires: date
            });
            notify.show('Logged in');
            this.props.setLogged();
            window.location.href = "../#home";
          }
        },
        error: (e) => {
          notify.show('Email / Password not exist');
        }

      });
    }


  }
  componentDidMount() {
    if (cookies.get('tokenHrforte')) {
      window.location.href = "#home";
    }
  }
  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.onLogin.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" />
              <label htmlFor="email" data-error="wrong" data-success="right" required>Email</label>
            </div>
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" />
              <label htmlFor="password" data-error="wrong" data-success="right" required>Password</label>

            </div>
            <button type="submit" className="waves-effect waves-light btn"><i class="material-icons right">vpn_key</i>Login</button>
          </div>
        </form>
      </div>
    );
  }
}


export default Login;
