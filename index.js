const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const morgan = require("morgan");

dotenv.config();
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is Running");
});

// app.use((req, res, next) => {
//   logger.info(`${req.method} ${req.url}`);
//   next();
// });
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()), // Log HTTP requests with winston
    },
  })
);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checklists", checklistRoutes);
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
