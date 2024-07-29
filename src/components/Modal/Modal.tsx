import "./Modal.styles.css";

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <div
      className={`main-modal fixed w-full h-full inset-0 z-50 overflow-hidden flex justify-center items-center animated ${
        isOpen ? "fadeIn" : "fadeOut"
      }`}
      style={{
        background: "rgba(0,0,0,0.5)",
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className="border border-gray-300 shadow-lg modal-container bg-white w-11/12 md:max-w-3xl mx-auto rounded-lg z-50">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center">
            <p className="text-xl font-semibold text-gray-800">{title}</p>
            <div className="modal-close" onClick={onClose}>
              <svg
                className="fill-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div className="modal-body text-base text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
