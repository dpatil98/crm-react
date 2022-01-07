import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {Link ,useHistory  } from 'react-router-dom' ;
import * as yup from 'yup';
import { API_URL } from '../global-constants';





const formValidation =  yup.object({

                    email: yup.string().required("You Forgot To Write Email 🥺🥺"),
                    password: yup.string().required("You Forgot To Write Password 😱"),
});




export function LoginForm() {

  

  const [cookies, setCookie ,removeCookie] = useCookies();
  const history = useHistory();
  const [message,  setMessage] = useState(null);

 
  useEffect(()=>{ 
    
    alert(`For The Demo Purpose Email: sample@sample.com
  Password : password  |(for all users)`);
},[]);




  console.log("User Before Login",cookies.user);
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
  
      
      let re= await fetch(`${API_URL}/users/Login`,{
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

          if(re.token && re.user)
              {
                setCookie("user",re.user ,{maxAge: 3600}); //in sec //3600=1hr
                setCookie("token", re.token ,{maxAge: 3600});
                // localStorage.setItem("token", re.token);
                re=null; //re null bcus it was assigning user cookie even after logout
                history.push('/Dashboard/Leads');  
                console.log("Cookies",cookies.user);         
              }
          else{
                
              setMessage(`${re.message} 🤨`);
          }    
          
    };

   

  return (



    <div className="LoginFrom container   text-center">
      <div className="logo p-3">
            {/* <img src="https://png.pngtree.com/element_pic/00/16/07/06577d261edb9ec.jpg" aria-label="LogoImage" /> */}
            <img src="https://www.clipartmax.com/png/full/203-2037661_logo-sample-earth.png" aria-label="LogoImage" />
      </div>
      <h2 className="py-2">Login</h2>

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
