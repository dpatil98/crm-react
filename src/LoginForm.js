import { useFormik } from 'formik';
import {Link } from 'react-router-dom' ;



const validateform = (values) => {

console.log("Validation Form ", values);


};


export function LoginForm() {

  const formik = useFormik({

      initialValues: {email:"" ,password:""},
      validate : validateform ,
      onSubmit : (values) =>{console.log("OnSubmit",values);}

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
