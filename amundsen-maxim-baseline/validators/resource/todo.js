function validateTodoInput(input) {
  if (!input.title || typeof input.title !== 'string') {
    throw new Error("Invalid input: 'title' is required and must be a string.");
  }
}

module.exports = { validateTodoInput };
