import React, { useState, useEffect } from 'react';
import './reg.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const Navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [error, setError] = useState({});

    const HandleChange = (e) => {
        let { id, value } = e.target;

        if (id === "category") {
            setCategory(value);
        }
    };

    const handleSubmit = async () => {
        let errors = {};

        if (category === "") {
            errors.category = "Category name is required";
        }

            let response = await axios({
                method: 'post',
                url: "http://localhost:2020/category",
                data:{ category },
            });

            if (response.data.status) {
                alert(response.data.message);
                Navigate("/listproduct"); 
            } else {
                alert(response.data.message);
            }
        
    };

    return (
        <div className='FormValidation'>
            <h1>Category Name</h1>
            <input className="inputbox btn" type="text" id="category" placeholder="Category Name" value={category} onChange={HandleChange} required
            />
            <br /><br />
            {error.category && <p style={{ color: "red" }}>{error.category}</p>}

            <button className='submitbtn btn' type="button" onClick={handleSubmit}>
                Set Category
            </button>
        </div>
    );
}
