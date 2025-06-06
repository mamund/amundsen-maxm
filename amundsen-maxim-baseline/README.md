# Baseline Todo API – Amundsen's Maxim in Action

This is the **baseline implementation** for a cleanly layered Web API, designed to demonstrate and support [Amundsen’s Maxim](https://www.amundsens-maxim.com/):

> "Your data model is not your object model is not your resource model is not your message model."

## 📦 What This Is

This folder contains a complete working example of a **Todo API**, implemented in Node.js and Express. It’s organized into four separate and decoupled layers:

| Layer     | Role                                       |
|-----------|--------------------------------------------|
| `data/`   | Handles file-based persistence of todos     |
| `object/` | Provides default values and structure       |
| `resource/`| Defines the API behavior and validation   |
| `message/`| Handles response formatting and affordances |

## 🚀 Supported Endpoints

- `GET /todos` – list all todos
- `GET /todos/:id` – get a single todo
- `POST /todos` – create a new todo
- `PUT /todos/:id` – update a todo
- `DELETE /todos/:id` – delete a todo

All responses follow a **HAL-style hypermedia format** with `_links` and action affordances (`update`, `delete`, `create`).

## 🔁 Example

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Write project README"}'
```

Returns:
```json
{
  "id": "1234-abcd",
  "title": "Write project README",
  "done": false,
  "_links": {
    "self": { "href": "/todos/1234-abcd" },
    "collection": { "href": "/todos" },
    "update": { "href": "/todos/1234-abcd", "method": "PUT", "args": ["id", "title", "done"] },
    "delete": { "href": "/todos/1234-abcd", "method": "DELETE" }
  }
}
```

## ✅ Run & Test

Install dependencies:

```bash
npm install
```

Run the API:

```bash
node index.js
```

Run the test suite:

```bash
npm test
```

Or use the safe test runner:

```bash
./run-tests.sh
```

This script backs up your data before testing and restores it afterward.

## 🧠 Why It Matters

This project sets the foundation for a series of mutations (`mod-db`, `mod-object`, etc.) that demonstrate how **layered design** makes APIs safer to evolve. Each change is testable and isolated — thanks to the structure laid down in this baseline.

---

For the full philosophy behind this approach, see the top-level [`narrative.md`](./narrative.md) or visit [amundsens-maxim.com](https://www.amundsens-maxim.com/).
