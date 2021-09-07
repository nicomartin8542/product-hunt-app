import React, {useEffect, useState, useContext} from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {es} from "date-fns/locale";
import {useRouter} from "next/router";
import {FirebaseContext} from "../../firebase";
import Error404 from "../../components/layouts/404";
import Layout from "../../components/layouts/Layout";
import {Campo, InputSubmit} from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";

const Contenedor = styled.div`
	@media screen and (min-width: 768px) {
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 2rem;
	}
`;

const Escreador = styled.p`
	padding: 0.5rem 2rem;
	margin: 0;
	border-radius: 5px;
	text-transform: uppercase;
	background-color: #e1e1e1;
	font-weight: 700;
	text-align: center;
	display: inline-block;
`;

const Producto = () => {
	//State local
	const [producto, setProducto] = useState({});
	const [error, setError] = useState(false);
	const [comentario, setComentario] = useState({});
	const [consultaDB, setConsultarDB] = useState(true);

	//Context de Firebase
	const {firebase, usuario} = useContext(FirebaseContext);

	//Extraigo id de url con router
	const router = useRouter();
	const {
		query: {id},
	} = router;

	const {
		comentarios,
		create,
		descripcion,
		empresa,
		nombre,
		url,
		urlImage,
		votos,
		creador,
		haVotado,
	} = producto;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		if (id && consultaDB) {
			const productoQuery = await firebase.db.collection("productos").doc(id);
			const producto = await productoQuery.get();
			if (producto.exists) {
				setProducto(producto.data());
				setConsultarDB(false);
			} else {
				setError(true);
				setConsultarDB(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, consultaDB]);

	if (Object.keys(producto).length === 0 && !error)
		return (
			<p
				css={css`
					text-align: center;
					margin-top: 7rem;
					font-size: 3rem;
				`}
			>
				Cargando....
			</p>
		);

	//Accion de Votar
	const handleVotar = () => {
		if (!usuario) return router.push("/");

		if (error) return setConsultarDB(true);

		setConsultarDB(true);

		//Valido si el usuario ya voto
		if (haVotado.includes(usuario.uid)) return;

		const nuevoVoto = votos + 1;

		//Actualizo registro en firebase
		firebase.db
			.collection("productos")
			.doc(id)
			.update({votos: nuevoVoto, haVotado: [...haVotado, usuario.uid]});

		//Guardo votos en el state
		setProducto({
			...producto,
			votos: nuevoVoto,
		});
	};

	const handleChange = (e) => {
		setComentario({
			...comentario,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		//Valido que el usuario este autenticado
		if (!usuario) return router.push("/");

		//Valido que el producto exista
		if (error) return setConsultarDB(true);

		//Asigo valores extras al comentario
		comentario.idUsuario = usuario.uid;
		comentario.nombre = usuario.displayName;

		const comentariosNuevos = [...comentarios, comentario];

		//Agrego en firebase los comentarios
		firebase.db.collection("productos").doc(id).update({
			comentarios: comentariosNuevos,
		});

		//Guardo comentario nuevo en el state.
		setProducto({
			...producto,
			comentarios: comentariosNuevos,
		});

		setConsultarDB(true);

		//Formateo form
		e.target.reset();
	};

	//Valido que sea el creador para poder borrar
	const puedeBorrar = () => {
		//Valido que este logeado
		if (!usuario) return false;

		//Valido que sea el treador
		if (creador.id === usuario.uid) return true;
	};

	const handleDelete = () => {
		//Valido que este logeado
		if (!usuario) return router.push("/login");

		//valido que sea el creador del producto
		if (creador.id !== usuario.uid) return router.push("/");

		try {
			firebase.db.collection("productos").doc(id).delete();
			return router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<>
				{error ? (
					<Error404 />
				) : (
					<div className="contenedor">
						<h1
							css={css`
								text-align: center;
								font-family: "PT Sans", sans-serif;
								margin-bottom: 1rem;
							`}
						>
							{nombre}
						</h1>

						<Contenedor>
							<div>
								{/* =====================
							    Detalle del producto
						        ====================*/}
								<p>
									Publicado hace{" "}
									{formatDistanceToNow(new Date(create), {
										locale: es,
									})}
								</p>

								<p>
									Por {creador.nombre} de {empresa}
								</p>

								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={urlImage} alt="Imagen-prodcuto" />
								<p
									css={css`
										margin: 0;
									`}
								>
									{descripcion}
								</p>

								{/* =====================
							    Agregar Comentarios
						        ====================*/}
								{usuario && (
									<>
										<h2
											css={css`
												margin: 2rem 0;
											`}
										>
											Agraga tus comentarios
										</h2>
										<form onSubmit={handleSubmit}>
											<Campo>
												<textarea
													name="mensaje"
													id="mensaje"
													placeholder="Tu comentario aquí..."
													onChange={handleChange}
												></textarea>
											</Campo>

											<InputSubmit type="submit" value="Agregar" />
										</form>
									</>
								)}

								{/* =====================
							    Comentarios
						        ====================*/}
								<h2
									css={css`
										margin-top: 2rem;
									`}
								>
									Comentarios
								</h2>

								{comentarios.length === 0 ? (
									"Aun no hay comentarios"
								) : (
									<ul>
										{comentarios.map((comentario, i) => (
											<li
												key={i}
												css={css`
													border: 1px solid #e1e1e1;
													padding: 2rem;
												`}
											>
												<p
													css={css`
														font-family: Arial, Helvetica, sans-serif;
													`}
												>
													- {comentario.mensaje}
												</p>
												<p>
													Comentado por:{" "}
													<span
														css={css`
															font-weight: 700;
														`}
													>
														{comentario.nombre}
													</span>
												</p>
												{creador.id === comentario.idUsuario && (
													<Escreador>Creador</Escreador>
												)}
											</li>
										))}
									</ul>
								)}
							</div>

							{/* =====================
						    SIDEBAR
						====================*/}

							<aside>
								<Boton
									bgColor="#DA552F"
									href={url}
									mgRigth="0"
									mgbottom="1rem"
									target="_blank"
								>
									Visitar Pagina
								</Boton>

								{puedeBorrar() && (
									<Boton bgColor="#ee4057" mgRigth="0" onClick={handleDelete}>
										Borrar Producto
									</Boton>
								)}

								{usuario && (
									<div
										css={css`
											margin-top: 5rem;
										`}
									>
										<p
											css={css`
												text-align: center;
											`}
										>
											{votos} Votos
										</p>

										{!haVotado.includes(usuario.uid) ? (
											<Boton onClick={handleVotar}>Votar</Boton>
										) : (
											<p
												css={css`
													text-align: center;
													font-weight: 700;
												`}
											>
												Has votado por este producto
											</p>
										)}
									</div>
								)}
							</aside>
						</Contenedor>
					</div>
				)}
			</>
		</Layout>
	);
};

export default Producto;
