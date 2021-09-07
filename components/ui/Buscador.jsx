import React, {useState} from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import {css} from "@emotion/react";

const InputText = styled.input`
	border: 1px solid var(--gris3);
	padding: 1rem;
	min-width: 300px;
`;

const InputSubmit = styled.button`
	height: 3rem;
	width: 3rem;
	display: block;
	background-size: 4rem;
	background-image: url("/static/img/buscar.png");
	background-repeat: no-repeat;
	position: absolute;
	right: 1rem;
	top: 1.5px;
	background-color: white;
	border: none;
	text-indent: -9999px;

	&:hover {
		cursor: pointer;
	}
`;
const Buscador = () => {
	const [busqueda, setBusqueda] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		//Valido campo
		if (busqueda.trim() === "") return;

		//redirecciono a componente busqueda
		Router.push({
			pathname: "/buscar",
			query: {q: busqueda},
		});
	};

	return (
		<form
			onSubmit={onSubmit}
			css={css`
				position: relative;
			`}
		>
			<InputText
				type="text"
				placeholder="Buscar productos"
				name="busqueda"
				id="busqueda"
				onChange={(e) => setBusqueda(e.target.value)}
			/>
			<InputSubmit type="submit">Buscar</InputSubmit>
		</form>
	);
};

export default Buscador;
