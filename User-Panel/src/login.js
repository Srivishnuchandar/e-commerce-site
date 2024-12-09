import React, { useState } from 'react';
import './login.css'
import axios from 'axios';
import empty from 'is-empty';
import { useNavigate } from 'react-router-dom'


export default function Login() {
    let navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState({});


    function HandleChange(e) {
        let { id, value } = e.target; //ds

        if (id == 'email') {
            setEmail(value)
        }
        else if (id == 'password') {
            setPassword(value)
        }

    }

    var handleSubmit = async () => {
        let errors = {};

        let emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let passwordregex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

        if (Password == "") {
            errors.password = "password is required"
        }
        // else if (!passwordregex.test(Password)) {
        //     errors.password = "password is invalid"
        // }

        if (Email == "") {
            errors.email = "Email is required"
        }
        // else if (!emailregex.test(Email)) {
        //     errors.email = "Email is invalid"
        // }

        if (!empty(errors)) {
            setError(errors);
            console.log(errors, "ffgh")
            return
        }

        let data = {
            email: Email,
            password: Password
        }

        console.log(data, "datadatadata")
  
            let response = await axios({
                url: "http://localhost:2020/login",
                method: "post",
                data: data
            })
            if (response.data.status) {
                localStorage.setItem("tokennn", response.data.token)
                alert(response.data.message);
                navigate("/welcome")
            }
            else {
                setError(response.data.errors)
                alert("Failed");
        }
    }


    return (
        <div className='login'>
            <div className=''>

                <input className="inputbox btn" type="text" id="email" placeholder='email' value={Email} onChange={HandleChange} required /><br /><br />
                {Error.email ? <p style={{ color: "red" }}>{Error.email}</p> : ""}

                <input className="inputbox btn" type="text" id="password" placeholder='password' value={Password} onChange={HandleChange} required /><br /><br />
                {Error.password ? <p style={{ color: "red" }}>{Error.password}</p> : ""}
                <a href="/forget" className='nav-link forget-link' >forget password ?</a>


            </div>

            <button className='submitbtn btn' type="submit" onClick={handleSubmit}>
                login
            </button>

            <a href="/" className='nav-link' >Not registered? <span>Create an account</span></a>

        </div>
    )
}