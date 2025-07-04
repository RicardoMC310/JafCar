import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useState } from "react";
import "../scss/login.scss";

const Login = () => {
	const [email, setEmail] = useState();
	const [passwd, setPasswd] = useState();
	const { login } = useAuthContext();
	const navigate = useNavigate();

	return (
		<div>

			<div className="container">

				<form>
					<h1>Login</h1>

					<div>
						<label htmlFor="email">seu email: </label>
						<input
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							type="email"
							name="email"
							placeholder="exemplo@gmail.com"
							required
						/>
					</div>

					<div>
						<label htmlFor="password">password: </label>
						<input
							value={passwd}
							onChange={(event) => setPasswd(event.target.value)}
							type="password"
							name="password"
							placeholder="sua senha: "
							required
						/>
					</div>

					<button onClick={async (event) => {
						event.preventDefault();
						await login(email, passwd);
						navigate("/", { replace: true });
					}}>Logar</button>

				</form>

			</div>

		</div>
	);
};

export default Login;