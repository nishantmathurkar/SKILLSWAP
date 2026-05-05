require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use("/user", require("./routes/userRouter"));
app.use("/home", require("./routes/homeRouter"));
app.use("/swipe", require("./routes/swipeRouter"));
app.use("/admin", require("./routes/adminRouter"));
app.use("/", require("./routes/utilRouter"));

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});