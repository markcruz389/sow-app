const express = require("express");
const cors = require("cors");

const router = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(process.env.API_PORT, () => {
  console.log(`API server running on http://localhost:${process.env.API_PORT}`);
});
