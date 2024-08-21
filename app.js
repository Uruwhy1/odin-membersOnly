const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport-config");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

// live-reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLivereload());

// database
const sequelize = require("./config/database");
const User = require("./models/user");
const Message = require("./models/message");

User.hasMany(Message, { foreignKey: "userId", as: "messages" });
Message.belongsTo(User, { foreignKey: "userId", as: "user" });

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.user = req.session.user; // make user data available in views
  next();
});

// routes
app.use("/", messageRoutes);
app.use("/", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
