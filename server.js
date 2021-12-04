const express = require("express");
const dotenv = require("dotenv");
const Pool = require("./db.js");

dotenv.config();
const app = express();

Pool.connect().then(() => console.log("database connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const allTodos = await Pool.query("SELECT * FROM todo");
  res.send(allTodos.rows);
});

app.post("/create", async (req, res) => {
  const { description } = req.body;
  const createdTodo = await Pool.query(
    "INSERT INTO todo (description) VALUES($1) RETURNING *",
    [description]
  );
  res.send(createdTodo.rows);
});

app.get("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const todoById = await Pool.query("SELECT * FROM todo WHERE _id = $1", [id]);
  res.send(todoById.rows);
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updatedTodo = await Pool.query(
    "UPDATE todo SET description = $1 WHERE _id = $2 RETURNING *",
    [description, id]
  );
  res.send(updatedTodo.rows);
});

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Pool.query(
    "DELETE FROM todo WHERE _id = $1 RETURNING *",
    [id]
  );
  res.send(deletedTodo.rows);
});

app.delete("/todos/delete", async (req, res) => {
  const deletedTodo = await Pool.query("DELETE FROM todo");
  res.send(deletedTodo.rows);
});

app.listen(process.env.PORT);
