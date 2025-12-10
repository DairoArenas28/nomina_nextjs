
interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function ModalForm({ isOpen, onClose, children }: ModalFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[600px]">
        {children}

        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}