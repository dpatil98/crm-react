import { useFormik } from 'formik';
import { createContext, useContext, useState } from 'react';
import {Link ,useHistory  } from 'react-router-dom' ;
import * as yup from 'yup';


const formValidation =  yup.object({

                    email: yup.string().required("You Forgot To Write Email 🥺🥺"),
                    password: yup.string().required("You Forgot To Write Password 😱"),
});

// const validateform = (values) => {

// console.log("Validation Form ", values);


// };


export function LoginForm() {

  const history = useHistory();
  const [message,  setMessage] = useState(null);

  const {handleSubmit , handleChange , handleBlur, values, errors, touched}= useFormik({

      initialValues: {email:"" ,password:""},
      // validate : validateform ,
      validationSchema : formValidation,
      onSubmit : (values) =>{
                            console.log("OnSubmit",values)
                            Login(values);
                           }

  });
   

    const Login = async (values) =>{

      console.log("Logging In",values);
      // var data={};
      //key is not used while makin obj bcus both key and value name are same
      
      const re= await fetch("http://localhost:9000/users/Login",{
          method : "POST",
          body: JSON.stringify({
                                password   :values.password,                          
                                email       :values.email,
                              }),
          headers :{
              'Content-Type' : 'application/json'
          }
      
          }).then((response) => response.json())
          .catch( (e) => console.log(e));
                  
          console.log("re",re.token);

          if(re.token)
              {
                localStorage.setItem("token", re.token);
                history.push('/Dashboard');            
              }
          else{
                
              setMessage(`${re.message} 🤨`);
          }    
          
    };



  return (



    <div className="LoginFrom container   text-center">
      <h2 className="my-5 pt-5">Login</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Username :</label>
          <input  id="email"
                  type="email" 
                  value={values.email} 
                  onChange={handleChange} 
                  onBlur={handleBlur}                 
                  name="email" 
                  placeholder="Username" 
                  
          />
          
        </div>
        <div className="text-danger mt-2">
            <div >
                {errors.email && touched.email && errors.email}
            </div>
        </div>
        <br />
        <br />

        <div className="form-group">
          <label>Password :</label>
          <input 
            id="password"
            type="password"
            value={values.password} 
            onChange={handleChange} 
            onBlur={handleBlur}
            name="password"
            placeholder="******"
            />
        </div>
        <div className="text-danger mt-2">
            <div >
                {errors.password && touched.password && errors.password} 
            </div>
        </div>
        <br />
        <input className=" btn mb-4 px-4 log-btn "  type="submit" name="submit" value="Log In" />

        <br />
        
        <Link to="/ForgotPassword">Forgot Password ?</Link>
        {/* <a href=""> Sign Up </a> */}
        <div className="text-danger mt-2">
            <div >
                {message}
            </div>
        </div>
        
      </form>

    </div>





  );

}
