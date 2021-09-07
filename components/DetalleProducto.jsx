import React from "react";

import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {es} from "date-fns/locale";
import Link from "next/link";

const Producto = styled.li`
	padding: 4rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e1e1e1;
`;

const Descripcion = styled.div`
	flex: 0 1 600px;
	display: grid;
	grid-template-columns: 1fr 3fr;
	column-gap: 2rem;
`;

const Comentarios = styled.div`
	margin-top: 2rem;
	display: flex;
	align-items: center;

	div {
		display: flex;
		align-items: center;
		border: 1px solid #e1e1e1;
		padding: 0.3rem 1rem;
		margin-right: 2rem;
	}

	img {
		width: 2rem;
		margin-right: 2rem;
	}

	p {
		font-size: 1.4rem;
		margin-right: 1rem;
		font-weight: 700;
		text-align: center;
		&::last-of-type {
			margin: 0;
		}
	}
`;

const Votos = styled.div`
	flex: 0 0 auto;
	text-align: center;
	border: 1px solid #e1e1e1;
	padding: 1rem 3rem;

	div {
		font-size: 2rem;
	}

	p {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
	}
`;

const Titulo = styled.a`
	font-size: 2rem;
	font-weight: 700;
	margin: 0;
	text-decoration: none;
	color: #000;

	:hover {
		cursor: pointer;
	}
`;

const TextoDescripcion = styled.p`
	font-size: 1.6rem;
	margin: 0;
	color: #888;
`;

const DetalleProducto = ({product}) => {
	const {
		id,
		comentarios,
		create,
		descripcion,
		empresa,
		nombre,
		url,
		urlImage,
		votos,
	} = product;

	return (
		<Producto>
			<Descripcion>
				<div>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={urlImage} alt="imagen-curso" />
				</div>
				<div>
					<Link href="/productos/[id]" as={`/productos/${id}`} passHref>
						<Titulo href="#">{nombre}</Titulo>
					</Link>

					<TextoDescripcion>{descripcion}</TextoDescripcion>
					<Comentarios>
						<div>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/static/img/comentario.png" alt="imagen-comentarios" />
							<p>{comentarios.length} Comentarios</p>
						</div>
						<p>
							Publicado hace{" "}
							{formatDistanceToNow(new Date(create), {
								locale: es,
							})}
						</p>
					</Comentarios>
				</div>
			</Descripcion>

			<Votos>
				<div>&#9650;</div>
				<p>{votos}</p>
			</Votos>
		</Producto>
	);
};

export default DetalleProducto;
