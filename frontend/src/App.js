import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.sku > b.sku ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };



  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              
              <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
            }
          />
          <Route
            path="/productadded"
            element={
              <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
            }
          />
        </Routes>
      </Router>

      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
}

export default App;
