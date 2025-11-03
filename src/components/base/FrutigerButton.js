import { jsx as _jsx } from "react/jsx-runtime";
import * as styles from './FrutigerButton.css';
// Component
const FrutigerButton = ({ onClick, children, label }) => {
    return (_jsx("button", { className: styles.button, onClick: onClick, children: children }));
};
export default FrutigerButton;
