import Form from "../components/Form";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login() {
    return <Form route="/api/token/" method="login" />;
}

export default Login;
