
import { useHistory } from 'react-router-dom';
import {Link ,Route, Switch} from 'react-router-dom' ;
import { AddUser } from '../Users/AddUser.js';
// import { Open} from '../App.js' ;

import { Leads } from "./Leads";
// import { Logout } from '../Users/Logout.js';
import { AddLead } from './AddLead.js';
import { Sidebar } from "./Sidebar";
import { useCookies } from 'react-cookie';
import { ServiceRequest } from './ServiceRequests.js';
import { AllUsers } from './AllUsers.js';
import { AddContact } from './AddContact.js';
import { Contacts } from './Contacts.js';

import './CssFiles/ResponsiveTable.css';


export function Dashboard() {

    const history = useHistory ();  
    const [cookie , setCookies ,removeCookie ] =useCookies();

    // if(!localStorage.getItem("token"))
    // {
    //   history.push("/");
    // }
    if(!cookie.token || !cookie.user)
    {
      history.push("/");
    }
    
    console.log("Dashboard", cookie.user);

    const Logout = () =>{
    
      removeCookie('user');
      removeCookie('token');
      // localStorage.clear();
      history.push("/");
      
    }


  return (

    <div className="dashboard-container">

      <nav>
        <div className="horizantal-nav bg-dark pt-1">
          <div className="logo mx-3">
            {/* <img src="https://png.pngtree.com/element_pic/00/16/07/06577d261edb9ec.jpg" aria-label="LogoImage" /> */}
            <img src="https://www.clipartmax.com/png/full/203-2037661_logo-sample-earth.png" aria-label="LogoImage" />
          </div>
          <div className="user d-flex text-white">
            {/* <div className="Add-User" >
                <h1>Add User <i class="bi bi-person-plus-fill"></i> </h1>
            </div> */}
            
             <div className="Users-Name px-3">
              <h6>{cookie.user.firstName} {cookie.user.lastName}</h6>
              <h6>{cookie.user.access_lvl}</h6>
            </div>
          
            <div className="Setting">
              <h1><i className="bi bi-gear-fill"></i></h1>
            </div>
            <div>


              <div className="btn-group  user-icon-box">
                <button className=" user-btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://www.w3schools.com/howto/img_avatar.png" aria-label="User-image" />
                </button>
                <ul className="dropdown-menu">
                  
                  <li className="dropdown-item" style={{ cursor: 'pointer' }} >Profile <i className="bi bi-person-circle text-success"></i></li>
                  {/* <li><a className="dropdown-item" href="#">Log Out <i className="bi bi-box-arrow-right text-danger"></i></a></li> */}
                  {/* <li onClick={Logout}><Link className="dropdown-item" to="/Dashboard/Logout">Log Out<i className="bi bi-box-arrow-right text-danger"></i></Link></li> */}
                  <li className="dropdown-item" style={{ cursor: 'pointer' }} onClick={Logout}>Log Out  <i className="bi bi-box-arrow-right text-danger"></i></li>
                  <li> 
                    { 
                    
                      (cookie.user.access_lvl === ("Admin" || "Manager") )
                      ? <Link className="dropdown-item" to="/Dashboard/AddUser" >Add User <i className="bi bi-person-plus-fill text-primary"></i></Link>
                      : <Link className="dropdown-item" to="/" style={{ pointerEvents: 'none' }}> Add User <i className="bi bi-person-plus-fill text-primary"></i></Link>
                    }
                    </li>
                  
          
                </ul>
              </div>

            </div>
          </div>
        </div>
      </nav>
          
      <div className="d-flex Dashboard-con ">
          < Sidebar/> 
          <Switch>
                  
                  <Route exact path="/Dashboard/Leads">
                    < Leads/> 
                  </Route>
                  <Route exact path="/Dashboard/Leads/AddLead">
                    <AddLead/> 
                  </Route>
                  <Route path="/Dashboard/ServiceRequest">
                    <ServiceRequest/> 
                  </Route>
                  <Route  exact path="/Dashboard/Contacts/AddContact">
                    <AddContact/>
                  </Route>
                  <Route path="/Dashboard/Contacts">
                    <Contacts/>
                  </Route>        
                  <Route  exact path="/Dashboard/AddUser">
                    <AddUser/> 
                  </Route>
                  <Route  exact path="/Dashboard/AllUsers">
                    <AllUsers/>
                  </Route>
                  {/* <Route path="/Dashboard/Logout">
                    < Logout /> 
                  </Route> */}
                  <Route Path="**">
                          404 NOT FOUND
                  </Route>
        </Switch>
      </div>

      






    </div>


    

  );


}
