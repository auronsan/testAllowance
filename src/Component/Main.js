import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import Company from "./Company";
import GetAllowance from "./GetAllowance";
import Notifications from 'react-notify-toast';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      company_id: 0
    }
  }

  componentDidMount() {
    if (cookies.get('tokenHrforte')) {
      window.location.href = "#home";
      this.setState({ isLogged: true });
    } else {
      console.log('Not login');
    }
  }
  setStateLogged() {
    if (this.state.isLogged) {
      this.setState({ isLogged: false });

    } else {
      this.setState({ isLogged: true });
    }
  }
  setStateCompany(companyID) {
    if (companyID) {
      this.setState({ company_id: companyID });
    }
  }
  render() {
    return (
      <HashRouter>

        <div>
          <Notifications />
          <Header isLogged={this.state.isLogged} />
          <div className="content">
            <Route exact path="/" render={() => <Login setLogged={this.setStateLogged.bind(this)} />} />
            {this.state.isLogged && <Route path="/home" component={Home} />}
            {this.state.isLogged && <Route path="/company" component={Company} />}
            {this.state.isLogged && <Route path="/:id/getAllowance" component={GetAllowance} />}
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;