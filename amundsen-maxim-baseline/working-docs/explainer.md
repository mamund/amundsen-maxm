## ✅ What to Supply to the LLM

### 1. **Project Context Kit (copy/paste this or upload as text)**

You can either:

* **Paste the contents of the `Baseline Context Kit`**, or
* Say:

  > “This is part of the *Amundsen’s Maxim* project. Please load the Baseline Context Kit.”
  > (Assuming it's already stored in memory from this conversation history)

---

### 2. **The Clean Baseline ZIP (upload once per new session)**

Upload `amundsen-maxim-baseline.zip` so the LLM has:

* The working code
* The test suite
* README + narrative
* Project config (`project.config.json`)

💡 This is important because ZIPs aren’t remembered across sessions — they must be re-uploaded each time.

---

### 3. **The Variant You Want to Build**

Be explicit:

> “I want to create `mod-db` — a version of the API where we add a `priority` field to the data model and preserve all tests.”

Or:

> “Let’s build `mod-object` by changing how defaults are applied in the object layer.”

---

### 🧠 Bonus: Command Line Flags or Goals (Optional)

If you want the variant to:

* Expose new affordances
* Add encoding formats
* Evolve the schema, etc.

State it clearly up front. E.g.:

> “I want the message layer to switch to Collection+JSON for the `mod-message` variant, while still supporting the test suite.”

---

## 🧩 TL;DR: Just Bring These

| Requirement                   | Description                             |
| ----------------------------- | --------------------------------------- |
| `Baseline Context Kit`        | Paste or refer to it by name            |
| `amundsen-maxim-baseline.zip` | Upload it for code + tests access       |
| Intent/variant                | What you want to build (e.g., `mod-db`) |

---

Let me know if you’d like a one-page `kickoff checklist` to use as a template when resuming this work in a new session.

