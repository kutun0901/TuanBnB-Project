import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { removeSpotThunk } from "../../store/spots";
import './deleteSpotModal.css'

function DeleteSpotModal({spot}){
    const history = useHistory()
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteHandler = async () => {
        await dispatch(removeSpotThunk(spot.id))
        .then(closeModal())
        .then(history.push('/spots/current'))
    }

    return (
        <div className="delete-spot-container">
          <h3 className="confirm-title">Confirm Delete</h3>
          <p>
            Are you sure you want to remove this spot from the listings?
          </p>
          <div>
          <button className="yes" onClick={deleteHandler}>Yes (Delete Spot)</button>
          </div>
          <div>
          <button className="no" onClick={closeModal}>No (Keep Spot)</button>
          </div>
      </div>

    )
}

export default DeleteSpotModal;
