import { Link } from 'react-router-dom';
import { Open } from './App';

export function Dashboard() {

  const functions = ["<Leads/>", "<SystemRequest/>", ",Contacts/>"];

  return (

    <div className="dashboard-container">

      <nav>
        <div className="horizantal-nav bg-dark">
          <div className="logo">
            <img src="https://png.pngtree.com/element_pic/00/16/07/06577d261edb9ec.jpg" aria-label="LogoImage" />
          </div>
          <div className="user d-flex text-white">
            {/* <div className="Add-User" >
                <h1>Add User <i class="bi bi-person-plus-fill"></i> </h1>
            </div> */}
            <div className="Setting">
              <h1><i className="bi bi-gear-fill"></i></h1>
            </div>
            <div>


              <div className="btn-group  user-icon-box">
                <button className=" user-btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://www.w3schools.com/howto/img_avatar.png" aria-label="User-image" />
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Profile <i className="bi bi-person-circle text-success"></i></a></li>
                  <li><a className="dropdown-item" href="#">Log Out <i className="bi bi-box-arrow-right text-danger"></i></a></li>
                  <li><Link className="dropdown-item" to="/AddUser">Add User <i className="bi bi-person-plus-fill text-primary"></i></Link></li>

                </ul>
              </div>

            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        <div className="open-btn btn">
          <button className=" btn-primary btn" onClick={Open}><i className="bi bi-menu-button"></i></button>
        </div>
      </div>

    </div>

  );


}