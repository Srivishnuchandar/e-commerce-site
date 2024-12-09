import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './list.css';
import Edit from './Editproduct';

export default function Listproduct() {
  const [Data, setData] = useState([]);
  const [IsEdit, setIsEdit] = useState(false);
  const [EditData, setEditData] = useState({});
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getList = async (searchTerm = '') => {
    try {
      let response = await axios({
        url: "http://localhost:2020/getproduct",
        method: "post",
        data: { searchdata: searchTerm }
      });
  
      if (response.data.status) {
        setData(response.data.result);
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleSearch = (e) => {
    const fetch = e.target.value;
    setSearch(fetch);  
    getList(fetch);  
  };
  
  const handleDelete = async (id) => {
    try {
      let response = await axios({
        url: "http://localhost:2020/removeproduct",
        method: "post",
        data: { id }
      });
  
      if (response.data.status) {
        setData(prevData => prevData.filter(product => product._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  

  const handleEdit = (item) => {
    setIsEdit(true);
    setEditData(item);
  };

  useEffect(() => {
    getList();
  }, []); 

  return (
    <div className="container">
      <h1>Product List</h1>

      <input
        type="text" placeholder="Search a product" value={search} onChange={handleSearch} />
      <br/>

      <button className="btn btn-primary" onClick={() => navigate("/addproduct")}>Add</button>
      <button className="btn btn-primary" onClick={() => navigate("/category")}>category</button>
      <button className="btn btn-primary" onClick={() => navigate("/subcategory")}>subcategory</button>

      <table className="product-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.p_name}</td>
              <td>{user.price}</td>
              <td>
                <img
                  src={`http://localhost:2020/images/${user.p_image}`} alt={user.p_name} className="product-img" />
              </td>
              <td>
                <button onClick={() => handleEdit(user)} className="btn edit-btn">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {IsEdit && <Edit data={EditData} setEditData={setEditData} />}
    </div>
  );
}

