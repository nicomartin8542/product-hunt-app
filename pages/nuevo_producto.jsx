//Imports de React
import React, {useState, useContext} from "react";
import {useRouter} from "next/router";
import {css} from "@emotion/react";
import FileUploader from "react-firebase-file-uploader";

//Imports de components
import Layout from "../components/layouts/Layout";
import {Form, Campo, InputSubmit, Errors} from "../components/ui/Formulario";
import Error404 from "../components/layouts/404";

//Firebase
import {FirebaseContext} from "../firebase";

//Validaciones Form
import useValidacion from "../hooks/useValidacion";
import validaCrearProducto from "../validacion/validaCrearProducto";

const INITIAL_SATE = {
	nombre: "",
	empresa: "",
	/* imagen: "", */
	url: "",
	descripcion: "",
};

const NuevoProductos = () => {
	//router
	const router = useRouter();

	//state local
	const [error, setError] = useState("");

	//State de Imagen
	const [imagenFb, setImageFb] = useState({
		name: "",
		isUploading: false,
		progress: 0,
		urlImage: "",
	});

	//Hook personalizado
	const {values, errors, handleSubmit, handleChange, handleBlur} =
		useValidacion(INITIAL_SATE, validaCrearProducto, crearProducto);

	//Extraigo valiroes del value
	const {nombre, empresa, imagen, url, descripcion} = values;

	//Extraigo valores de imagenFb
	const {urlImage} = imagenFb;

	//Context para funcionalidad de firebase
	const {firebase, usuario} = useContext(FirebaseContext);

	//Submit para crear un producto
	async function crearProducto() {
		!usuario && router.push("/");

		//Producto cargado
		const producto = {
			nombre,
			empresa,
			url,
			urlImage,
			descripcion,
			votos: 0,
			comentarios: [],
			create: Date.now(),
			creador: {
				id: usuario.uid,
				nombre: usuario.displayName,
			},
			haVotado: [],
		};

		try {
			firebase.db.collection("productos").add(producto);
			return router.push("/");
		} catch (error) {
			console.log(error);
		}
	}

	//Funciones para el manejo de las imagenes en firebase
	const handleUploadStart = () =>
		setImageFb({...imagenFb, isUploading: true, progress: 0});

	const handleProgress = (progress) => setImageFb({...imagenFb, progress});

	const handleUploadError = (error) => {
		setImageFb({...imagenFb, isUploading: false});
		console.error(error);
	};

	const handleUploadSuccess = (filename) => {
		setImageFb({
			...imagenFb,
			name: filename,
			progress: 100,
			isUploading: false,
		});

		firebase.storage
			.ref("images")
			.child(filename)
			.getDownloadURL()
			.then((url) => {
				setImageFb({urlImage: url});
			});
	};

	return (
		<div>
			<Layout>
				{!usuario ? (
					<Error404 msj="Tiene que estar logeado para ver este contenido" />
				) : (
					<>
						<h1
							css={css`
								text-align: center;
								margin-top: 5rem;
							`}
						>
							Nuevo Producto
						</h1>
						<Form onSubmit={handleSubmit} noValidate>
							<fieldset>
								<legend>Datos generales</legend>
								<Campo>
									<label htmlFor="nombre">Nombre</label>
									<div className="container-error">
										<input
											type="text"
											id="nombre"
											placeholder="Tu nombre"
											name="nombre"
											values={nombre}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.nombre && <Errors>*{errors.nombre}</Errors>}
									</div>
								</Campo>

								<Campo>
									<label htmlFor="empresa">Empresa</label>
									<div className="container-error">
										<input
											type="text"
											id="empresa"
											placeholder="Tu Empresa o organizacion"
											name="empresa"
											values={empresa}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.empresa && <Errors>*{errors.empresa}</Errors>}
									</div>
								</Campo>

								<Campo>
									<label htmlFor="imagen">Imagen</label>
									<div className="container-error">
										<FileUploader
											accept="image/*"
											id="imagen"
											name="imagen"
											placeholder="Carge archivo"
											randomizeFilename
											storageRef={firebase.storage.ref("images")}
											onUploadStart={handleUploadStart}
											onUploadError={handleUploadError}
											onUploadSuccess={handleUploadSuccess}
											onProgress={handleProgress}
										/>
										{errors.imagen && <Errors>*{errors.imagen}</Errors>}
									</div>
								</Campo>

								<Campo>
									<label htmlFor="url">Url</label>
									<div className="container-error">
										<input
											type="url"
											id="url"
											name="url"
											values={url}
											placeholder="Ingresa la url de tu producto"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.url && <Errors>*{errors.url}</Errors>}
									</div>
								</Campo>
							</fieldset>

							<fieldset>
								<legend>Descripcion</legend>

								<Campo>
									<label htmlFor="descripcion">Descripcion</label>
									<div className="container-error">
										<textarea
											id="descripcion"
											name="descripcion"
											placeholder="Agrege una descripcion"
											values={descripcion}
											onChange={handleChange}
											onBlur={handleBlur}
										></textarea>
										{errors.descripcion && (
											<Errors>*{errors.descripcion}</Errors>
										)}
									</div>
								</Campo>
							</fieldset>

							{error && <Errors align="center">{error}</Errors>}

							<InputSubmit type="submit" value="Crear Producto" />
						</Form>
					</>
				)}
			</Layout>
		</div>
	);
};

export default NuevoProductos;
