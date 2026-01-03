const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoute = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on port 5000");
});
