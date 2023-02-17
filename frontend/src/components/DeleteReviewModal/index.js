import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";

function DeleteReviewModal({reviewId}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const spot = useSelector(state => state.spots.singleSpot);

    if (!spot) return null;

    const deleteHandler = async () => {

        spot.numReviews--;

        await dispatch(deleteReviewThunk(reviewId))
        .then(closeModal())
    }

    return (
        <div className="delete-review-container">
          <h3 className="confirm-title">Confirm Delete</h3>
          <p>
          Are you sure you want to delete this review?
          </p>
          <div>
          <button className="yes" onClick={deleteHandler}>Yes (Delete Review)</button>
          </div>
          <div>
          <button className="no" onClick={closeModal}>No (Keep Review)</button>
          </div>
      </div>
    )
}

export default DeleteReviewModal;
