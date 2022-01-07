import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as yup from 'yup';
import { API_URL } from "../global-constants";

const formValidation =  yup.object({

  FirstName: yup.string().required("You Forgot To Write First Name😱").max(20,"maximum 20 characters allowed😱"),
  LastName: yup.string().required("You Forgot To Write Last Name😱").max(20,"maximum 20 characters allowed😱"),
  Email: yup.string().required("You Forgot To Write Email 🥺🥺").max(20,"maximum 20 characters allowed😱"),
  AddedBy: yup.string().required("AddedBy field is mandatory😱").max(20,"maximum 20 characters allowed😱"),
  MobileNo: yup.string().required("You Forgot To Add Mobile Number😱").max(12,"maximum 12 digits allowed😱"),
  Address : yup.string().required("You Forgot Add Address 😱")
                            .max(50,"maximum 50 characters allowed😱")
});


 
export function AddContact() 
{

      const history = useHistory();
      const [message ,setMessage] = useState([]);
      const [cookie ,setCookie ] = useCookies();

      const userId = cookie.user._id;
      const usersName =`${cookie.user.firstName} ${cookie.user.lastName}`;
    //   console.log("User Id",userId)
    // console.log("User Name",usersName)

    //checks if user is logged in or not
      if(!cookie.token || !cookie.user)
    {
      history.push("/");
    }


    const {handleSubmit , handleChange , handleBlur, values, errors, touched} = useFormik ({

    initialValues : {FirstName:"", LastName:"", Email:"", AddedBy:usersName, MobileNo:"" , Address:"" , AddedById:userId},
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
              const result=  await  fetch(`${API_URL}/Dashboard/AddContact`,{
                  method : "POST",
                  body: JSON.stringify({firstName  :values.FirstName,
                                        lastName   :values.LastName,
                                        addedBy  :values.AddedBy,
                                        addedById  :values.AddedById,
                                        address :values.Address,
                                        email       :values.Email,
                                        mobileNo :values.MobileNo,
                                       }),
                  headers :{
                      'x-auth-token' : `${cookie.token}`,
                      'x-auth-access' : `${cookie.user.access_lvl}`,
                      'x-auth-mode' : 'addUser',
                      'Content-Type' : 'application/json'
                  }
              
                  }).then(respone => respone.json() )
                  .catch( (e) => console.log(e));
                
        
                  
                  console.log(result.message);
                  console.log(result.status);
                  if(result.status==="200"){ window.location.reload(); alert("sucess") }

                  setMessage(`${result.message} 🤨`);

};

       
        


  return (

    <div className=" addUserForm container   text-center">
      <div className="my-3 pt-3">
        <i className="bi bi-person-circle text-primary"></i>
        <h2 className=""> Add Contact</h2>
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
          <label>Mobile No :</label>
          <input 
                type="text" 
                value={values.MobileNo} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="MobileNo" 
                placeholder="Enter Mobile Number" 
                required />
        </div>
      
        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.MobileNo && touched.MobileNo && errors.MobileNo }
            </div>
        </div>

        <div className="form-group mt-4">
          <label> Address :</label>
          <input 
                type="text" 
                value={values.Address} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="Address" 
                placeholder="Please Provide Address" 
                required />
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                { errors.Address && touched.Address && errors.Address }
            </div>
        </div>

        <div className="form-group mt-4">
          <label> AddedBy :</label>
          <input 
                type="text" 
                value={values.AddedBy} 
                // onChange={handleChange} 
                // onBlur={handleBlur}
                name="AddedBy" 
                placeholder="Employee Name" 
                required />
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                { errors.AddedBy && touched.AddedBy && errors.AddedBy }
            </div>
        </div>

       <div className="text-warning mt-4 text-center ">
                {message} 
        </div>
        <input className=" btn mt-3 px-4 log-btn " type="submit" name="submit" value="Add Contact" />
    
        



      </form>

    </div>


  );

}
