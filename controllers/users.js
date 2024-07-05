import User from "../models/user.js";

export function renderRegister(req, res) {
  res.render("users/register");
}

export async function register(req, res, next) {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username, password });
    const registeredUser = await user.save();
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Toi-Link!");
      res.redirect("/toilink");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
}

export function renderLogin(req, res) {
  res.render("users/login");
}

export function login(req, res) {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/toilink";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

export function logout(req, res) {
  req.logout();
  req.flash("success", "Goodbye!");
  res.redirect("/toilink");
}
