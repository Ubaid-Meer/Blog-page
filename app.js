const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const connectDB = require("./configuration/db");

// Import routes
const authRoute = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Connect DB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // not "publics"

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session
app.use(
  session({
    secret: "blog-app-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// Make flash + session available in all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use("/auth", authRoute);
app.use("/posts", postRoutes);

// Homepage → show all posts
const Post = require("./models/Post");
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("home", { posts });
  } catch (err) {
    console.error(err);
    res.render("home", { posts: [] });
  }
});

const PORT = 9000;
app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`)
);
