import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as yup from 'yup';


const formValidation =  yup.object({

  FirstName: yup.string().required("You Forgot To Write First Name😱"),
  LastName: yup.string().required("You Forgot To Write Last Name😱"),
  Email: yup.string().required("You Forgot To Write Email 🥺🥺"),
  Access_lvl: yup.string().required("Wait we havnt assigned a employee 😱"),
});


export function AllUsers() {
  const [cookie ,setCookie ] = useCookies();
  const history = useHistory (); 

  if(!cookie.token || !cookie.user)
  {
    history.push("/");
    
  }
  console.log("Acc_lvl",cookie.user.access_lvl)
  if( (cookie.user.access_lvl !== ("Manager") && (cookie.user.access_lvl !== ("Admin" ) ) ) )
  {
    history.push("/Dashboard/Leads");
  }

  const [alllUsersData, setalllUsersData] = useState([0]);
  const [isEdit, setIsEdit] = useState(null);
  const [currentValues, setCurrentValues] = useState();
  const [searchResult, setSearchResult] = useState();
  const [message ,setMessage] = useState([]);

  const usersName = `${cookie.user.firstName} ${cookie.user.lastName}` ;


  // console.log("User is :", usersName);
  // console.log("SearchResult", searchResult);
  // console.log("alllUsersData", alllUsersData);

  
  const {handleSubmit , handleChange , handleBlur, values, errors, touched} = useFormik ({

   
    initialValues : {ID:"", FirstName:"", LastName:"", Email:"", Access_lvl:"", SearchUser:null},
  
    validationSchema: formValidation, 
    onSubmit : (values) =>{
                            console.log("OnSubmit",values);
                            UpdatingUser(values);
                            
                          }
    
    });

    //useEfeect for gettig all users only once
  useEffect( async ()=>{ 

      console.log("Getting Users");
      await fetch("http://localhost:9000/Dashboard/AllUsers",{
      method : "GET"  
      }).then((response) => response.json())
        .then(data => setalllUsersData(data))
        .catch( (e) => console.log(e));
      
      // if(re.Status==="404")
      // {
      // history.push('/**');
      // }
      // else{
      // //  setData(re.User.email)
      //   values.Email=re.User.email;
      //   console.log("Link Is Valid",re);
      //   console.log("Email Is ",values.Email);
      // }
    
  },[]);

  //useEffectfor setting default values to formik
  useEffect(()=>{ 
    
    if(currentValues) 
    {
    values.ID=currentValues._id;
    values.FirstName=currentValues.firstName;
    values.LastName=currentValues.lastName;
    values.Email=currentValues.email;
    values.Access_lvl=currentValues.access_lvl; 
    console.log("From Effect",values);
    }
},[currentValues]);

const DeleteThisUser = async (deletingThisUser) =>{


  console.log("Deleting... ",deletingThisUser);

  const result=  await  fetch("http://localhost:9000/Dashboard/DeleteUser",{
      method : "POST",
      body: JSON.stringify({
                            id  :deletingThisUser._id,
                           }),
      headers :{
          'x-auth-token' : `${cookie.token}`,
          'x-auth-mode' : 'addLead',
          'Content-Type' : 'application/json'
      }
  
      }).then(respone => respone.json() )
      .catch( (e) => console.log(e));
    

      
      console.log(result.message);
      console.log(result.status);
      if(result.status==="200"){ window.location.reload(); alert("success") }

      setMessage(`${result.message} 🤨`);

};

const UpdatingUser = async (values) =>{


  console.log("Updating... ",values);
 
  console.log(values);
  const result=  await  fetch("http://localhost:9000/Dashboard/EditUser",{
      method : "POST",
      body: JSON.stringify({
                            id          :values.ID,
                            firstName   :values.FirstName,
                            lastName    :values.LastName,
                            access_lvl  :values.Access_lvl,         
                            email       :values.Email,                     
                           }),
      headers :{
          'x-auth-token' : `${cookie.token}`,
          'x-auth-mode' : 'addLead',
          'Content-Type' : 'application/json'
      }
  
      }).then(respone => respone.json() )
      .catch( (e) => console.log(e));
    

      
      console.log(result.message);
      console.log(result.status);
      if(result.status==="200"){ window.location.reload(); alert("success") }

      setMessage(`${result.message} 🤨`);

};

const handleSearch = async () =>{

  console.log("Searching.. ",values.SearchUser);
 
  if(values.SearchUser)
  {

      const result=  await  fetch("http://localhost:9000/Dashboard/SearchUsers",{
          method : "POST",
          body: JSON.stringify({
                                searchThisUser:values.SearchUser
                              }),
          headers :{
              'x-auth-token' : `${cookie.token}`,
              'x-auth-mode' : 'addLead',
              'Content-Type' : 'application/json'
          }
      
          }).then(respone => respone.json() )
          .catch( (e) => console.log(e));
        

          if(result)
          {
            console.log(result.message);
            console.log(result.result);
            if(result.result) {
                setSearchResult(result.result)
              
            }else{
              
              setSearchResult();
              alert("Result Not Found");
            };
          }
          
          // console.log(result.status);
          // if(result.status==="200"){ window.location.reload(); }

          setMessage(`${result.message} 🤨`);
    }
}

  return (

    <div className="leads-container container">
      <div className="head-container">

        <div className="Content-heading">
          <h3>Users</h3>
        </div>
        <div className="leads-utilities d-flex justify-content-between">
          <div className="search-box">
           <form><input onChange={handleChange} name="SearchUser" type="text" aria-label="UserSearch" placeholder="Search Users"   /><i onClick={handleSearch} type="submit" className="bi bi-search"></i></form> 
          </div>
          <div className="add-user">
            <Link to="/Dashboard/AddUser"><button className="btn btn-primary"> <i className="bi bi-plus-square"></i>Add User</button></Link>
          </div>
        </div>


      </div>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>             
              <th scope="col">Email</th>
              <th scope="col">Access Level</th>
              <th scope="col">Action</th>
            </tr>
            
          </thead>
          
          <tbody className="leads-tableBody">

            
            {/* //after Seaching.. search result will be displayed 
            //if search result is not found Users will be displayed */}
            {(!searchResult) ?  alllUsersData.map((UserData ,key)=> 
            { 
              let showEdit="none";
              //only selfAddedUserData or Admin or manager can edit a UserData
              (UserData.access_lvl===usersName || cookie.user.access_lvl==="Admin"|| cookie.user.access_lvl==="Manager") ? showEdit="auto" :showEdit="none";
              //edit is state with defaultValue null
              //when someone clicks edit button we pass uniquekey to edit(nameOfState) state
              if(isEdit!==key)
              {
                return (   
                  <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td >{UserData.firstName} {UserData.lastName} </td>
                    <td >{UserData.email}</td>
                    <td >{UserData.access_lvl}</td>            
                    <td ><button style={{pointerEvents:showEdit}} onClick={()=>{setIsEdit(key)}} className="btn bg-primary mx-1 text-white"><i class="bi bi-pencil-square"></i></button> 
                         {/* <button style={{pointerEvents:showEdit}} onClick={()=>DeleteThisUserData(UserData)} className="btn bg-danger text-white"><i class="bi bi-trash"></i></button></td> */}
                         <button style={{pointerEvents:showEdit}} onClick={ () =>{

                                                                        const confirmBox = window.confirm(
                                                                              "Do you really want to delete this Crumb?"
                                                                            )
                                                                            if (confirmBox === true) {
                                                                             DeleteThisUser(UserData)
                                                                            } 
                                                }

                         } className="btn bg-danger mx-1 text-white"><i class="bi bi-trash"></i></button></td>
                         
                  </tr>
                 )
              } 
              ////////////////////////////////////////////////
              else{
                //to call useEffect and Updating Formik initial values
                {if(currentValues!=UserData){setCurrentValues(UserData)}}
                return(
                  
                  <tr key={key} >
                    <th scope="row">{key+1}</th> 
                    
                    <td >
                       
                       <input 
                       type="text"    
                       defaultValue={[UserData.firstName]}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       name="FirstName"     
                       placeholder="First Name" 
                       required />

                       <input 
                       type="text" 
                       defaultValue={UserData.lastName} 
                       onChange={handleChange} 
                       onBlur={handleBlur}
                       name="LastName" 
                       placeholder="Last Name" 
                       required />
                       
                   </td>

                   <td >
                       <input 
                           type="Email" 
                           defaultValue={UserData.email} 
                           onChange={handleChange} 
                           onBlur={handleBlur}
                           name="Email" 
                           placeholder="sample@gmail.com" 
                           required />                
                   </td>
                   <td >
                     <select 
                           defaultValue={UserData.access_lvl} 
                           onChange={handleChange} 
                           onBlur={handleBlur} 
                           name="Access_lvl"
                           className="form-select" 
                           aria-label="Default select example" >
                     <option defaultValue>-- Select Status --</option>
                     <option value="Admin">Admin</option>
                     <option value="Manager">Manager</option>
                     <option value="Employee">Employee</option>
                     
           
                   </select>
                   </td>
                    <td ><button onClick={()=>setIsEdit(null)} className="btn bg-danger mx-1 text-white"><i class="bi bi-x-lg"></i></button>
                    <button onClick={handleSubmit} type="button" className="btn bg-success  mx-1 text-white"><i class="bi bi-save"></i></button> 
                    </td>
                  
                   </tr >
                 
                )
              }
            
            
            } )  
            
            
            
            :  
            
            
            searchResult.map((UserData ,key)=> 
            { 
              let showEdit="none";
              //only selfAddedUserData or Admin or manager can edit a UserData
              (UserData.access_lvl===usersName || cookie.user.access_lvl==="Admin"|| cookie.user.access_lvl==="Manager") ? showEdit="auto" :showEdit="none";
              //edit is state with defaultValue null
              //when someone clicks edit button we pass uniquekey to edit(nameOfState) state
              if(isEdit!==key)
              {
                return (   
                  <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td >{UserData.firstName} {UserData.lastName} </td>
                    <td >{UserData.status}</td>
                    <td >{UserData.email}</td>
                    <td >{UserData.access_lvl}</td>
                    <td >{UserData.date}</td>
                    <td ><button style={{pointerEvents:showEdit}} onClick={()=>{setIsEdit(key)}} className="btn bg-primary mx-1 text-white"><i class="bi bi-pencil-square"></i></button> 
                         {/* <button style={{pointerEvents:showEdit}} onClick={()=>DeleteThisUserData(UserData)} className="btn bg-danger text-white">Delete</button></td> */}
                         <button style={{pointerEvents:showEdit}} onClick={ () =>{

                                                                        const confirmBox = window.confirm(
                                                                              "Do you really want to delete this Crumb?"
                                                                            )
                                                                            if (confirmBox === true) {
                                                                             DeleteThisUser(UserData)
                                                                            } 
                                                }

                         } className="btn bg-danger  mx-1 text-white"><i class="bi bi-trash"></i></button></td>
                         
                  </tr>
                 )
              } 
              ////////////////////////////////////////////////
              else{
                //to call useEffect and Updating Formik initial values
                {if(currentValues!=UserData){setCurrentValues(UserData)}}
                return(
                  
                  <tr key={key} >
                    <th scope="row">{key+1}</th> 
                    
                    <td >
                       
                        <input 
                        type="text"    
                        defaultValue={[UserData.firstName]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="FirstName"     
                        placeholder="First Name" 
                        required />

                        <input 
                        type="text" 
                        defaultValue={UserData.lastName} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="LastName" 
                        placeholder="Last Name" 
                        required />
                        
                    </td>

                    <td >
                        <input 
                            type="Email" 
                            defaultValue={UserData.email} 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            name="Email" 
                            placeholder="sample@gmail.com" 
                            required />                
                    </td>
                    <td >
                      <select 
                            defaultValue={UserData.access_lvl} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            name="Access_lvl"
                            className="form-select" 
                            aria-label="Default select example" >
                      <option defaultValue>-- Select Status --</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                      
            
                    </select>
                    </td>
                    
                    <td ><button onClick={()=>setIsEdit(null)} className="btn bg-danger mx-1 text-white"><i class="bi bi-x-lg"></i></button>
                    <button onClick={handleSubmit} type="button" className="btn bg-success mx-1 text-white"><i class="bi bi-save"></i></button> 
                    </td>
                  
                   </tr >
                 
                )
              }
            
            
            } )
            
            
            
            
            }



          </tbody>
        </table>
      </div>
    </div>

  );

}
