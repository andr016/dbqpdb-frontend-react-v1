import Button from "./base/Button"
import H1 from "./base/H1"
import Input from "./base/Input"

const LoginPage = () => {
    return <div>
        <H1>Log in</H1>
        <p className="mb-2">
        <p>Username</p>
        <Input/>
        <p>Password</p>
        <Input type="password"/>
        </p>
        <Button>Log in</Button>
    </div>
}

export default LoginPage