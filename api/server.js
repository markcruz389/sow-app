const express = require("express");
const app = express();

app.get("/api/health", (req, res) => {
  res.send({ status: "OK" });
});

app.listen(process.env.API_PORT, () => {
  console.log(`API server running on http://localhost:${process.env.API_PORT}`);
});
