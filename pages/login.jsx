import React, {useState} from "react";
import {useRouter} from "next/router";
import Layout from "../components/layouts/Layout";
import {css} from "@emotion/react";
import {Form, Campo, InputSubmit, Errors} from "../components/ui/Formulario";

//Firebase
import firebase from "../firebase";

//Validaciones Form
import useValidacion from "../hooks/useValidacion";
import validaIniciarSesion from "../validacion/validaIniciarSesion";

const INITIAL_SATE = {
	email: "",
	password: "",
};

const Login = () => {
	//state local
	const [error, setError] = useState("");

	//router
	const router = useRouter();

	//Hook personalizado
	const {values, errors, handleSubmit, handleChange, handleBlur} =
		useValidacion(INITIAL_SATE, validaIniciarSesion, iniciarSesion);

	const {email, password} = values;

	async function iniciarSesion() {
		try {
			const usuario = await firebase.login(email, password);
			return !usuario.user.emailVerified
				? router.push("email_verify")
				: router.push("/");
		} catch (error) {
			console.log("hubo un error", error.message);
			setError(error.message);
		}
	}

	return (
		<div>
			<Layout>
				<h1
					css={css`
						text-align: center;
						margin-top: 5rem;
					`}
				>
					Iniciar Sesión
				</h1>
				<Form onSubmit={handleSubmit} noValidate>
					<Campo>
						<label htmlFor="email">Email</label>
						<div className="container-error">
							<input
								type="email"
								id="email"
								placeholder="Tu email"
								name="email"
								values={email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.email && <Errors>*{errors.email}</Errors>}
						</div>
					</Campo>

					<Campo>
						<label htmlFor="password">Password</label>
						<div className="container-error">
							<input
								type="password"
								id="password"
								placeholder="Tu Password"
								name="password"
								values={password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.password && <Errors>*{errors.password}</Errors>}
						</div>
					</Campo>

					{error && <Errors align="center">{error}</Errors>}

					<InputSubmit type="submit" value="Iniciar Sesión" />
				</Form>
			</Layout>
		</div>
	);
};
export default Login;
