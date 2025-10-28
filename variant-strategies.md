### 🔧 Strategy for Creating and Teaching Variants

We're moving into the modular mutation phase of the Amundsen's Maxim project. Here's a clarified strategy for managing and teaching these changes.

---

## 🧩 Variant Rules

### ✅ 1. One Layer Per Variant
- Each `mod-*` example changes **only one layer**.
- All other layers use the untouched **baseline** logic.
- This ensures clean demonstrations of separation-of-concerns.

### ✅ 2. No Implied Order
- These variants are **not cumulative**.
- You do **not** need to apply `mod-db` before `mod-object`, etc.
- Each variant forks directly from the latest `baseline` (now includes `dateCreated`).

### ✅ 3. Fork for Teaching
- Every `mod-*` starts with a **copy of the baseline**.
- Only the relevant layer is edited.
- This makes diffs, explanations, and tests easy to isolate and explain.

---

## ⚠️ Mixing Variants (e.g. mod-db + mod-resource)

### Why It’s Tricky
- Even though each variant touches a single layer, **some variants may expect their layer’s change to be acknowledged elsewhere**.
- Example: `mod-db` adds a new field (`priority`) in the data layer, but:
  - The **object** layer may not know to fill or validate it.
  - The **message** layer may not know to expose it.

### Safe Mixing Requires:
- A clear **contract** (e.g. via shared schema or metadata) for optional fields.
- Minimal assumptions in each layer.
- Defensive programming: if `priority` is present, handle it; if not, fallback safely.

### Teaching Opportunity
- Mixing shows the importance of **interface contracts**.
- Teaches that loose coupling doesn’t mean no coordination — just **explicit**, not **implicit**, contracts.

---

## 🚀 Plan Going Forward
- ✅ Fork the updated baseline for each mod:
  - `mod-db` (e.g., adds `priority` to data)
  - `mod-object` (e.g., adds computed field like `daysOld`)
  - `mod-resource` (e.g., adds filtering by `done`, `dateCreated`)
  - `mod-message` (e.g., switch to Collection+JSON or CSV)
- 🧪 Keep test suite identical unless behavior changes
- 📦 Optionally create a `mod-mixed/` variant to explore layering pitfalls and harmonization challenges

