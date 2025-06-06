### ✅ Finalized Set of Four Independent Mods

Each of these variants changes only **one layer**, preserving Amundsen’s Maxim and making the system safe to evolve, teach, and compose.

---

## 1. `mod-db`: Add Persistent Field
- **Change:** Add a new field `priority` to each todo
- **Layer:** Data only
- **Teachable Insight:** Persistence evolves without requiring UI or messaging changes
- **Impact:**
  - Data files include `priority`
  - No change to object shaping or response format

---

## 2. `mod-object`: Add Computed Field
- **Change:** Add a computed `daysOld` field based on `dateCreated`
- **Layer:** Object only
- **Teachable Insight:** Internal logic enhancements can ship before exposure
- **Impact:**
  - Value exists on internal object
  - Not yet exposed by message layer or accepted in input

---

## 3. `mod-resource`: Add New Action
- **Change:** Add `PATCH /todos/:id/done` to mark as complete
- **Layer:** Resource only
- **Teachable Insight:** UI/API operations can be expanded without touching data or object logic
- **Impact:**
  - New endpoint added
  - Input is minimal (`{ done: true }`)
  - Uses existing update logic

---

## 4. `mod-message`: Add CSV Output Support
- **Change:** Support `Accept: text/csv` on collection responses
- **Layer:** Message only
- **Teachable Insight:** New formats can be layered without changing data models or API behavior
- **Impact:**
  - HAL remains default
  - CSV encoder added conditionally

---

Each variant:
- Starts from the same updated `baseline` (with `dateCreated`)
- Passes the same test suite unless extended
- Demonstrates clean separation and evolutionary safety

