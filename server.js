const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const { authenticate } = require("./src/middlewares/authenticate");

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth/", authRoutes);
app.use("/api/user/", authenticate, userRoutes);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} `);
  });
});
