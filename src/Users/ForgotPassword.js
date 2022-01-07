import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import * as yup from'yup';
import { API_URL } from '../global-constants';


const formValidation =  yup.object({

    email: yup.string().required("You Forgot To Write Email 🥺").min(5,"Need a Email 🙄")
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i , "Please Check Your Email 😅")
});


export function ForgotPassword() {

    const [message,  setMessage] = useState(null);
    const [link,  setLink] = useState();
    const [linkMsg,  setLinkMsg] = useState();

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: { email: "" },
    // validate : validateform ,
    validationSchema : formValidation,
    onSubmit: (values) => {
    console.log("OnSubmit", values);
        CheckEmail(values);
    }
  });


    const CheckEmail = async (values) =>
    {
        const re= await fetch(`${API_URL}/users/ForgotPassword`,{
            method : "POST",
            body: JSON.stringify({                        
                                  email:values.email,
                                }),
            headers :{
                'Content-Type' : 'application/json'
            }
        
            }).then((response) => response.json())
            .catch( (e) => console.log(e));
                    
            console.log("re",re.Status);
            if(!re.link)
            {
              setMessage(`${re.message} 🤨`);
            }
            else{
              setLink(re.link);
              setLinkMsg(re.message);
            }
            
            // if(re.Status || re.message)
            //     {
            //     //   localStorage.setItem("token", re.token);
            //     //   history.push('/Dashboard');   
            //     setMessage(re.message);     
            //     }
            // else{
                  
            //     setMessage(`${re.message} 🤨`);
            // }


    }

  return (


    <div className="fotgotpass-container container  text-center">
      <h2 className="my-5 pt-5">Forgot Password ?</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Email:</label>
          <input id="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            placeholder="Username" />

        </div>
        <div className="text-danger mt-3 px-5 position-absolute">
          <div>
            {errors.email && touched.email && errors.email}{message}
          </div>
        </div>

        <br />
        <br />

        <input className=" btn mb-4 px-4 log-btn " type="submit" name="submit" value="Submit" />

        <br />

        <div className="text-danger mt-2">
          <div>
            
          </div>
        </div>

      </form>
      { (link) ? <Alert variant={'warning'}>
                     {linkMsg } <Alert.Link className='text-primary' href={link}>Click Here</Alert.Link>
                  </Alert> 
               
               : null }
      
    </div>

  );



}


const ResetPasswordConfirmation =  yup.object({

  Password : yup.string().required("You Forgot To put Password🥺")
            .min(8,"Minimum length Should Be 8 😤")
            .max(20,"Maximum length is 20 😅"),

  CPassword: yup.string().required("You Forgot To Confirm your Password🥺")
            .min(8,"Minimum length Should Be 8 😤")
            .max(20,"Maximum length is 20 😅")
            .oneOf([yup.ref('Password'), null], 'Passwords must match')
});


//after clicking the link
export function ResetPassword() {

  const history = useHistory();
  const [message,  setMessage] = useState(null);
  // const [data,  setData] = useState(null);
  const idAndToeken = useLocation().search;
      const id = new URLSearchParams(idAndToeken).get('id');
      const FT = new URLSearchParams(idAndToeken).get('FT');//FT ->forgetPassword's token
 
 
      const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: { Password: "" , CPassword:"" ,Email:""},
        validationSchema :  ResetPasswordConfirmation,
        onSubmit: (values ) => {
          console.log("OnSubmit");  
          PasswordReseting(values);
        }
      
        
      });

  useEffect( async ()=>{ 

    const re= await fetch(`${API_URL}/users/reset-password`,{
      method : "POST",
      body: JSON.stringify({                        
                            id:id,
                            FT:FT
                          }),
      headers :{
          'Content-Type' : 'application/json'
      }
  
      }).then((response) => response.json())
      .catch( (e) => console.log(e));
      
      if(re.Status==="404")
      {
      history.push('/**');
      }
      else{
      //  setData(re.User.email)
        values.Email=re.User.email;
        console.log("Link Is Valid",re);
        console.log("Email Is ",values.Email);
      }
    
  },[]);


  // -----------------------
async function PasswordReseting(values)
{
    console.log('Sending to update pass ',values);

    const result= await fetch(`${API_URL}/users/changing-password`,{
      method : "POST",
      body: JSON.stringify({                        
                            password:values.Password,
                            email : values.Email
                          }),
      headers :{
          'Content-Type' : 'application/json'
      }
  
      }).then(res => res.json())
      .catch( (e) => console.log(e));
     
      
     if( result.status==="200")
     {
       alert("Password Changed Successfully!");
       history.push("/");
     }
     else{
        setMessage(result.message);
     }
}



return (

  <div className="resetpass-container container  text-center">
    <h2 className="my-5 pt-5">Forgot Password ?</h2>

    <form onSubmit={handleSubmit}>

      
      <div className="form-group ">
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


        <br/>

        <div className="form-group ">
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
              {errors.CPassword && touched.CPassword && errors.CPassword }
          </div>
      </div>
      <br />
      <br />

      <input className=" btn mb-4 px-4 log-btn " type="submit" name="submit" value="Submit" />

      <br />

      <div className="text-danger mt-2">
        <div>
          {message}
        </div>
      </div>

    </form>

  </div>

);



}

