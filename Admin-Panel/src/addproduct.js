// import React, { useState,useEffect } from 'react';
// import './reg.css'
// import axios from 'axios';
// import empty from 'is-empty';
// import { useNavigate } from 'react-router-dom';
// export default function Form() {

//     const Navigate = useNavigate();

//     const [p_name, setp_name] = useState("");
//     const [price, setprice] = useState("");
//     const [Error, setError] = useState({});
//     const [File, setFile] = useState("");
//     const [p_image, setp_image] = useState("");
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setsubcategories] = useState([]);


//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get("http://localhost:2020/category");
//                 if (response.data.status) {
//                     setCategories(response.data.result);
//                 } else {
//                     alert(response.data.message);
//                 }
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//                 alert("An error occurred while fetching categories.");
//             }
//         };

//         fetchCategories();
//     }, []);


//     useEffect(() => {
//         const fetchsubCategories = async () => {
//             try {
//                 const response = await axios.get("http://localhost:2020/subcategory");
//                 if (response.data.status) {
//                     setsubcategories(response.data.result);
//                 } else {
//                     alert(response.data.message);
//                 }
//             } catch (error) {
//                 console.error("Error fetching subcategories:", error);
//                 alert("An error occurred while fetching subcategories.");
//             }
//         };

//         fetchsubCategories();
//     }, []);

//     function HandleChange(e) {
//         let { id, value, name } = e.target; //ds

//         if (id == "name") {
//             setp_name(value)
//         } else if (id == 'price') {
//             setprice(value)
//         }

//     }

//     function HandleFile(e) {
//         let file = e.target.files[0];
//         setp_image(file)
//         setFile(URL.createObjectURL(file))
//     }

//     var handleSubmit = async () => {
//         // console.log("calledddd")
//         // let errors = {};

//         // let emailregex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//         // let passwordregex = /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,16}$/;

//         // if (name == "") {
//         //     errors.name = "name is required"
//         // }

//         // if (Email == "") {
//         //     errors.email = "Email is required"
//         // }
//         // else if (!emailregex.test(Email)) {
//         //     errors.email = "Email is invalid"
//         // }

//         // if (Password == "") {
//         //     errors.password = "password is required"
//         // }
//         // else if (!passwordregex.test(Password)) {
//         //     errors.password = "password is invalid"
//         // }

//         // if (LastName == "") {
//         //     errors.user = "username is required"
//         // }

//         // if (PhoneNo == "") {
//         //     errors.phone = "phone number is required"
//         // }

//         // if (Confirm != Password) {
//         //     errors.confirm = "password is not match"
//         // }

//         // if (Gender == "") {
//         //     errors.gender = "gender is required"
//         // }
//         // if (!empty(errors)) {
//         //     setError(errors);
//         //     return
//         // }

//         let form = new FormData();

//         form.append("p_name", p_name);
//         form.append("price", price);
//         form.append("p_image", p_image);

//         console.log(form, "form")

//         let responce = await axios({
//             url: "http://localhost:2020/setproduct",
//             method: "post",
//             data: form
//         });
//         console.log(responce.date, "responceresponce")
//         if (responce.data.status) {
//             alert(responce.data.message);
//             Navigate("/listproduct")
//         } else {
//             alert("error")
//         }


//     }


//     return (
//         <div className='FormValidation'>
//             <h1>product</h1>

//             <select>
//                 {/* <option value="">Select Category</option> */}
//                 {categories.map((category) => (
//                     <option key={category._id} value={category._id}>
//                         {category.category}
//                         {console.log(category,"categorycategory")}
//                         {console.log(categories,"categoriescategories")}
//                     </option>
//                 ))}
//             </select>
//                 <br></br>
//             <select>
//                 {/* <option value="">Select Category</option> */}
//                 {subcategories.map((subcategory) => (
//                     <option key={subcategory._id} value={subcategory._id}>
//                         {subcategory.subcategory}
//                         {console.log(subcategory,"subcategorysubcategory")}
//                         {console.log(subcategories,"categoriescategories")}
//                     </option>
//                 ))}
//             </select>

//                     <input className="inputbox btn" type="text" id="name" placeholder='product Name' value={p_name} onChange={HandleChange} required /><br /><br />
//                     {Error.p_name ? <p style={{ color: "red" }}>{Error.p_name}</p> : ""}

//                     <input className="inputbox btn" type="number" id="price" placeholder='price' value={price} onChange={HandleChange} required /><br /><br />
//                     {Error.price ? <p style={{ color: "red" }}>{Error.price}</p> : ""}

//                     <label>Set P_image</label>
//                     <input className="inputbox btn" type="file" onChange={HandleFile} /><br /><br />
//                     {/* <img src={File} /> */}
    
//             <button className='submitbtn btn' type="submit" onClick={handleSubmit}>
//                 set product
//             </button>

//             <a href='listproduct'>View Product</a>
//         </div>
      
//     )
// }



import React, { useState, useEffect } from 'react';
import './reg.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const Navigate = useNavigate();

    const [p_name, setp_name] = useState("");
    const [price, setprice] = useState("");
    const [Error, setError] = useState({});
    const [File, setFile] = useState("");
    const [p_image, setp_image] = useState("");
    const [categories, setCategories] = useState([]);
    const [subcategories, setsubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");

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

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (!selectedCategory) return; 
            try {
                const response = await axios.get(`http://localhost:2020/subcategory?cate_id=${selectedCategory}`);
                if (response.data.status) {
                    setsubcategories(response.data.result);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching subcategories:", error);
                alert("An error occurred while fetching subcategories.");
            }
        };

        fetchSubcategories();
    }, [selectedCategory]); 

    function HandleChange(e) {
        let { id, value } = e.target;

        if (id === "name") {
            setp_name(value);
        } else if (id === 'price') {
            setprice(value);
        } else if (id === 'category') {
            setSelectedCategory(value);
            setSelectedSubcategory(""); 
        } else if (id === 'subcategory') {
            setSelectedSubcategory(value);
        }
    }

    function HandleFile(e) {
        let file = e.target.files[0];
        setp_image(file);
        setFile(URL.createObjectURL(file));
    }

    var handleSubmit = async () => {
        let form = new FormData();
        form.append("p_name", p_name);
        form.append("price", price);
        form.append("p_image", p_image);
        form.append("category_id", selectedCategory);
        form.append("subcategory_id", selectedSubcategory);

        try {
            let response = await axios({
                url: "http://localhost:2020/setproduct",
                method: "post",
                data: form
            });

            if (response.data.status) {
                alert(response.data.message);
                Navigate("/listproduct");
            } else {
                alert("Error while setting the product");
            }
        } catch (error) {
            console.error("Error in form submission:", error);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <div className='FormValidation'>
            <h1>Product</h1>

            <select id="category" value={selectedCategory} onChange={HandleChange}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.category}
                    </option>
                ))}
            </select>
            <br />

            <select id="subcategory" value={selectedSubcategory} onChange={HandleChange} >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.subcategory}
                    </option>
                ))}
            </select>
            <br />

            <input className="inputbox btn" type="text" id="name" placeholder='Product Name' value={p_name} onChange={HandleChange}  required /><br /><br />

            <input className="inputbox btn" type="number" id="price" placeholder='Price' value={price} onChange={HandleChange} required /><br /><br />

            <label>Set Product Image</label>
            <input className="inputbox btn" type="file" onChange={HandleFile} /><br /><br />

            <button className='submitbtn btn' type="button" onClick={handleSubmit}>
                Set Product
            </button>

            <a href='/listproduct'>View Product</a>
        </div>
    );
}



// disabled={!selectedCategory}