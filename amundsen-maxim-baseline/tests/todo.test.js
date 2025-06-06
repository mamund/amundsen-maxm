const request = require('supertest');
const express = require('express');
const todoRoutes = require('../routes/todo');

const app = express();
app.use(express.json());
app.use('/', todoRoutes);

describe('Todo API', () => {
  let createdId;

  test('GET /todos returns a list with create link', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body._links).toHaveProperty('create');
    expect(Array.isArray(res.body.items)).toBe(true);
  });
  
  test('POST /todos creates a new todo with links and dateCreated', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Test todo item' });

    expect(res.statusCode).toBe(201);

    // Core todo fields
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Test todo item');
    expect(res.body).toHaveProperty('done', false);
    expect(res.body).toHaveProperty('dateCreated');

    // Validate ISO 8601 format
    expect(() => new Date(res.body.dateCreated).toISOString()).not.toThrow();

    // Hypermedia affordances
    expect(res.body._links).toHaveProperty('self');
    expect(res.body._links).toHaveProperty('update');
    expect(res.body._links).toHaveProperty('delete');

    createdId = res.body.id;
  });


  test('GET /todos/:id returns todo with all HAL links', async () => {
    const res = await request(app).get(`/todos/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
    expect(res.body._links).toHaveProperty('self');
    expect(res.body._links).toHaveProperty('collection');
    expect(res.body._links).toHaveProperty('update');
    expect(res.body._links).toHaveProperty('delete');
  });

  test('PUT /todos/:id updates the todo but does not change dateCreated', async () => {
    // First, get the original todo to record the dateCreated
    const getRes = await request(app).get(`/todos/${createdId}`);
    const originalDate = getRes.body.dateCreated;

    const res = await request(app)
      .put(`/todos/${createdId}`)
      .send({ done: true, dateCreated: '2000-01-01T00:00:00Z' }); // client-supplied value should be ignored

    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true);

    // Ensure dateCreated has not changed
    expect(res.body.dateCreated).toBe(originalDate);

    // Hypermedia affordances remain intact
    expect(res.body._links).toHaveProperty('update');
  });

  test('DELETE /todos/:id removes the todo', async () => {
    const res = await request(app).delete(`/todos/${createdId}`);
    expect(res.statusCode).toBe(204);
  });
  

  test('GET /todos/:id after delete returns 404', async () => {
    const res = await request(app).get(`/todos/${createdId}`);
    expect(res.statusCode).toBe(404);
  });
});
