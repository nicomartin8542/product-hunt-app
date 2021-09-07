import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

class Firebase {
	constructor() {
		//Ternario de una sola condicion === if (!app.apps.length) {app.initializeApp(firebaseConfig)}
		!app.apps.length && app.initializeApp(firebaseConfig);

		this.auth = app.auth();
		this.db = app.firestore();
		this.storage = app.storage();
	}

	//Registrar usuarios
	async registrar(nombre, email, password) {
		const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
			email,
			password,
		);

		await nuevoUsuario.user.updateProfile({
			displayName: nombre,
		});

		try {
			await nuevoUsuario.user.sendEmailVerification();
			console.log("se envio el mail. ");
		} catch (error) {
			console.log(error);
		}

		return nuevoUsuario;
	}

	//Login
	async login(email, password) {
		return await this.auth.signInWithEmailAndPassword(email, password);
	}

	//Cerrar sesion
	async cerrarSesion() {
		await this.auth.signOut();
	}
}

const firebase = new Firebase();

export default firebase;
