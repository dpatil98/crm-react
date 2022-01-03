import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { close } from '../App';


export function Sidebar() {

  const [cookie ,setCookie ] = useCookies();
  const displayUserOption={display:'none'};


  ( cookie.user.access_lvl===  "Admin" || cookie.user.access_lvl=== "Manager"  ) ?  displayUserOption.display='block': displayUserOption.display='none';
    
  return (
    <div className="sidebar bg-dark">
      <nav>
        <button className="btn bg-dark text-white" onClick={close}>Close <i className="bi text-danger bi-x-square-fill"></i></button>
        <hr className="text-white mt-0" />
        <Link to="/Dashboard/Leads">Leads</Link>
        <Link to="/Dashboard/ServiceRequest">Servive Request</Link>
        <Link to="/Dashboard/Contacts">Contacts</Link>
        
        <Link style={displayUserOption} to="/Dashboard/AllUsers">Users</Link>
      </nav>
    </div>

  );

}
