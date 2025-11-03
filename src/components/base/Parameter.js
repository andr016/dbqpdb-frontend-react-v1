import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Parameter = ({ onChange, type, value, name, parameterType, children }) => {
    if (parameterType === "text") {
        return (_jsxs("div", { children: [_jsx("p", { children: name }), _jsx("input", { className: "\r\n            dark:bg-gray-800\r\n            dark:text-gray-300\r\n            p-1\r\n            mr-2\r\n            w-xl\r\n            rounded-lg\r\n          ", type: type, onChange: onChange, value: value })] }));
    }
    else {
        return (_jsxs("div", { children: [_jsx("p", { children: name }), _jsx("select", { className: "\r\n            dark:bg-gray-800\r\n            dark:text-gray-300\r\n            p-1\r\n            mr-2\r\n            w-20\r\n            rounded-lg\r\n          ", type: type, value: value, onChange: onChange, children: children })] }));
    }
    // Return null or other parameter types as needed
    return null;
};
export default Parameter;
