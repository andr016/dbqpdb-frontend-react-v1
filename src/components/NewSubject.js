import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from "axios";
import { useState } from "react";
import config from "../Config";
import Input from "./base/Input";
import ApiClient from "./ApiClient";
import FrutigerButton from "./base/FrutigerButton";
const NewSubject = ({ status }) => {
    const [subject_name, setName] = useState('');
    const apiClient = new ApiClient();
    const addSubject = () => {
        console.log(subject_name);
        axios.post(new URL(config.apiPrefix + "subject/add/", apiClient.baseUrl).href, { subject_name: subject_name }).then(res => {
            console.log(res);
            status;
        });
        setName('');
    };
    return (_jsxs("div", { children: [_jsx("h3", { className: "text-gray-400 mb-1", children: "Create new subject" }), _jsx(Input, { type: "text", onChange: (e) => setName(e.target.value) }), _jsx(FrutigerButton, { onClick: addSubject, children: "Add" })] }));
};
export default NewSubject;
