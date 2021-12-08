import { useFormik } from "formik";



const formValidation = (values) =>
{

    console.log("Validation", values);


    if(values.Password != values.CPassword )
    {

        console.log("ad",values.Password);

    }


};

const registration = async (values) =>{


              console.log("Registering..",values);
             
              //key is not used while makin obj bcus both key and value name are same
              console.log(values);
                await  fetch("http://localhost:9000/users/Signup",{
                  method : "POST",
                  body: JSON.stringify({firstName  :values.FirstName,
                                        lastName   :values.LastName,
                                        password   :values.Password,
                                        access_lvl :values.AccessLevel,
                                        email       :values.Email,
                                       }),
                  headers :{
                      'Content-Type' : 'application/json'
                  }
              
                  }).then((response) =>console.log(response))
                  .catch( (e) => console.log(e));
                


};

export function AddUser() 
{

    const formik = useFormik ({

    initialValues : {FirstName:"", LastName:"", Email:"", Password:"", CPassword:"", AccessLevel:""},
    validate : formValidation,
    onSubmit : (values) =>{
                            console.log("OnSubmit",values);
                            registration(values);
                          }
    
    });

  return (

    <div className=" addUserForm container   text-center">
      <div className="my-3 pt-3">
        <i className="bi bi-person-circle text-success"></i>
        <h2 className=""> Add User</h2>
      </div>


      <form onSubmit={formik.handleSubmit} >

        <div className="form-group">
          <label>First Name :</label>
          <input 
                type="text"    
                value={formik.values.FirstName} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                name="FirstName"     
                placeholder="First Name" 
                required />
        </div>

        <br />

        <div className="form-group">
          <label>Last Name :</label>
          <input 
                type="text" 
                value={formik.values.LastName} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                name="LastName" 
                placeholder="Last Name" 
                required />
        </div>

        <br />
        <div className="form-group">
          <label>Email :</label>
          <input 
                type="Email" 
                value={formik.values.Email} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                name="Email" 
                placeholder="sample@gmail.com" 
                required />
        </div>

        <br />


        <div className="form-group">
          <label>Password :</label>
          <input 
                type="password" 
                value={formik.values.Password} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                name="Password" 
                placeholder="******" 
                required />
        </div>


        <br />


        <div className="form-group">
          <label> Confirm Password :</label>
          <input 
                type="password" 
                value={formik.values.CPassword} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                name="CPassword" 
                placeholder="******" 
                required />
        </div>


        <br />


        <div className="form-group">
          <select value={formik.values.AccessLevel} 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur} 
                  name="AccessLevel"
                  className="form-select" 
                  aria-label="Default select example" >
            <option defaultValue>Select Access Level</option>
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
