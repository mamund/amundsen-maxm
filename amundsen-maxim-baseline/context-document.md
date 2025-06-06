# Amundsen's Maxim Project – Context Kit

This document provides a comprehensive context kit for working with the **Amundsen's Maxim baseline API project** and its future variants. It consolidates all key decisions, structure, conventions, and insights gathered so far.

---

## 🌐 Reference

**Website:** [https://www.amundsens-maxim.com/](https://www.amundsens-maxim.com/)

**Maxim:**

> "Your data model is not your object model is not your resource model is not your message model."

This principle guides the clean separation of concerns in API design.

---

## 📁 Project Structure (Baseline)

```
amundsen-maxim/
├── baseline/             # The clean, working implementation
│   ├── data/             # One file per todo (JSON)
│   ├── lib/
│   │   ├── data/         # File I/O, schema validation
│   │   ├── object/       # Default filling, data shaping
│   │   ├── resource/     # Express resource logic (input validation)
│   │   ├── message/      # HAL-style encoder with affordances
│   ├── routes/           # Express route definitions
│   ├── schemas/          # JSON Schemas for output validation
│   ├── validators/       # Code-based input validation (resource layer)
│   ├── tests/            # Jest + SuperTest test suite
│   ├── run-tests.sh      # Backup, test, restore data
│   ├── README.md         # Describes just the baseline folder
│   ├── narrative.md      # Describes the overall project
```

---

## ✅ Layer Summary

| Layer    | Purpose                             | Validation Approach            |
| -------- | ----------------------------------- | ------------------------------ |
| Data     | File-based storage                  | Output: JSON Schema            |
| Object   | Internal structure + defaults       | Input: Code validation         |
| Resource | API routing, argument shaping       | Input: Code validation         |
| Message  | Response formatting (HAL + actions) | Output: JSON Schema (optional) |

Each layer validates:

* What it **receives** (input via code)
* What it **sends** (output via schema)

---

## 🧪 Test Coverage

* Validates full CRUD:

  * `GET /todos`
  * `GET /todos/:id`
  * `POST /todos`
  * `PUT /todos/:id`
  * `DELETE /todos/:id`
* Ensures `_links` contain:

  * `self`, `collection`, `update`, `delete` on each item
  * `create` on the collection

### Test Helpers

* `run-tests.sh` handles data backup and restore
* Manual copying of `data/` folder also supported

---

## 🛠 Design Rules & Conventions

### Content Negotiation

* All routes use `res.locals.encoder()`
* HAL+JSON is default encoder (includes `_links` and `args`, `method`)

### Input/Output Validation

* **Code-based input validation** per layer
* **JSON Schema output validation** per layer
* `ajv` with `ajv-formats` (for `uuid`) required

### Data Integrity

* One file per todo, named by `id`
* Atomic overwrites

### Clean Layer Boundaries

* No direct leakage between layers
* Encoders selected per-request, not hardcoded
* Validators are explicit and owned by the receiving layer

---

## 📦 Project Variants (Planned)

* `mod-db`: add a new field to the data model (e.g., `priority`)
* `mod-object`: change object-level structure or behavior
* `mod-resource`: change how resources are exposed (e.g., grouping, nesting)
* `mod-message`: change the message format (e.g., Collection+JSON or CSV)

Each variant will:

* Start from the baseline
* Run independently
* Pass the same test suite (with possible extensions)

---

## 🧠 Lessons Learned (So Far)

* Ajv requires `ajv-formats` for formats like `uuid`
* HAL response construction must pass arrays directly to the encoder to trigger `encodeHALCollection`
* `updateTodoById` must be explicitly imported in resource layer when used
* Manually backing up and restoring `data/` is a simple and effective testing strategy

---

## ✅ How to Run the Project

```bash
npm install
node index.js

# To test
npm test
# Or use
./run-tests.sh
```

---

This context kit should be used at the beginning of any conversation or development sprint related to this series of projects. It defines the architectural contract, testing expectations, and layering rules that keep the project faithful to Amundsen's Maxim.

