const express = require("express");
const productRoutes = require("./apis/products/routes");
const connectDB = require("./db/database");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const cors = require("cors");
const path = require("path");
const shopRoutes = require("./apis/shops/routers");
const userRoutes = require("./apis/user/user.routes");
const passport = require("passport");
const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
const { localStrategy, jwtStrategy } = require("./middleware/passport");

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use((req, res, next) => {
  if (req.body.name === "Broccoli Soup")
    res.status(400).json({ message: "I HATE BROCCOLI!! KEEFY! " });
  else next();
});
app.use(cors());
// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shops", shopRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

const PORT = 8001;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
