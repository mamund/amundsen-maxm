const express = require('express');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(express.json());

app.use('/', todoRoutes);

// error handler
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Baseline API listening on port ${PORT}`);
});
