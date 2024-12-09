import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './welcome.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  let navigate = useNavigate();

  const [Data, setData] = useState([]);

  function HandleOut() {
    localStorage.removeItem("tokennn");
    navigate("/login");
  }

  const getProfile = async () => {
    try {
      const response = await axios({
        url: "http://localhost:2020/getproduct",
        method: "post",
      });
      if (response.data.status) {
        setData(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="welcome">
      <nav className="navbar navbar-expand-sm">
        <a className="nav-link" href="#">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-list-4">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Dashboard</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown">
                <i className="fa-solid fa-user"></i>
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/profile">My Profile</a>
                <a className="dropdown-item" href="#">Edit Profile</a>
                <a className="dropdown-item" href="#" onClick={HandleOut}>Log Out</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="product-grid">
        {
          Data.map((user, index) => (
            <div className="product-card" key={index}>
              <img 
                src={`http://localhost:2020/images/${user.p_image}`} 
                alt={user.p_name} 
                className="product-img"
              />
              <div className="product-info">
                <h3>{user.p_name}</h3>
                <p className="product-price">${user.price}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
