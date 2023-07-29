import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.authtoken) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("success","Account Created Successfully.")
            navigate("/");

        }
        else {
            props.showAlert("danger",json.error)
        }
    }



    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2 className='my-3 text-center'>Create an account to use iNotebook...</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={onChange} minLength={3} id="name" aria-describedby="emailHelp" required value={credentials.name} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" onChange={onChange}  minLength={5} id="email" required value={credentials.email} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={onChange}  minLength={5} id="password" value={credentials.password} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" onChange={onChange} minLength={5}  id="cpassword" value={credentials.cpassword} required />
                <label htmlFor="cpassword" className="form-label text-danger">{ credentials.password !== credentials.cpassword && "Passwords does not match." }</label>
            </div>
            <button type="submit" disabled={credentials.name.length <3 || credentials.email === "" || credentials.password.length < 5 || credentials.password !== credentials.cpassword} className="btn btn-primary">Signup</button>
        </form>
    )
}

export default Signup