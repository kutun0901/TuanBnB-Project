import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBookingThunk } from "../../store/booking";


function CancelBookingModal({ bookingId }) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();


    const handleCancelBooking = async () => {
        await dispatch(deleteBookingThunk(bookingId))
        .then(closeModal())
    }

    return (
        <div className="delete-spot-container">
          <h3 className="confirm-title">Confirm Cancel</h3>
          <p>
            Are you sure you want to cancel this booking?
          </p>
          <div>
          <button className="yes" onClick={handleCancelBooking}>Yes (Cancel booking)</button>
          </div>
          <div>
          <button className="no" onClick={closeModal}>No (Keep Booking)</button>
          </div>
      </div>
    )
}

export default CancelBookingModal;
