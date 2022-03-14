import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  username: "",
  address: "",
  contact: "",
  email: "",
  dob: "",
  
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, username, address, contact, dob } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !address || !email || !dob || !contact) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name..."
          value={name}
          onChange={handleInputChange}
        />

        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter User Name..."
          value={username}
          onChange={handleInputChange}
        />

        <label htmlFor="name">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter address..."
          value={address}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email..."
          value={email}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Contact No. ..."
          value={contact}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="date"
          id="dob"
          name="dob"
          placeholder="Enter Date of birth. ..."
          value={dob}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
