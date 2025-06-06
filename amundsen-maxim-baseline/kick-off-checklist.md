# ✅ Amundsen’s Maxim Variant Kickoff Checklist

Use this checklist at the start of any new conversation with an LLM to ensure full context and continuity.

---

## 🔹 1. Identify the Project

> **"This project is based on [Amundsen’s Maxim](https://www.amundsens-maxim.com/), where the data, object, resource, and message models are kept separate. Please load or reference the Baseline Context Kit."**

---

## 🔹 2. Upload the Baseline ZIP

Upload this file:
📦 `amundsen-maxim-baseline.zip`
*(Contains the baseline source code, test suite, narratives, and config)*

---

## 🔹 3. State the Variant You Want to Build

Choose one of the planned variants:

| Variant        | Description                                          |
| -------------- | ---------------------------------------------------- |
| `mod-db`       | Modify the data layer (e.g., add a `priority` field) |
| `mod-object`   | Change the object structure or default behavior      |
| `mod-resource` | Modify routes or resource exposure logic             |
| `mod-message`  | Change the message encoding format (e.g., CSV, C+J)  |

Example:

> “I want to implement `mod-db`, which adds a `priority` field to the todo schema and file format.”

---

## 🔹 4. Define Variant Goals (Optional)

Clarify any additional expectations:

* Must pass the same test suite?
* Should expose new affordances?
* Should support multiple encoders?

---

## 🛠 Optional: Supply Project Metadata (if no ZIP uploaded)

Paste `project.config.json` as a backup reference:

```json
{
  "name": "amundsen-maxim-baseline",
  "type": "layered-api",
  "layers": ["data", "object", "resource", "message"],
  "entryPoint": "index.js",
  "testCommand": "npm test",
  "testWrapper": "./run-tests.sh",
  "usesHypermedia": true,
  "defaultEncoding": "HAL+JSON",
  "maxim": "https://www.amundsens-maxim.com/"
}
```

