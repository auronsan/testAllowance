import React from "react";

import $ from 'jquery';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('tokenHrforte');
const Materialize = window.Materialize;
class AddNewAllowance extends React.Component {

    componentDidMount() {


    }
    addnew() {
        $.ajax({
            url: 'https://zoe.hrforte.com/v1/AllowanceTypes/' + this.props.match.params.company_id,
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            data: JSON.stringify({
                id: 0,
                code: $("#addnewcode").val(),
                name: $("#addnewname").val(),
                taxable: true
            }),
            contentType: "application/json",
            dataType: "json",
            type: 'POST',
            success: (response) => {
                Materialize.toast('Insert Successfull', 4000);
                this.props.history.push("/" + this.props.match.params.company_id + "/getAllowance");
            },
            error: (e) => {
                Materialize.toast(e.responseJSON.developerMessage, 4000);
            }
            });
    }
    render() {
        return (
            <div>

                <div className="row">
                    <form className="col s12" onSubmit={this.addnew()}>
                        <div className="row">
                            <input id="updateid" type="hidden" />
                            <div className="input-field col s6">
                                <input id="addnewcode" type="text" className="validate" placeholder="code" />
                                <label className="active" htmlFor="updatecode">Code</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="addnewname" type="text" className="validate" placeholder="name" />
                                <label className="active" htmlFor="updatename">Name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">

                                <button type="submit" onClick={this.addnew.bind(this)} className="waves-effect waves-light btn"><i className="material-icons left">done</i>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default AddNewAllowance;