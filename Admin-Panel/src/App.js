import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adminlogin from './adminlogin';
import AddProduct from './addproduct';
import ListProduct from './list';
import Category from './category';
import Subcategory from './subcategory';
function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Adminlogin />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
