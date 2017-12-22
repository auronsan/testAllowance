import React from "react";

import $ from 'jquery';
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class GetAllowance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowance: [],
      pages: 1,
      page: 1,
    }
  }
  componentDidMount() {

    var token = cookies.get('tokenHrforte');
    $.ajax({
      url: 'https://zoe.hrforte.com/v1/AllowanceTypes/' + this.props.match.params.id + '/page?pg=1',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      type: 'GET',
      success: (response) => {
        this.setState({ allowance: response.allowanceTypes })
      }
    });
  }
  render() {
    return (
      <div>

        <table className="highlight responsive-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Code</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {this.state.allowance.map((item, i) => {
              return <tr key={i}><td>{item.id}</td>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td><NavLink to="#" >under Construction</NavLink></td>
              </tr>
            })}


          </tbody>
        </table>
        <ul className="pagination">
          {[...Array(this.state.pages)].map((x, i) => {
            if (i + 1 === this.state.page) {
              return <li className="active" key={i}><a disabled id={"page_" + (i + 1)}>{i + 1}</a></li>
            } else {
              return <li className="waves-effect" key={i}><a id={"page_" + (i + 1)} >{i + 1}</a></li>
            }
          }
          )}
        </ul>
      </div>
    );
  }
}


export default GetAllowance;