const express = require('express');
const todoItemsRouter = express.Router();

const todoItemsController = require("../controllers/todoItemsController");

todoItemsRouter.post("/", todoItemsController.createTodoItem);
todoItemsRouter.get("/", todoItemsController.getTodoItem);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
todoItemsRouter.put("/:id", todoItemsController.markCompleted);

module.exports = todoItemsRouter;
