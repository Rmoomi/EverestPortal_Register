export default function ConfirmModal({ message, onConfirm, onCancel, isOpen }) {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-actions">
          <button
            className="btn-yes"
            onClick={() => onConfirm(true)} // user clicked Yes
          >
            Yes
          </button>
          <button
            className="btn-no"
            onClick={() => onCancel(false)} // user clicked Cancel
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
