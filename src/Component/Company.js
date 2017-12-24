import React from "react";
import { NavLink } from "react-router-dom";
class Company extends React.Component {
 render() {
   return (
     <div>
      <table className="highlight responsive-table">
      <thead>
        <tr>
            <th>Company</th>
            <th>Company Name</th>
            <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>Test Company</td>
             <td><NavLink to="/1/getAllowance" >Look Allowance</NavLink></td>
        </tr>
      </tbody>
    </table>
     </div>
   );
 }
}

export default Company;