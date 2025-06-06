function createTodoObject(rawInput) {
  return {
    id: rawInput.id || require('crypto').randomUUID(),
    title: rawInput.title,
    done: typeof rawInput.done === 'boolean' ? rawInput.done : false,
    dateCreated: rawInput.dateCreated || new Date().toISOString()
  };
}

module.exports = { createTodoObject };
