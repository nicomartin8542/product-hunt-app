import React, {useState, useEffect} from "react";
import firebase from "../firebase";

const useAutenticacion = () => {
	const [usuarioAutenticado, setUsuarioAuth] = useState(null);

	useEffect(() => {
		const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
			//Retorno usuario que este logeado
			user ? setUsuarioAuth(user) : setUsuarioAuth(null);

			return () => unsuscribe();
		});
	}, []);

	return usuarioAutenticado;
};

export default useAutenticacion;
