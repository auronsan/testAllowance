import React from "react";

import $ from 'jquery';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class DetailAllowance extends React.Component {
   
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

                $("#detailcode").html(response.code);
                $("#detailname").html(response.name);

            }
        });
    }
    back() {
        this.props.history.push("/" + this.props.match.params.company_id + "/getAllowance");
    }
    render() {
        return (
            <div>
                <table className="highlight responsive-table" id="table_allowance">

                    <tbody>
                        <tr><td> Code :</td><td  id="detailcode">Loading..</td>
                        </tr>
                        <tr><td> Name :</td><td id="detailname">Loading..</td>
                        </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="input-field col s12">
                        <button onClick={this.back.bind(this)} className="waves-effect waves-light btn"><i className="material-icons left">keyboard_return</i>Back</button>
                    </div>
                </div>

            </div>
        );
    }
}


export default DetailAllowance;