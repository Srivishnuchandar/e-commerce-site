// import React, { useState } from 'react';
// import './reg.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Form() {
//     const Navigate = useNavigate();
//     const [subcategory, setSubCategory] = useState("");
//     const [cate_id, setCateId] = useState("");
//     const [error, setError] = useState({});

//     const HandleChange = (e) => {
//         let { id, value } = e.target;

//         if (id === "subcategory") {
//             setSubCategory(value);
//         } else if (id === "cate_id") {
//             setCateId(value);
//         }
//     };

//     const handleSubmit = async () => {
//         let errors = {};

//         if (subcategory === "") {
//             errors.subcategory = "Subcategory name is required";
//         }
//         if (cate_id === "") {
//             errors.cate_id = "Category ID is required";
//         }

//             const form = {
//                 subcategory: subcategory,
//                 cate_id: cate_id
//             };

//             let response = await axios({
//                 method: 'post',
//                 url: "http://localhost:2020/subcategory", 
//                 data: form,
//             });

//             if (response.data.status) {
//                 alert(response.data.message);
//                 Navigate("/listproduct");
//             } else {
//                 alert(response.data.message);
//             }
//     };

//     return (
//         <div className="FormValidation">
//             <h1>Subcategory</h1>
//             <input className="inputbox btn" type="text" id="subcategory" placeholder="Subcategory Name" style={{ marginBottom: 20 }}  value={subcategory} onChange={HandleChange} required />
//             <input className="inputbox btn" type="text" id="cate_id" placeholder="Category ID" value={cate_id} onChange={HandleChange} required/>
//             <br /><br />
//             {error.subcategory && <p style={{ color: "red" }}>{error.subcategory}</p>}
//             {error.cate_id && <p style={{ color: "red" }}>{error.cate_id}</p>}

//             <button className="submitbtn btn" type="button" onClick={handleSubmit}>
//                 Set Subcategory
//             </button>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import './reg.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const Navigate = useNavigate();
    const [subcategory, setSubCategory] = useState("");
    const [cate_id, setCateId] = useState("");
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:2020/category");
                if (response.data.status) {
                    setCategories(response.data.result);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                alert("An error occurred while fetching categories.");
            }
        };

        fetchCategories();
    }, []);

    const HandleChange = (e) => {
        let { id, value } = e.target;

        if (id === "subcategory") {
            setSubCategory(value);
        } else if (id === "cate_id") {
            setCateId(value);
        }
    };

    const handleSubmit = async () => {
        let errors = {};

        if (subcategory === "") {
            errors.subcategory = "Subcategory name is required";
        }
        if (cate_id === "") {
            errors.cate_id = "Category is required";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        const form = {
            subcategory: subcategory,
            cate_id: cate_id
        };

        try {
            let response = await axios({
                method: 'post',
                url: "http://localhost:2020/subcategory",
                data: form,
            });

            if (response.data.status) {
                alert(response.data.message);
                Navigate("/listproduct");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("An error occurred while submitting the subcategory.");
        }
    };

    return (
        <div className="FormValidation">
            <h1>Subcategory</h1>

            <input className="inputbox btn" type="text" id="subcategory" placeholder="Subcategory Name" style={{ marginBottom: 20 }} value={subcategory} onChange={HandleChange} required />
            <select id="cate_id" value={cate_id} onChange={HandleChange} className="inputbox btn" style={{ marginBottom: 20 }} required
            >
                {/* <option value="">Select Category</option> */}
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.category}
                        {console.log(category,"categorycategory")}
                        {console.log(categories,"categoriescategories")}
                    </option>
                ))}
            </select>

            <br /><br />
            {error.subcategory && <p style={{ color: "red" }}>{error.subcategory}</p>}
            {error.cate_id && <p style={{ color: "red" }}>{error.cate_id}</p>}

            <button className="submitbtn btn" type="button" onClick={handleSubmit}>
                Set Subcategory
            </button>
        </div>
    );
}
