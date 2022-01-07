import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as yup from 'yup';
import { API_URL } from "../global-constants";



// const formValidation = (values) =>
// {

//     console.log("Validation", values);


//     if(values.Password !== values.CPassword )
//     {

//         console.log("ad",values.Password);

//     }


// };


const formValidation =  yup.object({

  FirstName: yup.string().required("You Forgot To Write First Name😱"),
  LastName: yup.string().required("You Forgot To Write Last Name😱"),
  Email: yup.string().required("You Forgot To Write Email 🥺🥺"),
  Password : yup.string().required("You Forgot To put Password🥺")
            .min(8,"Minimum length Should Be 8 😤")
            .max(20,"Maximum length is 20 😅"),

  CPassword: yup.string().required("You Forgot To Confirm your Password🥺")
            .min(8,"Minimum length Should Be 8 😤")
            .max(20,"Maximum length is 20 😅")
            .oneOf([yup.ref('Password'), null], 'Passwords must match'),
  AccessLevel : yup.string().required("You Forgot To Give Access Level😱")
                            .max(9,"You Forgot To Give Access Level😱")
});


 
export function AddUser() 
{

      const history = useHistory();
      const [message ,setMessage] = useState([]);
      const [cookie ,setCookie ] = useCookies();

      
      if(!cookie.token || !cookie.user)
    {
      history.push("/");
    }


    const {handleSubmit , handleChange , handleBlur, values, errors, touched} = useFormik ({

    initialValues : {FirstName:"", LastName:"", Email:"", Password:"", CPassword:"", AccessLevel:""},
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
              const result=  await  fetch(`${API_URL}/users/Signup`,{
                  method : "POST",
                  body: JSON.stringify({firstName  :values.FirstName,
                                        lastName   :values.LastName,
                                        password   :values.Password,
                                        access_lvl :values.AccessLevel,
                                        email       :values.Email,
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
        <i className="bi bi-person-circle text-success"></i>
        <h2 className=""> Add User</h2>
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
          <label>Password :</label>
          <input 
                type="password" 
                value={values.Password} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="Password" 
                autoComplete="new-password"
                placeholder="******" 
                required />
        </div>
      
        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.Password && touched.Password && errors.Password }
            </div>
        </div>

        <div className="form-group mt-4">
          <label> Confirm Password :</label>
          <input 
                type="password" 
                value={values.CPassword} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="CPassword" 
                autoComplete="new-password"
                placeholder="******" 
                required />
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                { errors.CPassword && touched.CPassword&& errors.CPassword }
            </div>
        </div>

       


        <div className="form-group mt-4 ">
          <select value={values.AccessLevel} 
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  name="AccessLevel"
                  className="form-select" 
                  aria-label="Default select example" >
            <option defaultValue>Select Access Level</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.AccessLevel && touched.AccessLevel && errors.AccessLevel}
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
