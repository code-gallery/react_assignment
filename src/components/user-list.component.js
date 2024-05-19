import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import axios from 'axios';
import CreateUser from "./create-user.component";


const UserList = (props) => {
  const [users, setUsers] = useState([]);

  const [isAdd, setIsAdd] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  
  const [isEditid, setIsEditid] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:4000/users/')
      .then(res => {
        setUsers(users => res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const addClick = () => {
    setIsAdd(isAdd => true);
    setIsEdit(isEdit => false);
    setIsEditid(isEditid => 0);
  }

  const deleteUser = (__id) => {  
 
      axios.delete('http://localhost:4000/users/delete-user/' + __id)
          .then((res) => {
              alert('User successfully deleted!');
              window.location.reload(false);
          }).catch((error) => {
              console.log(error)
          })

  }

  const editUser = (__id) => {
    setIsAdd(isAdd => false);
    setIsEdit(isEdit => true);
    setIsEditid(isEditid => __id);
  }

  const closeAddPopup = () => {
    setIsAdd(isAdd => false);
  }

  const closeEditPopup = () => {
    setIsEdit(isEdit => false);
    setIsEditid(isEditid => 0);
  }
  

    return (
    <>
    <section className="Container">
      <div className="top-bar">
          <div>
            User
          </div>
          <div>
            <button className="button" type="button" onClick={addClick}>
              Add
            </button>
            <div className="search">
              <img src="/assets/search.png" />
              <input type="text" name="search-box" id="search-box" />
            </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Created</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {users.map((res, i) => (
                <tr>
                  <td>{res.fname} {res.lname}</td>
                  <td>{res.role}</td>
                  <td>{res.email}</td>
                  <td>{res.created}</td>
                  <td>{res.status}</td>
                  <td>
                      <button onClick={() => editUser(res._id)} className="button">Edit</button>
                      <button onClick={() => deleteUser(res._id)} className="ml-2 button grey" >Delete</button>
                  </td>
              </tr>
              ))}
          </tbody>
        </table>
        </div>

        <div className="pagination-sec">
          <div>
            <a href="#">&laquo; First</a>
            <a href="#">&lsaquo; Previous</a>
            <a href="#" className="current">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">Next &rsaquo;</a>
            <a href="#">Last &raquo;</a>
          </div>
        </div>
      </section>
      {/* {isAdd ? ( <CreateUser isEdit="false" /> ):(<></>)}
      {isEdit ? ( <CreateUser isEdit="true" id={isEditid} /> ):(<></>)} */}


      {isAdd ? (<div className="model-opacity">
       <div className="model-container">
         <div>
           <button onClick={closeAddPopup}>x</button>
           <CreateUser isEdit="false" />
         </div>
       </div>
      </div>):(<></>)}

      {isEdit ? (<div className="model-opacity">
       <div className="model-container">
         <div>
          <button onClick={closeEditPopup}>x</button>
          <CreateUser isEdit="true" id={isEditid} />
         </div>
       </div>
      </div>):(<></>)}




    
    </>
    );
}


export default UserList;
