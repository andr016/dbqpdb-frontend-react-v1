import { jsxs as _jsxs } from "react/jsx-runtime";
// Component
const DeleteButton = ({ onClick, children, label }) => {
    return (_jsxs("button", { type: "button", onClick: onClick, className: "\r\n        border-2 \r\n        bg-gray-200 border-gray-300\r\n        hover:bg-gray-300 hover:border-gray-400\r\n        mr-2\r\n        border-none\r\n        p-1\r\n        rounded-lg\r\n        dark:text-white\r\n        dark:bg-red-800\r\n        dark:border-none\r\n        dark:hover:bg-red-700\r\n      ", children: [children, label] }));
};
export default DeleteButton;
