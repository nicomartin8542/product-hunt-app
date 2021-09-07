import styled from "@emotion/styled";

const Boton = styled.a`
	font-weight: 700;
	display: block;
	text-transform: uppercase;
	border: 1px solid #d1d1d1;
	border-radius: 0.5rem;
	padding: 0.8rem 2rem;
	margin-right: ${(props) => (props.mgRigth ? props.mgRigth : "1rem")};
	margin-bottom: ${(props) => (props.mgbottom ? props.mgbottom : "0")};
	text-align: center;

	background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
	color: ${(props) => (props.bgColor ? "white" : "#000")} !important;

	&:last-of-type {
		margin-right: 0;
	}

	&:hover {
		cursor: pointer;
	}
`;

export default Boton;
