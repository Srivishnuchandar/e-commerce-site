import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './myprofile.css'


export default function Myprofile() {
  const [data, setdata] = useState({});

  const getProfile = async () => {
    try {
      const response = await axios({
        url: "http://localhost:2020/getuser",
        method: "post",
        data: {
          token: localStorage.getItem("tokennn")
        }
      });
      console.log(response.data, "ggggggg");
      if (response.data.status) {
        setdata(response.data.result)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  console.log(data, "datattttt")

  return (
    <div className="myprofile">
  <h1>MY PROFILE</h1>
  <table>
    <tbody>
      <tr>
        <td>First Name:</td>
        <td>{data.name}</td>
      </tr>
      <tr>
        <td>Address:</td>
        <td>{data.address}</td>
      </tr>
      <tr>
        <td>Age:</td>
        <td>{data.age}</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>{data.email}</td>
      </tr>
      <tr>
        <td>Password:</td>
        <td>{data.password}</td>
      </tr>
      <tr>
        <td>Phone No:</td>
        <td>{data.phoneNo}</td>
      </tr>
      <tr>
        <td>Gender:</td>
        <td>{data.gender}</td>
      </tr>
      <tr>
        <td>Image:</td>
        <td>{data.image}</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}
