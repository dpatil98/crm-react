import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function Leads() {

  const [customers, setCustomers] = useState(null);

  useEffect( async ()=>{ 

      await fetch("http://localhost:9000/Dashboard/Leads",{
      method : "GET"  
      }).then((response) => response.json())
        .then(data => setCustomers(data))
        .catch( (e) => console.log(e));
      
      // if(re.Status==="404")
      // {
      // history.push('/**');
      // }
      // else{
      // //  setData(re.User.email)
      //   values.Email=re.User.email;
      //   console.log("Link Is Valid",re);
      //   console.log("Email Is ",values.Email);
      // }
    
  },[]);


  return (

    <div className="leads-container container">
      <div className="head-container">

        <div className="Content-heading">
          <h3>Leads</h3>
        </div>
        <div className="leads-utilities d-flex justify-content-between">
          <div className="search-box">
            <input type="text" aria-label="ssrach" placeholder="Search" /><i className="bi bi-search"></i>
          </div>
          <div className="add-user">
            <Link to="/Dashboard/Leads/AddLead"><button className="btn btn-primary"> <i className="bi bi-plus-square"></i>Add Leads</button></Link>
          </div>
        </div>


      </div>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Email</th>
              <th scope="col">Assigned Employee</th>
              <th scope="col">Created Date</th>
            </tr>
          </thead>
          <tbody className="leads-tableBody">

            {(customers)? customers.map(e => (

              <tr>
                <th scope="row">1</th>
                <td>{e.firstName} {e.lastName}</td>
                <td>{e.status}</td>
                <td>{e.email}</td>
                <td>{e.assignedEmp}</td>
                <td>{e.date}</td>
              </tr>


            )):null }

          </tbody>
        </table>
      </div>
    </div>

  );

}
