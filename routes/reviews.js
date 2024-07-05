import { Router } from "express";
import { createReview, deleteReview } from "../controllers/reviews.js";
import { isLoggedIn, isReviewAuthor, validateReview } from "../middleware.js";
import catchAsync from "../utils/catchAsync.js";

const router = Router({ mergeParams: true });
router.post("/", isLoggedIn, validateReview, catchAsync(createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

export default router;
