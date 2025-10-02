// Properties
interface DeleteButtonProps {
  onClick: () => void;
  children?: React.ReactNode; // Optional: for icons, text, etc.
  label?: string;             // Optional: text label
}

// Component
const DeleteButton: React.FC<DeleteButtonProps> = ({ 
  onClick, 
  children, 
  label 
}) => {
    return (
    <button
      type="button"
      onClick={onClick}
      className="
        border-2 
        bg-gray-200 border-gray-300
        hover:bg-gray-300 hover:border-gray-400
        mr-2
        border-none
        p-1
        rounded-lg
        dark:text-white
        dark:bg-red-800
        dark:border-none
        dark:hover:bg-red-700
      "
    >
      {children}
      {label}
    </button>
  );
};

export default DeleteButton