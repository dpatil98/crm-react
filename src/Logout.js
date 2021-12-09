import { useHistory } from "react-router-dom";



export function Logout ()
{
    const history =useHistory();

    
    localStorage.clear();
    history.push("/");
 
    return null;
}