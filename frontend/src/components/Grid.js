import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import {Link} from "react-router-dom";

const Table = styled.table`
  width: 100%;
  background-color: #ff0000;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  
  // const handleChange = (e) =>{
  //   const {name, checked} = e.target;

  //   const checkedvalue = users.map((user) => 
  //   user.sku ===name? {...user, isCheked:checked}: user);
  //   console.log(name)
   
  //   setUsers(checkedvalue);
  // }


const [isChecked, setisChecked]=useState([]);

const handlecheckbox = (e) => {
  const {value, checked} = e.target
  if(checked)
  {
    setisChecked([...isChecked, value]);
  } else{
    setisChecked(isChecked.filter((e) => e!== value))
  }
  console.log(e.target)
}

const alldelete = async (value) => {
  await axios
    .delete("http://localhost:8800/" + value)
    .then(({ data }) => {
      const newArray = users.filter((item) => item.sku !== value);

      setUsers(newArray);
      
      toast.success(data);
    })
    .catch(({ data }) => toast.error(data));

  setOnEdit(null);
};

  return (
    <div>
    <div className="links">
        <Link to="/productadded">
          <button > ADD </button>
        </Link>
        
        <button onClick={alldelete(isChecked)}> MASS DELETE </button>
      </div>
     
        {users.map((item, index) => (
        <>
        {/* <button onClick={() => handleDelete()}> DELETE</button> */}

        <input type="checkbox" value={item.sku} checked={item.isChecked} onChange={(e) => handlecheckbox(e)}/>
        <ul>
          <li key={item.sku}>
            {item.sku}
            {item.name}
            {item.price}
          </li>  
        </ul>  
        </>  
        ))}
    </div>
  );
};

export default Grid;
