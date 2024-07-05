if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import flash from "connect-flash";
import ejsMate from "ejs-mate";
import express, { static as static_, urlencoded } from "express";
import session from "express-session";
import methodOverride from "method-override";
import mongoose from "mongoose";
import passport from "passport";
import { join } from "path";

import campgroundRoutes from "./routes/campgrounds.js";
import reviewRoutes from "./routes/reviews.js";
import userRoutes from "./routes/users.js";

const port = process.env.PORT || 8080;

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(static_(join(__dirname, "public")));

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/toilink", campgroundRoutes);
app.use("/toilink/:id/reviews", reviewRoutes);

app.get("/", (_, res) => {
  res.render("main");
});
app.get("/home", (_, res) => {
  res.render("home");
});

app.all("*", (_, res, next) => {
  next(res.render("errorAll"));
});

app.use((err, _, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected!!");
    app.listen(port, () => {
      console.log("lets goo");
    });
  })
  .catch((err) => {
    console.log(err);
  });
