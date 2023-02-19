import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addReviewThunk, loadSpotReviewsThunk } from "../../store/reviews";
import { loadSingleSpotThunk } from "../../store/spots";
import "./postReviewModal.css";

function PostReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const {closeModal} = useModal();
  const [review, setReview] = useState("");
  const [star, setStar] = useState(0);
  const [hover, setHover] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const error = [];
    if (review.length < 10) error.push("Review needs to be at least 10 characters");
    if (star === 0) error.push("Please choose a valid rating");

    setValidationErrors(error);
  }, [review, star]);

  const postHandler = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length) return alert("Sorry! Check your form again");

    const payload = { stars: star, review };
    const newReview = await dispatch(addReviewThunk(payload, spotId))
    await dispatch(loadSpotReviewsThunk(spotId));
    await dispatch(loadSingleSpotThunk(spotId))

    if (newReview) {
        closeModal();
    }
  };

  return (
    <div className="post-review-container">
      <h3 className="confirm-title">How was your stay?</h3>
      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <textarea
          required
          type="text"
          className="review-input"
          placeholder="leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const starClass =
            index < hover || index < star ? "on" : "off";
          return (
            <button
              type="button"
              key={index}
              className={`rating-button ${starClass}`}
              onClick={() => setStar(index + 1)}
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(star)}
            >
              <i className="star fas fa-star enlarge"></i>
            </button>
          );
        })}
        <span>Stars</span>
      </div>
      <div>
        <button onClick={postHandler} type="submit" disabled={validationErrors.length > 0}>
          Submit Your Review
        </button>
      </div>
    </div>
  );
}

export default PostReviewModal;
