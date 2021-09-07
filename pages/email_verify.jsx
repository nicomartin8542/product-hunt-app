import React, {useContext, useState} from "react";
import {useRouter} from "next/router";
import Layout from "../components/layouts/Layout";
import styled from "@emotion/styled";
import {FirebaseContext} from "../firebase";

const Card = styled.div`
	padding: 2rem 0;
	background-color: #e1e1e1;
	margin: 0 auto;
	border-radius: 5px;
	text-align: center;

	p {
		text-align: center;
		font-weight: 700;
		font-family: "PT Sans", sans-serif;
		font-size: 1.8rem;
	}
`;

const EmailVerify = () => {
	const {usuario} = useContext(FirebaseContext);
	const router = useRouter();

	if (usuario) {
		if (usuario.emailVerified) return router.push("/");
	}

	return (
		<Layout>
			<div className="contenedor">
				<Card>
					<p>
						Se a enviado un mail para verificar usuario, Verifique y vuelva a
						intentar
					</p>
				</Card>
			</div>
		</Layout>
	);
};

export default EmailVerify;
