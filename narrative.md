# Baseline Project Narrative: Amundsen's Maxim in Practice

Welcome! This project demonstrates how to build a clean, evolvable Web API using a layered design approach grounded in [Amundsen's Maxim](https://www.amundsens-maxim.com/).

## 🧠 What is Amundsen’s Maxim?

> "Your data model is not your object model is not your resource model is not your message model."

This maxim reminds API designers and developers to keep clear **boundaries** between the internal parts of a system and the external contract it offers. You can read more at [amundsens-maxim.com](https://www.amundsens-maxim.com/).

## ✅ What's in the Baseline Project?

This project implements a simple **Todo List API** using Node.js and Express, structured in **four clean layers**:

| Layer     | Purpose                                   |
|-----------|-------------------------------------------|
| `data`    | Reads/writes JSON records to the file system |
| `object`  | Shapes and validates internal object structure |
| `resource`| Implements the REST API routes (`/todos`)     |
| `message` | Encodes the response, including HAL-style `_links` and action metadata |

Each layer is:
- Independently testable
- Internally validated (input via code, output via JSON Schema)
- Fully decoupled from the others

## 🔄 Why This Matters

Because of this clean separation, **we can safely change one layer without breaking the others**. For example:
- Change the database format (mod-db)
- Add computed fields or defaults (mod-object)
- Rearrange the resource paths (mod-resource)
- Switch message formats (mod-message)

To prove this, we’ve included a small **automated test suite** you can run at any point to ensure everything still works:
```bash
npm install
npm test
```

You can also use the optional script:
```bash
./run-tests.sh
```

## 🧪 Projects in This Collection

This folder is just the **baseline**. In this series, you’ll also find:

- `mod-db`: changing the file structure
- `mod-object`: modifying internal object rules
- `mod-resource`: altering how the API exposes data
- `mod-message`: switching response formats or hypermedia types

Each one runs independently and is built to show how the maxim helps preserve system integrity even as things change.

---

Thanks for exploring this project. The best way to appreciate Amundsen’s Maxim is to **see it in action**, and that’s exactly what this series provides.
