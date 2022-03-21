import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import axios from "axios";
import { toast } from "react-toastify";
import SearchField from "react-search-field";

// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const Home = () => {
  const [state, setState] = useState([]);
  
  const [data, setData] = useState([]);
  

  const getUsers = async () => {
    const response = await axios.get("https://trade-with-mak.herokuapp.com/adduser");
    if (response.status === 200) {
      setData(response.data);

    }
  };
  const handleChange = (e) => {
    if(e.target.value == "" || e.target.value == undefined){
      setState("");
      getUsers();
    }
    else{
    setState(e.target.value);
    }
  };

  const onDeleteUser = async (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that user record")
    ) {
      const response = await axios.delete(`https://trade-with-mak.herokuapp.com/adduser/${id}`);
      if (response.status === 200) {
        toast(response.data.message);
        getUsers();
      }
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
 
  const handleSearch=()=>{

    let arr = data.filter((obj) =>
  JSON.stringify(obj).toLowerCase().includes(state.toLowerCase())
)
    setData(arr);
  
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div style={{ marginTop: "150px" }}>
            <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
          display:"inline-block",
          marginTop:"-80px"
        }}
        
      >
        <input
          type="text"
          className="search"
          placeholder="Search text here"
          value={state}
          onChange={handleChange}
        />
        <input type="button" className="btn-search"value="Search" onClick={handleSearch} />
        {/* <SearchField
          placeholder="Search..."
          onChange={onChange}
          searchText={state}
          classNames="test-class"
        /> */}
        {/* <input type="button" value="Search" onClick={handleSearch} /> */}
        </form>
        <table className="styled-table" striped bordered hover responsive="md">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Username</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Date of Birth</th>
           
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>              
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.address}</td>
                  <td>{item.contact}</td>
                  <td>{item.email}</td>
                  <td>{item.dob}</td>
                  <td>
                    <Link to={`/edituser/${item._id}`}>
                      <button className="btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteUser(item._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item._id}/"view"`}>
                      <button className="btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
