import React from "react";
import {css} from "@emotion/react";

const Error404 = ({msj}) => {
	return (
		<h1
			css={css`
				text-align: center;
				font-weight: 700;
				margin-top: 5rem;
				font-family: "PT Sans", sans-serif;
			`}
		>
			{!msj ? "No existe el producto" : msj}
		</h1>
	);
};

export default Error404;
