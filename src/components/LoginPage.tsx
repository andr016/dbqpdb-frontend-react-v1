import { useState } from "react"
import Button from "./base/Button"
import H1 from "./base/H1"
import Input from "./base/Input"
import axios from "axios"
import config from "../Config"
import ApiClient from "./ApiClient"
import Cookies from 'universal-cookie';

const LoginPage = () => {
    const apiClient = new ApiClient()

    const [user, setUser] = useState<String>("")
    const [pass, setPass] = useState<String>("")

    const login = () => {
        // const loginInfo = {
        //     user: user,
        //     pass: pass
        // }

        const formData = new FormData()
        formData.append("user", user)
        formData.append("pass", pass)

        axios
            .post(new URL("login", apiClient.baseUrl).href, formData)
            .then((res)=>{
                console.log(res)
                const cookies = new Cookies();
                cookies.set('token', res.data.token, { path: '/' });
                //console.log(cookies.get('token')); // Я ПАКМАН ПАЦАНЫ ВОТ ЭТА ЗАГАГУЛИНА ЭТО МОЁ ЛИЦО???? ОНО ВЫГЛЯДИТ ВОТ ТАК????
            })
    }

    return <div>
        <H1>Log in</H1>
        <p className="mb-2">
        <p>Username</p>
        <Input value={user} onChange={(e) => {setUser(e.target.value)}}/>
        <p>Password</p>
        <Input value={pass} type="password" onChange={(e) => {setPass(e.target.value)}}/>
        </p>
        <Button onClick={login}>Log in</Button>
    </div>
}

export default LoginPage