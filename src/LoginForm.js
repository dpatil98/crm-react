import {Link } from 'react-router-dom' ;


export function LoginForm() {



  return (



    <div className="LoginFrom container   text-center">
      <h2 className="my-5 pt-5">Login</h2>
      {/* <form >
                <div>
                  <label>Username</label>
                  <input type="text" name="login-username" />
                </div>
                <div>
                  <label>Password</label>
                  <input type="password" name="login-password" />
                </div>
                         
                <button>Log In</button>
            </form> */}


      <form method="post">

        <div className="form-group">
          <label>Username :</label>
          <input type="gmail" name="Email" placeholder="Username" required="gmail" />
        </div>

        <br />
        <br />

        <div className="form-group">
          <label>Password :</label>
          <input type="password" name="Password" placeholder="******" required="password" />
        </div>
        <div className="text-danger">

        </div>
        <br />
        <input className=" btn mb-4 px-4 log-btn " type="submit" name="submit" value="Log In" />

        <br />

        <Link to="/ForgotPassword">Forgot Password ?</Link>
        {/* <a href=""> Sign Up </a> */}

        
      </form>

    </div>





  );

}
