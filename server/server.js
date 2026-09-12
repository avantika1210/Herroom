const app = require("./app");
const connectDB = require("./config/db");

require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 8000;
const copilotRoutes = require("./routes/copilot");
// ✅ ADD THESE (VERY IMPORTANT)
app.use("/api/business", require("./routes/businessRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/marketing", require("./routes/marketingRoutes"));
app.use("/api/insights", require("./routes/insightsRoutes"));
app.use("/api/copilot", copilotRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});