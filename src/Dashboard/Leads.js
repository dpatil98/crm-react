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
  Status : yup.string().required("You Forgot To Give Access Level😱")
                            .max(13,"You Forgot To Add Status😱"),
  Date: yup.date().required("Please Enter Valid date")
});



export function Leads() {
  const [cookie ,setCookie ] = useCookies();


  const [customers, setCustomers] = useState([0]);
  const [isEdit, setIsEdit] = useState(null);
  const [currentValues, setCurrentValues] = useState();
  const [searchResult, setSearchResult] = useState();
  const [message ,setMessage] = useState([]);

  const usersName = `${cookie.user.firstName} ${cookie.user.lastName}` ;


  // console.log("User is :", usersName);
  // console.log("SearchResult", searchResult);
  // console.log("customers", customers);

  
  const {handleSubmit , handleChange , handleBlur, values, errors, touched} = useFormik ({

   
    initialValues : {ID:"", FirstName:"", LastName:"", Email:"", AssignedEmp:"", Status:"", Date:"" ,SearchLead:null},
  
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

      console.log("Getting Leads");
      await fetch(`${API_URL}/Dashboard/Leads`,{
      // await fetch(`${API_URL}/Dashboard/Leads`,{
      method : "GET"  
      }).then((response) => response.json())
        .then(data => setCustomers(data))
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
    values.AssignedEmp=currentValues.assignedEmp;
    values.Status=currentValues.status;
    values.Date=currentValues.date;
    console.log("From Effect",values);
    }
},[currentValues]);


const DeleteThisLead = async (currentLead) =>{


  console.log("Deleting... ",currentLead);

  const result=  await  fetch(`${API_URL}/Dashboard/DeleteLead`,{
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
  const result=  await  fetch(`${API_URL}/Dashboard/EditLead`,{
      method : "POST",
      body: JSON.stringify({
                            id          :values.ID,
                            firstName   :values.FirstName,
                            lastName    :values.LastName,
                            assignedEmp :values.AssignedEmp,
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

  console.log("Searching.. ",values.SearchLead);
 
  if(values.SearchLead)
  {

      const result=  await  fetch(`${API_URL}/Dashboard/SearchLead`,{
          method : "POST",
          body: JSON.stringify({
                                searchThisLead:values.SearchLead
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

    <div className="section-container leads-responsive container">
      <div className="head-container">

        <div className="Content-heading">
          <h3>Leads</h3>
        </div>
        <div className="leads-utilities d-flex justify-content-between">
          <div className="search-box">
           <form><input onChange={handleChange} name="SearchLead" type="text" aria-label="LeadSearch" placeholder="Search a Lead"   /><i onClick={handleSearch} type="submit" className="bi bi-search"></i></form> 
          </div>
          <div className="add-user">
            <Link to="/Dashboard/Leads/AddLead"><button className="btn btn-primary"> <i className="bi bi-plus-square"></i>Add Leads</button></Link>
          </div>
        </div>


      </div>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Email</th>
              <th scope="col">Assigned Employee</th>
              <th scope="col">Created Date</th>
              <th scope="col">Action</th>
            </tr>
            
          </thead>
          
          <tbody className="leads-tableBody">

            
            {/* //after Seaching.. search result will be displayed 
            //if search result is not found leads will be displayed */}
            {(!searchResult) ?  customers.map((Lead ,key)=> 
            { 
              let showEdit="none";
              //only selfAddedLead or Admin or manager can edit a Lead
              (Lead.assignedEmp===usersName || cookie.user.access_lvl==="Admin"|| cookie.user.access_lvl==="Manager") ? showEdit="auto" :showEdit="none";
              //edit is state with defaultValue null
              //when someone clicks edit button we pass uniquekey to edit(nameOfState) state
              if(isEdit!==key)
              {
                return (   
                  <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td >{Lead.firstName} {Lead.lastName} </td>
                    <td >{Lead.status}</td>
                    <td >{Lead.email}</td>
                    <td >{Lead.assignedEmp}</td>
                    <td >{Lead.date}</td>
                    <td ><button style={{pointerEvents:showEdit}} onClick={()=>{setIsEdit(key)}} className="btn bg-primary mx-1 text-white"><i class="bi bi-pencil-square"></i></button> 
                         {/* <button style={{pointerEvents:showEdit}} onClick={()=>DeleteThisLead(Lead)} className="btn bg-danger text-white"><i class="bi bi-trash"></i></button></td> */}
                         <button style={{pointerEvents:showEdit}} onClick={ () =>{

                                                                        const confirmBox = window.confirm(
                                                                              "Do you really want to delete this Crumb?"
                                                                            )
                                                                            if (confirmBox === true) {
                                                                              DeleteThisLead(Lead)
                                                                            } 
                                                }

                         } className="btn bg-danger mx-1 text-white"><i class="bi bi-trash"></i></button></td>
                         
                  </tr>
                 )
              } 
              ////////////////////////////////////////////////
              else{
                //to call useEffect and Updating Formik initial values
                {if(currentValues!=Lead){setCurrentValues(Lead)}}
                return(
                  
                  <tr key={key} >
                    <th scope="row">{key+1}</th> 
                    
                    <td >
                       
                        <input 
                        type="text"    
                        defaultValue={[Lead.firstName]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="FirstName"     
                        placeholder="First Name" 
                        required />

                        <input 
                        type="text" 
                        defaultValue={Lead.lastName} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="LastName" 
                        placeholder="Last Name" 
                        required />
                        
                    </td>


                    <td >
                      <select 
                            defaultValue={Lead.status} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            name="Status"
                            className="form-select" 
                            aria-label="Default select example" >
                      <option defaultValue>-- Select Status --</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Lost">Lost</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Canceled">Cancel</option>
            
                    </select>
                    </td>


                    <td >
                    <input 
                        type="Email" 
                        defaultValue={Lead.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="Email" 
                        placeholder="sample@gmail.com" 
                        required />
                      
                      
                    </td>
                    <td >
                       <input 
                          type="text" 
                          defaultValue={Lead.assignedEmp}                           
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          name="AssignedEmp"          
                          placeholder="Employee Name" 
                          required /> 
                    </td>
                    <td  >
                      <input 
                      type="date" 
                      defaultValue={Lead.date} 
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
            
            
            } )  
            
            
            
            :  
            
            
            searchResult.map((Lead ,key)=> 
            { 
              let showEdit="none";
              //only selfAddedLead or Admin or manager can edit a Lead
              (Lead.assignedEmp===usersName || cookie.user.access_lvl==="Admin"|| cookie.user.access_lvl==="Manager") ? showEdit="auto" :showEdit="none";
              //edit is state with defaultValue null
              //when someone clicks edit button we pass uniquekey to edit(nameOfState) state
              if(isEdit!==key)
              {
                return (   
                  <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td >{Lead.firstName} {Lead.lastName} </td>
                    <td >{Lead.status}</td>
                    <td >{Lead.email}</td>
                    <td >{Lead.assignedEmp}</td>
                    <td >{Lead.date}</td>
                    <td ><button style={{pointerEvents:showEdit}} onClick={()=>{setIsEdit(key)}} className="btn bg-primary mx-1 text-white"><i class="bi bi-pencil-square"></i></button> 
                         {/* <button style={{pointerEvents:showEdit}} onClick={()=>DeleteThisLead(Lead)} className="btn bg-danger text-white">Delete</button></td> */}
                         <button style={{pointerEvents:showEdit}} onClick={ () =>{

                                                                        const confirmBox = window.confirm(
                                                                              "Do you really want to delete this Crumb?"
                                                                            )
                                                                            if (confirmBox === true) {
                                                                              DeleteThisLead(Lead)
                                                                            } 
                                                }

                         } className="btn bg-danger  mx-1 text-white"><i class="bi bi-trash"></i></button></td>
                         
                  </tr>
                 )
              } 
              ////////////////////////////////////////////////
              else{
                //to call useEffect and Updating Formik initial values
                {if(currentValues!=Lead){setCurrentValues(Lead)}}
                return(
                  
                  <tr key={key} >
                    <th scope="row">{key+1}</th> 
                    
                    <td >
                       
                        <input 
                        type="text"    
                        defaultValue={[Lead.firstName]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="FirstName"     
                        placeholder="First Name" 
                        required />

                        <input 
                        type="text" 
                        defaultValue={Lead.lastName} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="LastName" 
                        placeholder="Last Name" 
                        required />
                        
                    </td>


                    <td >
                      <select 
                            defaultValue={Lead.status} 
                            onChange={handleChange} 
                            onBlur={handleBlur} 
                            name="Status"
                            className="form-select" 
                            aria-label="Default select example" >
                      <option defaultValue>-- Select Status --</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Lost">Lost</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Canceled">Cancel</option>
            
                    </select>
                    </td>


                    <td >
                    <input 
                        type="Email" 
                        defaultValue={Lead.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name="Email" 
                        placeholder="sample@gmail.com" 
                        required />
                      
                      
                    </td>
                    <td >
                       <input 
                          type="text" 
                          defaultValue={Lead.assignedEmp}                           
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          name="AssignedEmp"          
                          placeholder="Employee Name" 
                          required /> 
                    </td>
                    <td  >
                      <input 
                      type="date" 
                      defaultValue={Lead.date} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      name="LastName" 
                      placeholder="Date" 
                      required />
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
