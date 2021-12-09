
import './App.css';
import './Login.css';
import './Adduser.css';

import {Link ,Route, Switch, Redirect} from 'react-router-dom' ;
import { Component, useState } from 'react';

import "bootstrap-icons/font/bootstrap-icons.css";
import { LoginForm } from './LoginForm.js';
import { Dashboard } from './Dashboard.js';
import { AddUser } from './AddUser.js';


const URL = "http://localhost:3000/Dashboard";

function App() {


 

  return (
    <div className="App ">

      {/* <LoginForm/>    */}
      {/* <Dashboard/>
      <div className="d-flex">
          < Sidebar/> 
      </div>*/}
          <Switch>
            
            <Route path="/Dashboard">
              <Dashboard/>
            </Route>
            <Route exact path="/">
            < LoginForm/>
            </Route>
            <Route Path="**">
                    404 NOT FOUND
            </Route>
          </Switch>
     
    </div> 
  );
}



export function Open()
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

export function Sidebar()
{



  return(
    <div className="sidebar bg-dark">
      <nav>
          <button className="btn bg-dark text-white" onClick={close} >Close <i className="bi text-danger bi-x-square-fill"></i></button>
          <hr className="text-white mt-0" />
          <Link to="/Dashboard/Leads">Leads</Link>
          <Link to="/Dashboard/ServiceRequest">Servive Request</Link>
          <Link to="/Dashboard/Contacts">Contacts</Link>
      </nav>
    </div>

        );

}



export function Leads()
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
                      <input type="text" aria-label="ssrach" placeholder="Search"  /><i className="bi bi-search"></i>
                    </div>
                    <div className="add-user">
                    <button className="btn btn-primary"> <i className="bi bi-plus-square"></i> Add Lead</button>
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

 


export function ServiceRequest()
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
                      <input type="text" aria-label="ssrach" placeholder="Search"  /><i className="bi bi-search"></i>
                    </div>
                    <div className="add-user">
                    <button className="btn btn-primary"> <i className="bi bi-plus-square"></i> Add Lead</button>
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

export default App;
