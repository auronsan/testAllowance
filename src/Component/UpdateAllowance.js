import React from "react";

import $ from 'jquery';
import Cookies from 'universal-cookie';

const Materialize = window.Materialize;
const cookies = new Cookies();
class UpdateAllowance extends React.Component {
    
    componentDidMount() {
        
        var token = cookies.get('tokenHrforte');
        $("#updateid").val(this.props.match.params.id);
        $.ajax({
            url: 'https://zoe.hrforte.com/v1/AllowanceTypes/' + this.props.match.params.company_id + '/' + this.props.match.params.id,
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            type: 'GET',
            success: (response) => {

                $("#updatecode").val(response.code);

                $("#updatename").val(response.name);
            }
        });
    }
    update() {
        var token = cookies.get('tokenHrforte');
        $.ajax({
            url: 'https://zoe.hrforte.com/v1/AllowanceTypes/' + this.props.match.params.company_id,
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }, 
            data: JSON.stringify({
                id:  $("#updateid").val(),
                code: $("#updatecode").val(),
                name: $("#updatename").val()
            }),
            contentType: "application/json",
            dataType: "json",
            type: 'PUT',
            success: (response) => {
                Materialize.toast('Success Update', 4000);
                this.props.history.push("/"+this.props.match.params.company_id+"/getAllowance");
            }
        });
    }
    render() {
        return (
            <div>

                <div className="row">
                    <form className="col s12" onSubmit={this.update()}>
                        <div className="row">
                            <input id="updateid" type="hidden" />
                            <div className="input-field col s6">
                                <input id="updatecode" type="text" className="validate" placeholder="code" />
                                <label className="active" htmlFor="updatecode">Code</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="updatename" type="text" className="validate" placeholder="name" />
                                <label className="active" htmlFor="updatename">Name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">

                                <button type="submit" onClick={this.update.bind(this)} className="waves-effect waves-light btn"><i className="material-icons left">update</i>update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default UpdateAllowance;