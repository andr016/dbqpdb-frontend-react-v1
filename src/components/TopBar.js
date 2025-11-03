import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "./base/Link";
const TopBar = () => {
    // will totally fix that later
    const version = 'dev 0.1';
    const handleClick = () => {
        alert(`Da Best Quality Personality Database\n\nVersion: ${version}`);
    };
    return _jsxs("div", { className: "space-x-10 px-4 py-2 bg-gray-300 dark:bg-gray-800", children: [_jsx(Link, { href: "/subject", children: "Subjects" }), _jsx(Link, { href: "/typology", children: "Typologies" }), _jsx(Link, { href: "/login", children: "Log in" }), _jsx(Link, { href: "#", onClick: handleClick, children: "About" })] });
};
export default TopBar;
