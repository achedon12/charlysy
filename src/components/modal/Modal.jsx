const Modal = ({isOpen, onClose, children}) => {

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;