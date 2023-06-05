import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBookingThunk } from "../../store/booking";

function CancelBookingModal({ bookingId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [error, setError] = useState("");

  const handleCancelBooking = async () => {
    try {
      const data = await dispatch(deleteBookingThunk(bookingId));
      if (data) {
        setError(data.message);
      } else {
        closeModal();
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="delete-spot-container">
      <h3 className="confirm-title">Confirm Cancel</h3>
      <p>Are you sure you want to cancel this booking?</p>
      {error && <p className="error">{error}</p>}
      <div>
        <button className="yes" onClick={handleCancelBooking}>
          Yes (Cancel booking)
        </button>
      </div>
      <div>
        <button className="no" onClick={closeModal}>
          No (Keep Booking)
        </button>
      </div>
    </div>
  );
}

export default CancelBookingModal;
