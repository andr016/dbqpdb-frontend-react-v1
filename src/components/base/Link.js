import { jsx as _jsx } from "react/jsx-runtime";
const Link = ({ href, onClick, children }) => (_jsx("a", { className: "text-blue-600 hover:text-blue-400 dark:text-gray-100 dark:hover:text-gray-300", href: href, onClick: onClick, children: children }));
export default Link;
