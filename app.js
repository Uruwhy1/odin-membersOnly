require("dotenv").config();
const express = require("express");
const session = require("express-session");

const passport = require("passport");
const passportConfig = require("./passport-config");

const app = express();
const expressLayouts = require("express-ejs-layouts");

const path = require("path");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

// database
const sequelize = require("./config/database");
const User = require("./models/user");
const Message = require("./models/message");

User.hasMany(Message, { foreignKey: "userId", as: "messages" });
Message.belongsTo(User, { foreignKey: "userId", as: "user" });

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

const PORT = process.env.PORT || 3000;

// middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.user = req.session.user; // make user data available in views
  next();
});

// routes
app.use("/", messageRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
