import express from "express";
import {
  index,
  renderNewForm,
  deleteCampground,
  renderEditForm,
  createCampground,
  updateCampground,
} from "../controllers/campgrounds.js";
import { isAuthor, isLoggedIn, validateCampground } from "../middleware.js";
import catchAsync from "../utils/catchAsync.js";
const router = express.Router();

router
  .route("/")
  .get(catchAsync(index))
  .post(isLoggedIn, validateCampground, catchAsync(createCampground));

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(catchAsync(showCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(renderEditForm));

export default router;
