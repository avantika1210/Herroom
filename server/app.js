const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const cors = require("cors");
const businessRoutes = require("./routes/businessRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const orderRoutes = require("./routes/orderRoutes");





app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/user", userRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/notifications", notificationRoutes);
app.use("/api/orders", orderRoutes);




app.get("/", (req, res) => {res.send("HerRoom Backend is Live 🚀");});

app.post("/test", (req, res) => {res.json({ message: "POST works" });});

module.exports = app;