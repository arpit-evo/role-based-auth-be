const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./src/routes/main.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", mainRouter);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} `);
  });
});
