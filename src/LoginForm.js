import { useFormik } from 'formik';
import {Link } from 'react-router-dom' ;



const validateform = (values) => {

console.log("Validation Form ", values);


};


const Login = async (values) =>{


  console.log("Logging In",values);
 
  //key is not used while makin obj bcus both key and value name are same
  console.log(values);
    await  fetch("http://localhost:9000/users/Login",{
      method : "POST",
      body: JSON.stringify({
                            password   :values.password,                          
                            email       :values.email,
                           }),
      headers :{
          'Content-Type' : 'application/json'
      }
  
      }).then((response) => response.json())
      .then((data) => console.log(data))
      .catch( (e) => console.log(e));
    


};


export function LoginForm() {

  const formik = useFormik({

      initialValues: {email:"" ,password:""},
      validate : validateform ,
      onSubmit : (values) =>{
                            console.log("OnSubmit",values)
                            Login(values);
                           }

  });


  return (



    <div className="LoginFrom container   text-center">
      <h2 className="my-5 pt-5">Login</h2>

      <form onSubmit={formik.handleSubmit}>

        <div className="form-group">
          <label>Username :</label>
          <input  id="email"
                  type="email" 
                  value={formik.values.email} 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}                 
                  name="email" 
                  placeholder="Username" 
          />
    </div>

        <br />
        <br />

        <div className="form-group">
          <label>Password :</label>
          <input 
            id="password"
            type="password"
            value={formik.values.password} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            name="password"
            placeholder="******"
            />
        </div>
        <div className="text-danger">

        </div>
        <br />
        <input className=" btn mb-4 px-4 log-btn "  type="submit" name="submit" value="Log In" />

        <br />
        
        <Link to="/ForgotPassword">Forgot Password ?</Link>
        {/* <a href=""> Sign Up </a> */}

        
      </form>

    </div>





  );

}
