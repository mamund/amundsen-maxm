const express = require('express');
const {
  updateTodoResource,
  createTodoResource,
  listTodosResource,
  getTodoResource,
  deleteTodoResource
} = require('../lib/resource/todo');
const { selectEncoder } = require('../lib/message/encoder');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.encoder = selectEncoder(req);
  next();
});

router.post('/todos', createTodoResource);
router.get('/todos', listTodosResource);
router.get('/todos/:id', getTodoResource);
router.delete('/todos/:id', deleteTodoResource);

module.exports = router;

router.put('/todos/:id', updateTodoResource);
