const DeleteButton = ({ onClick, children }) => (
    <button className="
    border-2 bg-gray-200 border-gray-300
    hover:bg-gray-300 hover:border-gray-400
    mr-2
    border-none
    p-1
    rounded-lg
    dark:text-white
    dark:bg-red-800
    dark:border-none
    dark:hover:bg-red-700
    " onClick={onClick}>{children}</button>
);

export default DeleteButton