const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");

const indexRouter = require("./routes/index");
const pokemonsRouter = require("./routes/pokemons");
const usersRouter = require("./routes/users");
const oauthRouter = require("./routes/oauth");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/pokemons", pokemonsRouter);
app.use("/users", usersRouter);
app.use("/oauth", oauthRouter);

// Configure session middleware
app.use(
  session({ secret: "your_secret_key", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure OAuth2 strategy
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://github.com/login/oauth/authorize", // Replace with your provider's URL
      tokenURL: "https://github.com/login/oauth/access_token", // Replace with your provider's token URL
      clientID: "Ov23li57UFNu5kGzmKH1",
      clientSecret: "91984685923cdc7f8d59582e53aa821702c2c911",
      callbackURL: "http://localhost:3000",
    },
    (accessToken, refreshToken, profile, cb) => {
      // Save tokens or user info as needed
      return cb(null, { accessToken });
    }
  )
);

// Serialize and deserialize user info
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get("/auth", passport.authenticate("oauth2")); // Redirects to the provider's authorization page

app.get(
  "/auth/callback",
  passport.authenticate("oauth2", {
    failureRedirect: "/error",
  }),
  (req, res) => {
    res.send("OAuth2 Authentication Successful!");
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
