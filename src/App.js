
import './App.css';
import './Users/Login.css';
import './Users/Adduser.css';
import './Users/ForgotPass.css';

import {Route, Switch, Redirect} from 'react-router-dom' ;

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



// export function Open()
// {
//  document.querySelector(".open-btn").style.display = "none";
//   document.querySelector(".sidebar").style.display = "block";
 
// }

// export function close()
// {

//   console.log("h");
//   document.querySelector(".sidebar").style.display = "none";
//   document.querySelector(".open-btn").style.display = "block";

//}

export default App ;