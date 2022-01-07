import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { API_URL } from "../global-constants";


const formValidation =  yup.object({

  FirstName: yup.string().required("You Forgot To Write First Name😱"),
  LastName: yup.string().required("You Forgot To Write Last Name😱"),
  Email: yup.string().required("You Forgot To Write Email 🥺🥺"),
  AssignedEmp: yup.string().required("Wait we havnt assigned a employee 😱"),
  Status : yup.string().required("You Forgot To Add Status😱")
                            .max(13,"You Forgot To Add Status😱"), 
  // ShortDesc: yup.string().required("Description is empty"), //add ShortDesc to formik after removing comment                              
  Date: yup.date().required("Please Enter Valid date")
});


export function ServiceRequest() {
  const [cookie ,setCookie ] = useCookies();


  const [customers, setCustomers] = useState([0]);
  const [isEdit, setIsEdit] = useState(null);
  const [currentValues, setCurrentValues] = useState();
  const [searchResult, setSearchResult] = useState();
  const [message ,setMessage] = useState([]);

  const usersName = `${cookie.user.firstName} ${cookie.user.lastName}` ;
  // console.log("User is :", usersName);

  const {handleSubmit , handleChange , handleBlur, values, errors, touched} = useFormik ({

   
    initialValues : {ID:"", FirstName:"", LastName:"", Email:"", AssignedEmp:"", Status:"", Date:"" , SearchServiceReq:null},
  
    validationSchema: formValidation, 
    onSubmit : (values) =>{
                            console.log("OnSubmit",values);
                            updatingLead(values);
                            
                          }
    
    });


       //using useEffect to Show errors
  useEffect( async ()=>{ 

    if(errors)
  {
    for(let keys in errors)
    {
      alert(errors[keys]);
    }     
  }
  
},[errors]);

  
    //useEfeect for gettig all leads only once
  useEffect( async ()=>{ 

      await fetch(`${API_URL}/Dashboard/ServiceRequests`,{
      method : "GET"  
      }).then((response) => response.json())
        .then(data => setCustomers(data))
        .catch( (e) => console.log(e));
      
    
  },[]);

  //useEffectfor setting default values to formik
  useEffect(()=>{ 
    
    if(currentValues)
    {
    values.ID=currentValues._id;
    values.FirstName=currentValues.firstName;
    values.LastName=currentValues.lastName;
    values.Email=currentValues.email;
    values.AssignedEmp=currentValues.assignedEmp;
    values.Status=currentValues.status;
    // values.ShortDesc=currentValues.shortDesc;
    values.Date=currentValues.date;
    console.log("From Effect",values);
    }
},[currentValues]);

const DeleteThisLead = async (currentLead) =>{


  console.log("Deleting... ",currentLead);

  const result=  await  fetch(`${API_URL}/Dashboard/DeleteServiceReq`,{
      method : "POST",
      body: JSON.stringify({
                            id  :currentLead._id,
                            // firstName   :values.FirstName,
                            // lastName    :values.LastName,
                            // assignedEmp :values.AssignedEmp,
                            // status      :values.Status,
                            // email       :values.Email,
                            // date        :values.Date,
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

const updatingLead = async (values) =>{


  console.log("Updating... ",values);
 
  console.log(values);
  const result=  await  fetch(`${API_URL}/Dashboard/EditServiceReq`,{
      method : "POST",
      body: JSON.stringify({
                            id          :values.ID,
                            firstName   :values.FirstName,
                            lastName    :values.LastName,
                            assignedEmp :values.AssignedEmp,
                            // shortDesc   :values.ShortDesc,
                            status      :values.Status,
                            email       :values.Email,
                            date        :values.Date,
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

  console.log("Searching.. ",values.SearchServiceReq);
 
  if(values.SearchServiceReq)
  {

      const result=  await  fetch(`${API_URL}/Dashboard/SearchServiceRequest`,{
          method : "POST",
          body: JSON.stringify({
                              searchThisRequest:values.SearchServiceReq
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

    <div className="section-container  services-responsive container ">
      <div className="head-container">

        <div className="Content-heading">
          <h3>Service Requests</h3>
        </div>
        <div className="leads-utilities d-flex justify-content-between">
          <div className="search-box">
            <input type="text" onChange={handleChange} name="SearchServiceReq" aria-label="ssrach" placeholder="Search" /><i onClick={handleSearch} type="button" className="bi bi-search"></i>
          </div>
        </div>


      </div>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ReqestID</th>
              <th scope="col">Client Name</th>
              <th scope="col">Short Desc</th>
              <th scope="col">Status</th>
              <th scope="col">Email</th>
              <th scope="col">Assigned Employee</th>
              <th scope="col">Created Date</th>
              <th scope="col">Action</th>
            </tr>
            
          </thead>
          
          <tbody className="leads-tableBody">

            

            {(!searchResult) ?  customers.map((SR ,key)=> 
            { 
              let showEdit="none";
              //only selfAddedLead or Admin or manager can edit a SR
              (SR.assignedEmp===usersName || cookie.user.access_lvl==="Admin"|| cookie.user.access_lvl==="Manager") ? showEdit="auto" :showEdit="none";
              //edit is state with defaultValue null
              //when someone clicks edit button we pass uniquekey to edit(nameOfState) state
              if(isEdit!==key)
              {
                return (   
                  <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td >{SR.firstName} {SR.lastName} </td>
                    <td >{SR.shortDesc}</td>
                    <td >{SR.status}</td>
                    <td >{SR.email}</td>
                    <td >{SR.assignedEmp}</td>
                    <td >{SR.date}</td>
                    <td ><button style={{pointerEvents:showEdit}} onClick={()=>{setIsEdit(key)}} className="btn bg-primary mx-1 text-white"><i class="bi bi-pencil-square"></i></button> 
                         {/* <button style={{pointerEvents:showEdit}} onClick={()=>DeleteThisLead(SR)} className="btn bg-danger text-white">Delete</button></td> */}
                         <button style={{pointerEvents:showEdit}} onClick={ () =>{

                                                                        const confirmBox = window.confirm(
                                                                              "Do you really want to delete this Crumb?"
                                                                            )
                                                                            if (confirmBox === true) {
                                                                              DeleteThisLead(SR)
                                                                            } 
                                                }

                         } className="btn bg-danger mx-1 text-white"><i class="bi bi-trash"></i></button></td>
                         
                  </tr>
                 )
              } 
              ////////////////////////////////////////////////
              else{
                //to call useEffect and Updating Formik initial values
                {if(currentValues!=SR){setCurrentValues(SR)}}
                if(cookie.user.access_lvl==="Admin" || cookie.user.access_lvl==="Admin")
                {

                return(
                  
                  <tr key={key} >
                    
                    <th scope="row">{key+1}</th> 
                    
                    <td >
                       
                        <input 
                        type="text"    
                        defaultValue={[SR.firstName]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="FirstName"     
                        placeholder="First Name" 
                        required />

                        <input 
                        type="text" 
                        defaultValue={SR.lastName} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="LastName" 
                        placeholder="Last Name" 
                        required />
                        
                    </td>

                    <td >{SR.shortDesc}</td>

                    <td >
                      <select 
                            defaultValue={SR.status} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            name="Status"
                            className="form-select" 
                            aria-label="Default select example" >
                      <option defaultValue>-- Select Status --</option>
                      <option value="Created">Created</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Released">Released</option>
                      <option value="Cancel">Cancel</option>
                      <option value="Completed">Completed</option>
            
                    </select>
                    </td>


                    <td >
                    <input 
                        type="Email" 
                        defaultValue={SR.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="Email" 
                        placeholder="sample@gmail.com" 
                        required />
                      
                      
                    </td>
                    <td >
                       <input 
                          type="text" 
                          defaultValue={SR.assignedEmp}                           
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          name="AssignedEmp"          
                          placeholder="Employee Name" 
                          required /> 
                    </td>
                    <td  >
                      <input 
                      type="date" 
                      defaultValue={SR.date} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      name="LastName" 
                      placeholder="Date" 
                      required />
                    </td>
                    <td ><button onClick={()=>setIsEdit(null)} className="btn bg-danger mx-1 text-white"><i class="bi bi-x-lg"></i></button>
                    <button onClick={handleSubmit} type="button" className="btn bg-success  mx-1 text-white"><i class="bi bi-save"></i></button> 
                    </td>
                  
                   </tr >
                 
                )

               
                }
                else
                {
                    return(
                  
                        <tr key={key} >
                          
                          <th scope="row">{key+1}</th> 
                          
                          <td >{SR.firstName} {SR.lastName} </td>
    
                          <td >
                            <select 
                                  defaultValue={SR.status} 
                                  onChange={handleChange} 
                                  onBlur={handleBlur} 
                                  name="Status"
                                  className="form-select" 
                                  aria-label="Default select example" >
                            <option defaultValue>-- Select Status --</option>
                            <option value="Created">Created</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Released">Released</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Completed">Completed</option>
                          </select>
                          </td>
                            <td >{SR.shortDesc}</td>
                            <td >{SR.status}</td>
                            <td >{SR.email}</td>
                            <td >{SR.assignedEmp}</td>
                            <td >{SR.date}</td>
                          <td ><button onClick={()=>setIsEdit(null)} className="btn bg-danger mx-1 text-white"><i class="bi bi-x-lg"></i></button>
                          <button onClick={handleSubmit} type="button" className="btn bg-success mx-1 text-white"><i class="bi bi-save"></i></button> 
                          </td>
                        
                         </tr >
                       
                      )
                }
                
              }
            
            
            } ): 
            
            searchResult.map((SR ,key)=> 
            { 
              let showEdit="none";
              //only selfAddedLead or Admin or manager can edit a SR
              (SR.assignedEmp===usersName || cookie.user.access_lvl==="Admin"|| cookie.user.access_lvl==="Manager") ? showEdit="auto" :showEdit="none";
              //edit is state with defaultValue null
              //when someone clicks edit button we pass uniquekey to edit(nameOfState) state
              if(isEdit!==key)
              {
                return (   
                  <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td >{SR.firstName} {SR.lastName} </td>
                    <td >{SR.shortDesc}</td>
                    <td >{SR.status}</td>
                    <td >{SR.email}</td>
                    <td >{SR.assignedEmp}</td>
                    <td >{SR.date}</td>
                    <td ><button style={{pointerEvents:showEdit}} onClick={()=>{setIsEdit(key)}} className="btn mx-1 bg-primary text-white"><i class="bi bi-pencil-square"></i></button> 
                         {/* <button style={{pointerEvents:showEdit}} onClick={()=>DeleteThisLead(SR)} className="btn bg-danger text-white">Delete</button></td> */}
                         <button style={{pointerEvents:showEdit}} onClick={ () =>{

                                                                        const confirmBox = window.confirm(
                                                                              "Do you really want to delete this Crumb?"
                                                                            )
                                                                            if (confirmBox === true) {
                                                                              DeleteThisLead(SR)
                                                                            } 
                                                }

                         } className="btn bg-danger mx-1 text-white"><i class="bi bi-trash"></i></button></td>
                         
                  </tr>
                 )
              } 
              ////////////////////////////////////////////////
              else{
                //to call useEffect and Updating Formik initial values
                {if(currentValues!=SR){setCurrentValues(SR)}}
                if(cookie.user.access_lvl==="Admin" || cookie.user.access_lvl==="Admin")
                {

                return(
                  
                  <tr key={key} >
                    
                    <th scope="row">{key+1}</th> 
                    
                    <td >
                       
                        <input 
                        type="text"    
                        defaultValue={[SR.firstName]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="FirstName"     
                        placeholder="First Name" 
                        required />

                        <input 
                        type="text" 
                        defaultValue={SR.lastName} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="LastName" 
                        placeholder="Last Name" 
                        required />
                        
                    </td>

                    <td >{SR.shortDesc}</td>

                    <td >
                      <select 
                            defaultValue={SR.status} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            name="Status"
                            className="form-select" 
                            aria-label="Default select example" >
                      <option defaultValue>-- Select Status --</option>
                      <option value="Created">Created</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Released">Released</option>
                      <option value="Cancel">Cancel</option>
                      <option value="Completed">Completed</option>
            
                    </select>
                    </td>


                    <td >
                    <input 
                        type="Email" 
                        defaultValue={SR.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="Email" 
                        placeholder="sample@gmail.com" 
                        required />
                      
                      
                    </td>
                    <td >
                       <input 
                          type="text" 
                          defaultValue={SR.assignedEmp}                           
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          name="AssignedEmp"          
                          placeholder="Employee Name" 
                          required /> 
                    </td>
                    <td  >
                      <input 
                      type="date" 
                      defaultValue={SR.date} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      name="LastName" 
                      placeholder="Date" 
                      required />
                    </td>
                    <td ><button onClick={()=>setIsEdit(null)} className="btn bg-danger mx-1 text-white"><i class="bi bi-x-lg"></i></button>
                    <button onClick={handleSubmit} type="button" className="btn bg-success  mx-1 text-white"><i class="bi bi-save"></i></button> 
                    </td>
                  
                   </tr >
                 
                )

               
                }
                else
                {
                    return(
                  
                        <tr key={key} >
                          
                          <th scope="row">{key+1}</th> 
                          
                          <td >{SR.firstName} {SR.lastName} </td>
    
                          <td >
                            <select 
                                  defaultValue={SR.status} 
                                  onChange={handleChange} 
                                  onBlur={handleBlur} 
                                  name="Status"
                                  className="form-select" 
                                  aria-label="Default select example" >
                            <option defaultValue>-- Select Status --</option>
                            <option value="Created">Created</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Released">Released</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Completed">Completed</option>
                          </select>
                          </td>
                            <td >{SR.shortDesc}</td>
                            <td >{SR.status}</td>
                            <td >{SR.email}</td>
                            <td >{SR.assignedEmp}</td>
                            <td >{SR.date}</td>
                          <td ><button onClick={()=>setIsEdit(null)} className="btn bg-danger  mx-1 text-white"><i class="bi bi-x-lg"></i></button>
                          <button onClick={handleSubmit} type="button" className="btn bg-success  mx-1 text-white"><i class="bi bi-save"></i></button> 
                          </td>
                        
                         </tr >
                       
                      )
                }
                
              }
            
            
            } )
            
            }



          </tbody>
        </table>
      </div>
    </div>

  );

}