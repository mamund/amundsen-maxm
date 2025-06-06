const fs = require('fs/promises');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const schema = require('../../schemas/todo.json');

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(schema);

const DATA_DIR = path.join(__dirname, '../../data');

async function saveTodo(todo) {
  if (!validate(todo)) {
    throw new Error("Output validation failed: " + JSON.stringify(validate.errors));
  }

  const filePath = path.join(DATA_DIR, `${todo.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(todo, null, 2), 'utf-8');
  return todo;
}

async function getAllTodos() {
  const files = await fs.readdir(DATA_DIR);
  const todos = [];
  for (const file of files) {
    if (file.endsWith('.json')) {
      const raw = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
      const todo = JSON.parse(raw);
      if (validate(todo)) {
        todos.push(todo);
      }
    }
  }
  return todos;
}

async function getTodoById(id) {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const todo = JSON.parse(raw);
    if (!validate(todo)) {
      throw new Error("Invalid todo structure");
    }
    return todo;
  } catch (err) {
    return null;
  }
}

async function deleteTodoById(id) {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  try {
    await fs.unlink(filePath);
    return true;
  } catch {
    return false;
  }
}

async function updateTodoById(id, updates) {
  const existing = await getTodoById(id);
  if (!existing) return null;

  const updated = { ...existing, ...updates, id }; // preserve ID
  if (!validate(updated)) {
    throw new Error("Updated todo failed validation.");
  }

  const filePath = path.join(DATA_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

module.exports = {
  saveTodo,
  getAllTodos,
  getTodoById,
  deleteTodoById,
  updateTodoById
};
