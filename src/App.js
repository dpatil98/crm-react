
import './App.css';
import './Login.css';
import './Adduser.css';

import {Link ,Route, Switch, Redirect} from 'react-router-dom' ;
import { Component, useState } from 'react';

import "bootstrap-icons/font/bootstrap-icons.css";
import { LoginForm } from './LoginForm';

function App() {
  return (
    <div className="App ">

      {/* <LoginForm/>    */}
      <Dashboard/>
      <div className="d-flex">
          < Sidebar/> 

          <Switch>
            
            <Route path="/Leads">
              < Leads/> 
            </Route>
            <Route path="/ServiceRequest">
              <ServiceRequest /> 
            </Route>
            <Route path="/AddUser">
              <AddUser /> 
            </Route>
          
            {/* <Route exact path="/">
            HOMe PAGE
            </Route> */}
            <Route Path="**">
                    404 NOT FOUND
            </Route>
          </Switch>
     </div>
    </div>
  );
}


function Dashboard()
{

  const functions =["<Leads/>","<SystemRequest/>",",Contacts/>"];
  
  return(

          <div className="dashboard-container">

              <nav >
                <div className="horizantal-nav bg-dark">
                  <div className="logo">
                      <img src="https://png.pngtree.com/element_pic/00/16/07/06577d261edb9ec.jpg" aria-label="LogoImage" />
                  </div>
                  <div className="user d-flex text-white">
                      {/* <div className="Add-User" >
                          <h1>Add User <i class="bi bi-person-plus-fill"></i> </h1>
                      </div> */}
                      <div className="Setting" >
                          <h1><i class="bi bi-gear-fill"></i></h1>
                      </div>
                      <div>
                          
                           
                          <div class="btn-group  user-icon-box">
                                <button className=" user-btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  <img src="https://www.w3schools.com/howto/img_avatar.png" aria-label="User-image" />
                                </button>
                                <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Profile <i class="bi bi-person-circle text-success"></i></a></li>
                                  <li><a class="dropdown-item" href="#">Log Out <i class="bi bi-box-arrow-right text-danger"></i></a></li>
                                  <li><Link className="dropdown-item" to="/AddUser">Add User <i class="bi bi-person-plus-fill text-primary"></i></Link></li>
                                  
                                </ul>
                          </div>

                      </div>
                  </div>
                </div>
              </nav>

              <div className="d-flex">
                <div className="open-btn btn">
                    <button className=" btn-primary btn" onClick={Open}><i class="bi bi-menu-button"></i></button>
                </div>
              </div>
              
          </div>  

        );


}


function Open()
{
 document.querySelector(".open-btn").style.display = "none";
  document.querySelector(".sidebar").style.display = "block";
 
}

function close()
{

  console.log("h");
  document.querySelector(".sidebar").style.display = "none";
  document.querySelector(".open-btn").style.display = "block";

}

function Sidebar()
{

  

  return(
    <div className="sidebar bg-dark">
      <nav>
          <button className="btn bg-dark text-white" onClick={close} >Close <i class="bi text-danger bi-x-square-fill"></i></button>
          <hr className="text-white mt-0" />
          <Link to="/Leads">Leads</Link>
          <Link to="/ServiceRequest">Servive Request</Link>
          <Link to="/Contacts">Contacts</Link>
      </nav>
    </div>

        );

}



function Leads()
{

  const users= [
    {
      id:"01",
      FirstName:"mark",
      LastName :"Otto",
      Status:"Active",
      Email:"a@gmail.com",
      Assig:"",
      Date:"02/09/2021"
  
    },
    {
      id:"02",
      FirstName:"mark",
      LastName :"Otto",
      Status:"Active",
      Email:"a@gmail.com",
      Assig:"",
      Date:"02/09/2021"
  
    },
    {
      id:"03",
      FirstName:"mark",
      LastName :"Otto",
      Status:"Active",
      Email:"a@gmail.com",
      Assig:"",
      Date:"02/09/2021"
  
    },
    {
      id:"04",
      FirstName:"mark",
      LastName :"Otto",
      Status:"Active",
      Email:"a@gmail.com",
      Assig:"",
      Date:"02/09/2021"
  
    },
  
  
  
  ];
  

  return(

        <div className="leads-container container">
            <div className="head-container">

                <div className="Content-heading">
                  <h3>Leads</h3>
                </div>
                <div className="leads-utilities d-flex justify-content-between">
                    <div className="search-box">
                      <input type="text" aria-label="ssrach" placeholder="Search"  /><i class="bi bi-search"></i>
                    </div>
                    <div className="add-user">
                    <button className="btn btn-primary"> <i class="bi bi-plus-square"></i> Add Lead</button>
                     </div>
                </div>
                

            </div>
            <div className="table-container">
               <table class="table table-hover">
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
      
                  {users.map(e => (

                    <tr>
                      <th scope="row">{e.id}</th>
                      <td>{e.FirstName}</td>
                      <td>Status</td>
                      <td>@mdo</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>


                  ))}
               
                </tbody>
              </table>
            </div>
        </div>

        );

}

 


function ServiceRequest()
{

  const users= [
    {
      id:"01",
      FirstName:"mark",
      LastName :"Otto",
      Status:"Active",
      Email:"a@gmail.com",
      Assig:"",
      Date:"02/09/2021"
  
    },
    {
      id:"02",
      FirstName:"mark",
      LastName :"Otto",
      Status:"Active",
      Email:"a@gmail.com",
      Assig:"",
      Date:"02/09/2021"
  
    },
    {
      id:"03",
      FirstName:"mark",
      LastName :"Otto",
      Status:"Active",
      Email:"a@gmail.com",
      Assig:"",
      Date:"02/09/2021"
  
    },
    {
      id:"04",
      FirstName:"mark",
      LastName :"Otto",
      Status:"Active",
      Email:"a@gmail.com",
      Assig:"",
      Date:"02/09/2021"
  
    },
  
  
  
  ];
  

  return(

        <div className="leads-container container">
            <div className="head-container">

                <div className="Content-heading">
                  <h3>Service Requests</h3>
                </div>
                <div className="leads-utilities d-flex justify-content-between">
                    <div className="search-box">
                      <input type="text" aria-label="ssrach" placeholder="Search"  /><i class="bi bi-search"></i>
                    </div>
                    <div className="add-user">
                    <button className="btn btn-primary"> <i class="bi bi-plus-square"></i> Add Lead</button>
                     </div>
                </div>
                

            </div>
            <div className="table-container">
               <table class="table table-hover">
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
      
                  {users.map(e => (

                    <tr>
                      <th scope="row">{e.id}</th>
                      <td>{e.FirstName}</td>
                      <td>Status</td>
                      <td>@mdo</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>


                  ))}
               
                </tbody>
              </table>
            </div>
        </div>

        );

}

function AddUser()
{

  return(

    <div className=" addUserForm container   text-center">
      <div className="my-3 pt-3">
        <i className="bi bi-person-circle text-success"></i>
        <h2 className=""> Add User</h2>
      </div>
    
   
    <form method="post ">

      <div className="form-group">
        <label>First Name :</label>
        <input type="textl" name="firstName" placeholder="First Name" required="FirstName" />
      </div>

      <br />

      <div className="form-group">
        <label>Last Name :</label>
        <input type="text" name="LastNam" placeholder="Last Name" required/>
      </div>

      <br />
      <div className="form-group">
        <label>Email :</label>
        <input type="Email" name="Password" placeholder="sample@gmail.com" required />
      </div>

      <br />


      <div className="form-group">
        <label>Password :</label>
        <input type="password" name="Password" placeholder="******" required="password" />
      </div>
      <br />
      <div className="form-group">
        <label> Confirm Password :</label>
        <input type="password" name="CPassword" placeholder="******" required="password" />
      </div>
      <br/>
      <div className="form-group">
      <select class="form-select" aria-label="Default select example">
        <option selected>Select Access Level</option>
        <option value="Admin">Admin</option>
        <option value="Manager<">Manager</option>
        <option value="Employee">Employee</option>
      </select>
      </div> 

      <br />
      <div className="text-danger">

      </div>
      <br />
      <input className=" btn mb-4 px-4 log-btn " type="submit" name="submit" value="Add User" />

    
      
    </form>

  </div>


        );

}

export default App;
