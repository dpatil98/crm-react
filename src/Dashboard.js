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
