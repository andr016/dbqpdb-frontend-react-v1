const Button = ({ onClick, children }) => (
    <button className="
    border-2 bg-gray-200 border-gray-300
    hover:bg-gray-300 hover:border-gray-400
    
    border-none
    p-1
    rounded-lg
    dark:text-white
    dark:bg-gray-600
    dark:border-none
    dark:hover:bg-gray-700
    " onClick={onClick}>{children}</button>
);

export default Button