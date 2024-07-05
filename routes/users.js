import { Router } from "express";
import passport from "passport";
import {
  login,
  logout,
  register,
  renderLogin,
  renderRegister,
} from "../controllers/users.js";
import catchAsync from "../utils/catchAsync.js";
const router = Router();

router.route("/register").get(renderRegister).post(catchAsync(register));

router
  .route("/login")
  .get(renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    login
  );

router.get("/logout", logout);

export default router;
