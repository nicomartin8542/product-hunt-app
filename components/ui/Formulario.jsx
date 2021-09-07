import styled from "@emotion/styled";

export const Form = styled.form`
	max-width: 600px;
	width: 95%;
	margin: 5rem auto 5rem auto;

	fieldset {
		margin: 2rem auto;
		border: 1px solid #e1e1e1;
		font-size: 2rem;
		padding: 2rem;
	}
`;

export const Campo = styled.div`
	margin-bottom: 2rem;
	display: flex;

	label {
		flex: 0 0 120px;
		font-size: 1.8rem;
		font-weight: 700;
	}

	textarea {
		height: 200px;
		width: 100%;
	}

	input[id="imagen"] {
		width: 100%;
	}

	.container-error {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.container-error input,
	textarea {
		padding: 1rem;
		border-radius: 5px;
	}

	.container-error p {
		margin-top: 1rem;
	}
`;

export const InputSubmit = styled.input`
	background-color: var(--narajna);
	width: 100%;
	padding: 1.5rem;
	text-align: center;
	color: #fff;
	font-size: 1.8rem;
	text-transform: uppercase;
	border: none;
	font-family: "PT Sans", sans-serif;
	font-weight: 700;
	border-radius: 5px;

	&:hover {
		cursor: pointer;
	}
`;

export const Errors = styled.p`
	color: red;
	font-family: "PT Sans", sans-serif;
	font-weight: 700;
	font-size: 1.4rem;
	text-align: ${(props) => (props.align ? props.align : "left")};
	text-transform: uppercase;
	margin: 0;
`;
