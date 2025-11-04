import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// always components
import TopBar from './components/TopBar';
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from './routes/AppRoutes';
function App() {
    return (_jsxs("div", { className: "w-full min-h-screen bg-gray-900 text-gray-200", children: [_jsx(TopBar, {}), _jsx("div", { className: "p-4 maxw-[1024px]", children: _jsx(Router, { children: _jsx(AppRoutes, {}) }) })] }));
}
export default App;
