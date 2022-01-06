import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import './CssFiles/sidebar.css';
// import { close } from '../App;'


export function Sidebar() {

  const [cookie ,setCookie ] = useCookies();
  const displayUserOption={display:'none'};


  ( cookie.user.access_lvl===  "Admin" || cookie.user.access_lvl=== "Manager"  ) ?  displayUserOption.display='block': displayUserOption.display='none';
    // 
  return (
    <div className=" sidebar bg-dark">
      {/* <nav>
        <div className='mx-1 text-white'><i text-white class="bi bi-list"></i></div>
        <hr className="text-white mt-0" />
        <Link to="/Dashboard/Leads"><i class="bi bi-person-lines-fill"></i></Link>
        <Link to="/Dashboard/ServiceRequest"><i class="bi bi-journal-text"></i></Link>
        <Link to="/Dashboard/Contacts"><i class="bi bi-person-square"></i></Link>
        <Link style={displayUserOption} to="/Dashboard/AllUsers"><i class="bi bi-people-fill"></i></Link>
      </nav> */}


<nav class="navbar-expand-lg  px-3 bg-dark ">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className=""><i class="bi bi-list text-white"></i></span>
  </button>

  <div className="collapse  navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav  d-flex flex-column">
     
      <Link className='nav-item active' to="/Dashboard/Leads" ><i class="bi bi-person-lines-fill"></i></Link> 
      
      
      <Link  className='nav-item ' to="/Dashboard/ServiceRequest"><i class="bi bi-journal-text"></i></Link>
      
      
      <Link  className='nav-item ' to="/Dashboard/Contacts"><i class="bi bi-person-square"></i></Link> 
      
      
      <Link  className='nav-item ' style={displayUserOption} to="/Dashboard/AllUsers"><i class="bi bi-people-fill"></i></Link>
      
      
    </ul>
  </div>
</nav>

    </div>

  );

}
