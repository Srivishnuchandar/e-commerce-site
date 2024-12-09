import React, { useState } from 'react';
import './reg.css'
import axios from 'axios';
import empty from 'is-empty';
import { useNavigate } from 'react-router-dom';
export default function Form() {

    const Navigate = useNavigate();

    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [PhoneNo, setPhoneNo] = useState("");
    const [Confirm, setConfirm] = useState("");
    const [address, setaddress] = useState("");
    const [Gender, setGender] = useState("");
    const [Error, setError] = useState({});
    const [File, setFile] = useState("");
    const [image, setimage] = useState("");

    function HandleChange(e) {
        let { id, value, name } = e.target; //ds

        if (id == "name") {
            setname(value)
        } else if (id == "email") {
            setEmail(value)
        } else if (id == "age") {
            setage(value)
        } else if (id == 'password') {
            setPassword(value)
        } else if (id == 'address') {
            setaddress(value)
        } else if (id == 'phone') {
            setPhoneNo(value)
        } else if (id == 'confirm') {
            setConfirm(value)
        } else if (name == 'gender') {
            setGender(id)
        }

    }

    function HandleFile(e) {
        let file = e.target.files[0];
        setimage(file)
        setFile(URL.createObjectURL(file))
    }

    var handleSubmit = async () => {
        // console.log("calledddd")
        // let errors = {};

        // let emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // let passwordregex = /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,16}$/;

        // if (name == "") {
        //     errors.name = "name is required"
        // }

        // if (Email == "") {
        //     errors.email = "Email is required"
        // }
        // else if (!emailregex.test(Email)) {
        //     errors.email = "Email is invalid"
        // }

        // if (Password == "") {
        //     errors.password = "password is required"
        // }
        // else if (!passwordregex.test(Password)) {
        //     errors.password = "password is invalid"
        // }

        // if (LastName == "") {
        //     errors.user = "username is required"
        // }

        // if (PhoneNo == "") {
        //     errors.phone = "phone number is required"
        // }

        // if (Confirm != Password) {
        //     errors.confirm = "password is not match"
        // }

        // if (Gender == "") {
        //     errors.gender = "gender is required"
        // }
        // if (!empty(errors)) {
        //     setError(errors);
        //     return
        // }

        let form = new FormData();

        form.append("name", name);
        form.append("age", age);
        form.append("address", address);
        form.append("email", Email);
        form.append("password", Password);
        form.append("phoneNo", PhoneNo);
        form.append("gender", Gender);
        form.append("image", image);

        console.log(form, "form")

        let responce = await axios({
            url: "http://localhost:2020/register",
            method: "post",
            data: form
        });
        console.log(responce.date, "responceresponce")
        if (responce.data.status) {
            alert(responce.data.message);
            Navigate("/login")
        } else {
            alert("error")
        }


    }


    return (
        <div className='FormValidation'>
            <h1>Registration</h1>
            <div className='row'>
                <div className='col-6'>

                    <input className="inputbox btn" type="text" id="name" placeholder='Full Name' value={name} onChange={HandleChange} required /><br /><br />
                    {Error.name ? <p style={{ color: "red" }}>{Error.name}</p> : ""}

                    <input className="inputbox btn" type="number" id="age" placeholder='Age' value={age} onChange={HandleChange} required /><br /><br />
                    {Error.age ? <p style={{ color: "red" }}>{Error.age}</p> : ""}

                    <input className="inputbox btn" type="text" id="email" placeholder='Email' value={Email} onChange={HandleChange} required /><br /><br />
                    {Error.email ? <p style={{ color: "red" }}>{Error.email}</p> : ""}

                    <input className="inputbox btn" type="text" id="password" placeholder='Password' value={Password} onChange={HandleChange} required /><br /><br />
                    {Error.password ? <p style={{ color: "red" }}>{Error.password}</p> : ""}

                </div>
                <div className='col-6'>

                    <input className="inputbox btn" type="text" id="address" placeholder='address' value={address} onChange={HandleChange} required /><br /><br />
                    {Error.address ? <p style={{ color: "red" }}>{Error.address}</p> : ""}

                    <input className="inputbox btn" type="text" id="phone" placeholder='Phone Number' value={PhoneNo} onChange={HandleChange} required /><br /><br />
                    {Error.phone ? <p style={{ color: "red" }}>{Error.phone}</p> : ""}

                    <input className="inputbox btn" type="text" id="confirm" placeholder='Confirm Password' value={Confirm} onChange={HandleChange} required /><br /><br />
                    {Error.confirm ? <p style={{ color: "red" }}>{Error.confirm}</p> : ""}

                    <label>Set Profile</label>
                    <input className="inputbox btn" type="file" onChange={HandleFile} /><br /><br />
                    <img src={File} />

                </div>

            </div>


            <h3>Gender :</h3>
            <div className='gender'>
                <div>
                    <input type='radio' id='male' name="gender" onChange={HandleChange}></input>
                    <label className="gen">Male</label>
                </div>
                <div>
                    <input type='radio' id='female' name="gender" onChange={HandleChange}></input>
                    <label className="gen">Female</label>
                </div>
                <div>
                    <input type='radio' id='others' name="gender" onChange={HandleChange}></input>
                    <label className="gen">Others</label>
                </div>

                {Error.gender ? <p style={{ color: "red" }}>{Error.gender}</p> : ""}
            </div>


            <button className='submitbtn btn' type="submit" onClick={handleSubmit}>
                Register
            </button>
            <a href="/login" className='nav-link' >Already login? <span>Click hear</span></a>

        </div>
    )
}