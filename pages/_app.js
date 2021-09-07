import "../styles/globals.css";
import "../styles/app.css";
import React from "react";
import firebase from "../firebase";
import FirebaseContext from "../firebase/context";
import useAutenticacion from "../hooks/useAutenticacion";

function MyApp({Component, pageProps}) {
	//Recupero sesion de usuario logeado
	const verificar = useAutenticacion();
	let usuario = null;

	if (verificar) {
		usuario = verificar.emailVerified ? verificar : null;
	}

	return (
		<FirebaseContext.Provider
			value={{
				firebase,
				usuario,
			}}
		>
			<Component {...pageProps} />
		</FirebaseContext.Provider>
	);
}

export default MyApp;
