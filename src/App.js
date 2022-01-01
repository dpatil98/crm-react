
import './App.css';
import './Users/Login.css';
import './Users/Adduser.css';
import './Users/ForgotPass.css';

import {Link ,Route, Switch, Redirect} from 'react-router-dom' ;

import "bootstrap-icons/font/bootstrap-icons.css";
import { LoginForm } from './Users/LoginForm.js';
import { Dashboard } from './Dashboard/Dashboard.js';
// import { AddUser } from './Users/AddUser.js';
import { ForgotPassword, ResetPassword } from './Users/ForgotPassword';




 
export const URL = "http://localhost:3000/Dashboard";

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
              < Dashboard/>
            </Route>
            <Route exact path="/">
              < LoginForm/> 
            </Route>     
            <Route exact path="/ForgotPassword">
              <  ForgotPassword />
            </Route>
            <Route exact path="/reset-password">
              < ResetPassword />
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






export default App ;