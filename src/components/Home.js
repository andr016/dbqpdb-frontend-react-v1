import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ROUTES } from "../routes/AppRoutes";
const Home = () => {
    return (_jsxs("div", { id: "homepage", children: [_jsx("h1", { className: "text-3xl font-bold underline", children: "welcome to city 17" }), _jsx("a", { href: ROUTES.SUBJECT, children: "Subjects" })] }));
};
export default Home;
