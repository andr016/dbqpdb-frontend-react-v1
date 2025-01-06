const Button = ({ onClick, children }) => (
    <button className="border-2 bg-gray-200 border-gray-300
    hover:bg-gray-300 hover:border-gray-400" onClick={onClick}>{children}</button>
);

export default Button