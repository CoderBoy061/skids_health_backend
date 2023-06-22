const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
require("./database/connection")();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));
const userRoutes = require('./routes/userRoutes');
const addDataRoutes = require('./routes/userData');


app.use('/api/user', userRoutes)
app.use("/api/userdata", addDataRoutes)
app.listen(PORT, () => console.log(`server is listening on http://localhost:${PORT}`));