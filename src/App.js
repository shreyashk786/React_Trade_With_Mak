import './App.css';
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Header from './components/Header';
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import { useEffect } from "react";
import AddEditTour from './pages/AddEditTour';
import AddEdit from './pages/AddEdit';

  function App() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    useEffect(() => {
      dispatch(setUser(user));
    }, []);
  return (
    <BrowserRouter>
    <div className="App">
      <Header />

      <ToastContainer/>
      <Routes>

        <Route path="/home" element={<  Home />} />
        <Route path="/" element={<  Login />} />
        <Route path="/home2" element={<  Home2 />} />
        <Route path="/adduser" element={<AddEdit />} />
        <Route path="/editTour/:id" element={<AddEditTour />} />
        <Route path="/edituser/:id" element={<AddEdit />} />
        <Route path="/view/:id/:type" element={<AddEdit />} />

        
        <Route path="/register" element={<Register />} />

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
