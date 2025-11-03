import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Button from "./base/Button";
import H1 from "./base/H1";
import Input from "./base/Input";
import axios from "axios";
import ApiClient from "./ApiClient";
import Cookies from 'universal-cookie';
const LoginPage = () => {
    const apiClient = new ApiClient();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const login = () => {
        // const loginInfo = {
        //     user: user,
        //     pass: pass
        // }
        const formData = new FormData();
        formData.append("user", user);
        formData.append("pass", pass);
        axios
            .post(new URL("login", apiClient.baseUrl).href, formData)
            .then((res) => {
            console.log(res);
            const cookies = new Cookies();
            cookies.set('token', res.data.token, { path: '/' });
            //console.log(cookies.get('token')); // Я ПАКМАН ПАЦАНЫ ВОТ ЭТА ЗАГАГУЛИНА ЭТО МОЁ ЛИЦО???? ОНО ВЫГЛЯДИТ ВОТ ТАК????
        });
    };
    return _jsxs("div", { children: [_jsx(H1, { children: "Log in" }), _jsxs("p", { className: "mb-2", children: [_jsx("p", { children: "Username" }), _jsx(Input, { value: user, onChange: (e) => { setUser(e.target.value); } }), _jsx("p", { children: "Password" }), _jsx(Input, { value: pass, type: "password", onChange: (e) => { setPass(e.target.value); } })] }), _jsx(Button, { onClick: login, children: "Log in" })] });
};
export default LoginPage;
