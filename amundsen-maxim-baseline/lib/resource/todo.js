const { validateTodoInput } = require('../../validators/resource/todo');
const { createTodoObject } = require('../object/todo');
const {
  saveTodo,
  getAllTodos,
  getTodoById,
  deleteTodoById,
  updateTodoById
} = require('../data/todos');

async function createTodoResource(req, res, next) {
  try {
    validateTodoInput(req.body);
    const todoObj = createTodoObject(req.body);
    const saved = await saveTodo(todoObj);
    const encoder = res.locals.encoder;
    const responseBody = encoder(saved, req);
    res.status(201).json(responseBody);
  } catch (err) {
    next(err);
  }
}

async function listTodosResource(req, res, next) {
  try {
    const todos = await getAllTodos();
    const encoder = res.locals.encoder;
    const responseBody = encoder(todos, req);
    res.json(responseBody);
  } catch (err) {
    next(err);
  }
}

async function getTodoResource(req, res, next) {
  try {
    const todo = await getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Not found" });
    const encoder = res.locals.encoder;
    res.json(encoder(todo, req));
  } catch (err) {
    next(err);
  }
}

async function deleteTodoResource(req, res, next) {
  try {
    const ok = await deleteTodoById(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function updateTodoResource(req, res, next) {
  try {
    const updated = await updateTodoById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    const encoder = res.locals.encoder;
    res.json(encoder(updated, req));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTodoResource,
  listTodosResource,
  getTodoResource,
  deleteTodoResource,
  updateTodoResource
};


