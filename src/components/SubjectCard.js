import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "./base/Link";
const SubjectCard = ({ src, subject_name, subject_id, primary_type, secondary_type }) => {
    return (
    //= ({src, subject_name, subject_id, primary_type, secondary_type}) => (
    _jsxs("div", { className: "items-center space-x-3 w-64 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 border-radius-100 cursor-pointer inline-flex ", onClick: (e) => window.location.href = "/subject/" + subject_id, children: [_jsx("img", { className: "w-20 h-20 rounded-l-lg", src: src }), _jsx("div", { className: "w-20", children: _jsx(Link, { href: `/subject/${subject_id}`, children: subject_name }) })] }));
};
export default SubjectCard;
