import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import * as yup from 'yup';



const formValidation =  yup.object({

  FirstName: yup.string().required("You Forgot To Write First Name😱"),
  LastName: yup.string().required("You Forgot To Write Last Name😱"),
  Email: yup.string().required("You Forgot To Write Email 🥺🥺"),
  AssignedEmp: yup.string().required("Wait we havnt assigned a employee 😱"),
  Status : yup.string().required("You Forgot To Give Access Level😱")
                            .max(9,"You Forgot To Add Status😱")
});


 
export function AddLead() 
{

      const history = useHistory();
      const [message ,setMessage] = useState([]);
      const [cookie ,setCookie ] = useCookies();

      
      if(!cookie.token || !cookie.user)
    {
      history.push("/");
    }


    const {handleSubmit , handleChange , handleBlur, values, errors, touched} = useFormik ({

    initialValues : {FirstName:"", LastName:"", Email:"", AssignedEmp:`${cookie.user.firstName} ${cookie.user.lastName}`, Status:"" },
    // validate : formValidation,
    validationSchema: formValidation,
    onSubmit : (values) =>{
                            console.log("OnSubmit",values);
                            registration(values);
                            
                          }
    
    });

    


const registration = async (values) =>{


              console.log("Registering..",values);
             
              //key is not used while makin obj bcus both key and value name are same
              console.log(values);
              const result=  await  fetch("http://localhost:9000/Dashboard/AddLead",{
                  method : "POST",
                  body: JSON.stringify({firstName   :values.FirstName,
                                        lastName    :values.LastName,
                                        assignedEmp :values.AssignedEmp,
                                        status      :values.Status,
                                        email       :values.Email,
                                       }),
                  headers :{
                      'x-auth-token' : `${cookie.token}`,
                      'Content-Type' : 'application/json'
                  }
              
                  }).then(respone => respone.json() )
                  .catch( (e) => console.log(e));
                
        
                  
                  console.log(result.message);
                  console.log(result.status);
                  if(result.status==="200"){ window.location.reload(); alert("success") }

                  setMessage(`${result.message} 🤨`);

};

       
        


  return (

    <div className=" addUserForm container   text-center">
      <div className="my-3 pt-3">
        <i className="bi bi-person-circle text-success"></i>
        <h2 className=""> Add Lead</h2>
      </div>


      <form onSubmit={handleSubmit} >

        <div className="form-group mt-4">
          <label>First Name :</label>
          <input 
                type="text"    
                value={values.FirstName} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="FirstName"     
                placeholder="First Name" 
                required />
        </div>
        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.FirstName && touched.FirstName && errors.FirstName}
            </div>
        </div>

        <div className="form-group mt-4">
          <label>Last Name :</label>
          <input 
                type="text" 
                value={values.LastName} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="LastName" 
                placeholder="Last Name" 
                required />
        </div>
        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.LastName && touched.LastName && errors.LastName }
            </div>
        </div>
        
        <div className="form-group mt-4">
          <label>Email :</label>
          <input 
                type="Email" 
                value={values.Email} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="Email" 
                placeholder="sample@gmail.com" 
                required />
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                { errors.Email && touched.Email && errors.Email }
            </div>
        </div>

        <div className="form-group mt-4">
          <label>Assigned Emp :</label>
          <input 
                type="text" 
                value={values.AssignedEmp} 
                // onChange={handleChange} 
                // onBlur={handleBlur}
                name="AssignedEmp"          
                placeholder="******" 
                required />
        </div>
      
        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.Password && touched.Password && errors.Password }
            </div>
        </div>

        {/* <div className="form-group mt-4">
          <label> Status</label>
          <input 
                type="text" 
                value={values.CPassword} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="Status"            
                placeholder="Status" 
                required />
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                { errors.CPassword && touched.CPassword&& errors.CPassword }
            </div>
        </div> */}

       


        <div className="form-group mt-4 ">
          <select value={values.Status} 
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  name="Status"
                  className="form-select" 
                  aria-label="Default select example" >
            <option defaultValue>-- Select Status --   </option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Canceled">Cancel</option>
            
          </select>
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.Status&& touched.Status&& errors.Status}
            </div>
        </div>
       <div className="text-warning mt-4 text-center ">
                {message} 
        </div>
        <input className=" btn mt-3 px-4 log-btn " type="submit" name="submit" value="Add User" />
    
        



      </form>

    </div>


  );

}
