import React, { useEffect, useState } from 'react';
import './reg.css'
import axios from 'axios';
import empty from 'is-empty';
import { useNavigate } from 'react-router-dom';

export default function Form({ data,setEditData }) {
    console.log(data, "data")

    const navigate = useNavigate();
    const [Error, setError] = useState({});
    const [formData, setformData] = useState({});
    let { p_name, price, p_image } = formData;


    function HandleChange(e) {
        let { id, value } = e.target; //ds
        console.log(value,id, "ddddd")
        let formValue = { ...formData, [id]: value }
        console.log(formValue, "gggggggg")
        setformData(formValue)
    }

    function HandleFile(e) {
        let file = e.target.files[0];
        let formValue = { ...formData, p_image : file }
        setformData(formValue)
    }

    var handleSubmit = async () => {
        try {
            const response = await axios({
                url: "http://localhost:2020/updateproduct",
                method: "post",
                  data: formData
            });

            console.log(response.data, "Response Data");
            // console.log(id, "id for data");

            if (response.data.status) {
                setEditData(false)
                navigate('/editproduct')
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (data) {
            setformData(data)
        }
    }, [])


    return (
        <div className='FormValidation'>
            <h1>product</h1>

            <input className="inputbox btn" type="text" id="p_name" placeholder='product Name' value={p_name} onChange={HandleChange} required /><br /><br />
            {Error.p_name ? <p style={{ color: "red" }}>{Error.p_name}</p> : ""}

            <input className="inputbox btn" type="number" id="price" placeholder='price' value={price} onChange={HandleChange} required /><br /><br />
            {Error.price ? <p style={{ color: "red" }}>{Error.price}</p> : ""}

            <label>Set P_image</label>
            <input className="inputbox btn" type="file" onChange={HandleFile} /><br /><br />
            {/* <img src={File} /> */}

            <button className='submitbtn btn' type="submit" onClick={handleSubmit}>
                set product
            </button>
        </div>
    )
}