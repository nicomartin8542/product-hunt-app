import React, {Fragment, useContext} from "react";
import Link from "next/link";
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import Buscador from "../ui/Buscador";
import Navegacion from "../layouts/Navegacion";
import Boton from "../ui/Boton";
import {FirebaseContext} from "../../firebase";
import {useRouter} from "next/router";

const ContenedorHeader = styled.div`
	max-width: 1200px;
	width: 95%;
	margin: 0 auto;
	@media (min-width: 768px) {
		display: flex;
		justify-content: space-between;
	}
`;

const Logo = styled.p`
	color: var(--narajna);
	font-size: 4rem;
	line-height: 0;
	font-weight: 700;
	font-family: "Roboto", serif;
	margin-right: 2rem;

	&:hover {
		cursor: pointer;
	}
`;

const Header = () => {
	//Recupero variables del constext
	const {firebase, usuario} = useContext(FirebaseContext);
	const router = useRouter();

	//Cierro sesion
	const cerrarSesion = () => {
		router.push("/");
		firebase.cerrarSesion();
	};

	return (
		<header
			css={css`
				border-bottom: 2px solid var(--gris3);
				padding: 1rem 0;
			`}
		>
			<ContenedorHeader>
				<div
					css={css`
						display: flex;
						align-items: center;
					`}
				>
					<Link href="/" passHref>
						<Logo>P</Logo>
					</Link>

					<Buscador />
					<Navegacion />
				</div>

				<div
					css={css`
						display: flex;
						align-items: center;
					`}
				>
					{usuario ? (
						<Fragment>
							<p
								css={css`
									margin-right: 1rem;
								`}
							>
								Hola, {usuario.displayName}
							</p>
							<Boton bgColor="#DA552F" onClick={() => cerrarSesion()}>
								Cerrar Cesion
							</Boton>
						</Fragment>
					) : (
						<Fragment>
							<Link href="/login" passHref>
								<Boton bgColor="#DA552F">Login</Boton>
							</Link>

							<Link href="/crear_cuenta" passHref>
								<Boton>Crear usuario</Boton>
							</Link>
						</Fragment>
					)}
				</div>
			</ContenedorHeader>
		</header>
	);
};

export default Header;
