import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM products";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO products(`sku`, `name`, `price`, `typeproduct`) VALUES(?)";

  const values = [
    req.body.sku,
    req.body.name,
    req.body.price,
    req.body.typeproduct,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE products SET `sku` = ?, `name` = ?, `price` = ?, `typeproduct` = ? WHERE `sku` = ?";

  const values = [
    req.body.sku,
    req.body.name,
    req.body.price,
    req.body.typeproduct,
  ];

  db.query(q, [...values, req.params.sku], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM products WHERE `sku` = ?";

  db.query(q, [req.params.sku], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
