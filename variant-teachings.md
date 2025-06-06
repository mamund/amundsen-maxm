---
title: "Design Philosophy: Teaching Amundsen’s Maxim Through Layered Variants"
audience: Instructors and Curriculum Developers
description: Key principles and practical scenarios for teaching layered API evolution using Amundsen’s Maxim.
---

# 🎓 Teaching Design Philosophy

This document summarizes the core teaching principles that underpin the modular API system based on **Amundsen’s Maxim**:

> "Your data model is not your object model is not your resource model is not your message model."

Use this as a reference when preparing lessons, designing variant exercises, or guiding learners through the implications of independent API layers.

---

## 🧹 Principle 1: Each Layer Evolves Independently

- Layers should **not assume** other layers will change with them.
- It's normal for one team to release an update while others lag behind.
- **No fixed release order.** Each variant (`mod-db`, `mod-object`, etc.) can be taught and deployed independently.

---

## ♻️ Example: Staggered Rollouts

| Layer     | Change Introduced                     | Notes                                         |
|-----------|----------------------------------------|-----------------------------------------------|
| Object    | Adds `daysOld()` computed field       | Internal logic only — no new data or API      |
| Message   | Begins displaying `daysOld` if present| Can use fallback if field is undefined        |
| Resource  | Later adds `?sort=daysOld` support    | Builds on message/object logic, not required  |

### Teaching Tip:
This sequence mirrors real API rollouts — updates happen **asynchronously**, not all-at-once.

---

## 🧱 Principle 2: One Layer, One Responsibility

Each layer has a **clearly bounded concern** — reducing coupling and allowing safe evolution:

- **Data Layer**
  - Owns **persistence**.
  - Responsible for loading and saving values to disk or storage.
  - Only this layer may introduce or modify stored fields.

- **Object Layer**
  - Owns **computed/transient fields** (e.g., `daysOld`, `isOverdue`).
  - Shapes internal logic but does not store or serialize fields.

- **Resource Layer**
  - Owns **API shape** and **field exposure logic**.
  - Chooses which fields to show/hide, how to group them, and in what order.

- **Message Layer**
  - Owns **serialization and encoding**.
  - Can format responses as JSON, CSV, XML, HTML, HAL, Collection+JSON, etc.

### Teaching Tip:
- Changes in one layer should never assume or require downstream compliance.
- Instead, use loose contracts and safe defaults when crossing layer boundaries.

---

## 🥪 Principle 3: Baselines Are Forked, Not Stacked

- All `mod-*` projects start from the **same clean baseline**.
- Changes are **not cumulative**.
- This ensures clear, focused lessons on each individual concern.

> Learners should never feel like they need to "remember the last 5 changes" — each mod is self-contained.

---

## 🧠 Teaching Moments

- A resource model may **filter or ignore** fields it doesn’t know.
- A message model may **choose to display** a value before or after it becomes "official".
- Schema mismatches are part of **API evolution** and should be discussed explicitly.
- Interface contracts (e.g. JSON Schema, openAPI) act as the **synchronization mechanism** between layers.

---

## ✅ Use This Document To:
- Frame variant lessons and highlight design tradeoffs
- Emphasize API stability through **layer decoupling**
- Provide real-world rollout examples and release independence
- Encourage thoughtful team coordination without tight coupling

---

Let me know if you want to turn this into a slide deck, interactive worksheet, or integrated instructor notes.

