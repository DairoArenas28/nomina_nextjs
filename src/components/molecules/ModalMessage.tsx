interface ModalMessageProps {
  message: string;
  onClose: () => void;
}

export function ModalMessage({ message, onClose }: ModalMessageProps) {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-700">{message}</p>

      <button 
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Aceptar
      </button>
    </div>
  );
}
