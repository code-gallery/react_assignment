import React, { useEffect, useState } from "react";

import Form from 'react-bootstrap/Form'
import axios from 'axios';

const CreateUser = (props) => {

    let today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [role, setRole] = useState('Admin');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Active');
    const [created, setCreated] = useState(today);
    const isEdit = props.isEdit;


    useEffect(() => {

      if(props.isEdit=='true'){
        axios.get('http://localhost:4000/users/edit-user/' + props.id)
        .then(res => {
          
          setFname(fname => res.data.fname);
          setLname(lname => res.data.lname);
          setRole(role => res.data.role);
          setEmail(email => res.data.email);
          setStatus(status => res.data.status);
        })
        .catch((error) => {
          console.log(error);
        })
      } 
    }, [props.isEdit,props.id]);

    const onSubmit = (e) => {
        e.preventDefault()

        const userObject = {
          fname: fname,
          lname: lname,
          role: role,
          email: email,
          status: status,
          created: created
        };

        if(props.isEdit==='true'){
          axios.put('http://localhost:4000/users/update-user/' + props.id, userObject)
          .then(res => {
            console.log(res.data);
            setFname(fname => '');
            setLname(lname => '');
            setRole(role => '');
            setEmail(email => '');
            setStatus(status => '');
            alert('Record successfully updated!');
            window.location.reload(false);
          });
        } else{
          axios.post('http://localhost:4000/users/create-user', userObject)
          .then(res => {
            console.log(res.data);
            setFname(fname => '');
            setLname(lname => '');
            setRole(role => '');
            setEmail(email => '');
            setStatus(status => '');
            alert('Record successfully added!');
            window.location.reload(false);
          });
        }
          
    }

    return (<>
    <div className="form-wrapper">
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="Fname">
          <Form.Label>First Name</Form.Label>
          <Form.Control required type="text" defaultValue={fname} onChange={e =>setFname(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="Lname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required type="text" value={lname} onChange={e =>setLname(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="Role">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" value={role} onChange={e =>setRole(e.target.value)}>
            <option value="Admin">Admin</option>
            <option value="Partner">Partner</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" value={email} onChange={e =>setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="Status">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" value={status} onChange={e =>setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </Form.Control>
        </Form.Group>

        <button type="submit" className="mt-3 button">
          {isEdit == 'true'?'Edit':'Add'}
        </button>
      </Form>
    </div>
    </>
  );
}

export default CreateUser;
