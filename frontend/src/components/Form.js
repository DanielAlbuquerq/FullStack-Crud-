import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import {Link} from "react-router-dom";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.sku.value = onEdit.sku;
      user.name.value = onEdit.name;
      user.price.value = onEdit.price;
      user.typeproduct.value = onEdit.typeproduct;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.sku.value ||
      !user.name.value ||
      !user.price.value ||
      !user.typeproduct.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          sku: user.sku.value,
          name: user.name.value,
          price: user.price.value,
          typeproduct: user.typeproduct.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          sku: user.sku.value,
          name: user.name.value,
          price: user.price.value,
          typeproduct: user.typeproduct.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.sku.value = "";
    user.name.value = "";
    user.price.value = "";
    user.typeproduct.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (

    <div>
      <div className="links">
        <Link to="/">

        </Link>

      </div>
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>SKU</Label>
        <Input name="sku" />
      </InputArea>
      <InputArea>
        <Label>Name</Label>
        <Input name="name" type="name" />
      </InputArea>
      <InputArea>
        <Label>Price</Label>
        <Input name="price" />
      </InputArea>
      <InputArea>
        <Label>Tipo do produto</Label>
        <Input name="typeproduct" type="name" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
    </div>
  );
};

export default Form;
