import React from "react";

import $ from 'jquery';
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';

const swal = window.swal;
const cookies = new Cookies();

const Materialize = window.Materialize;
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
      url: 'https://zoe.hrforte.com/v1/AllowanceTypes/' + this.props.match.params.company_id + '/page?pg=1',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      type: 'GET',
      success: (response) => {
        this.setState({ allowance: response.allowanceTypes })
      }
    });
  }
  delete(allowance_id) {

    var token = cookies.get('tokenHrforte');

    var deletedId = [allowance_id];
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: 'https://zoe.hrforte.com//v1/AllowanceTypes/' + this.props.match.params.company_id + '',
          beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          contentType: "application/json",
          dataType: "json",
          type: 'DELETE',
          data: JSON.stringify(deletedId),
          success: (response) => {
            $("#allowance_" + allowance_id).fadeOut();
            swal(
              'Deleted!',
              '',
              'success'
            )
          },
          error: (e) => {
            swal(
              'Error',
              e.responseJSON.developerMessage,
              'error'
            )

          }
        });

      }
    })
  }
  deleteAll() {


    var token = cookies.get('tokenHrforte');
    var checkbox = $("#table_allowance input:checkbox:checked");
    var isExist = false;
    var deletedId = [];
    $.each(checkbox, (index, value) => {
      var singleId = (($(value).attr("id")).split("_"))[2];
      deletedId.push(singleId);
      isExist = true;
    });
    if (isExist) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: 'https://zoe.hrforte.com//v1/AllowanceTypes/' + this.props.match.params.company_id + '',
            beforeSend: (xhr) => {
              xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            contentType: "application/json",
            dataType: "json",
            type: 'DELETE',
            data: JSON.stringify(deletedId),
            success: (response) => {
              $.each(deletedId, (index, value) => {
                $("#allowance_" + value).fadeOut();
              });

              swal(
                'Deleted!',
                '',
                'success'
              )
            },
            error: (e) => {
              swal(
                'Error',
                e.responseJSON.developerMessage,
                'error'
              )

            }
          });

        }
      });
      isExist = false;
    }else{
      Materialize.toast('Not Selected Item', 4000);
    }
  }
  render() {
    return (
      <div>
<NavLink className="actionButton waves-effect btn" to={"/" + this.props.match.params.company_id + "/addAllowance/"} >Add New</NavLink>
<button className="actionButton waves-effect btn" onClick={this.deleteAll.bind(this)} >Delete Selected</button>
        <table className="highlight responsive-table" id="table_allowance">
          <thead>
            <tr>
              <th>check</th>
              <th>id</th>
              <th>Code</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {this.state.allowance.map((item, i) => {
              return <tr id={"allowance_" + item.id} key={i}>
                <td> <input type="checkbox" className="filled-in" id={"allowance_check_" + item.id} /> <label htmlFor={"allowance_check_" + item.id}></label></td>
                <td>{item.id}</td>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td><NavLink className="actionButton" to={"/" + this.props.match.params.company_id + "/updateAllowance/" + item.id} >Update</NavLink><NavLink className="actionButton" to={"/" + this.props.match.params.company_id + "/detailAllowance/" +item.id} >Detail</NavLink><a className="actionButton" onClick={this.delete.bind(this, item.id)} >Delete</a></td>
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