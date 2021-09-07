import React, {useState, useEffect} from "react";

const useValidacion = (initialSate, validate, fn) => {
	//States
	const [values, setValue] = useState(initialSate);
	const [errors, setErrors] = useState({});
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		if (submit) {
			//Verifico que no haya errores para ejecutar la funcion fn
			const noErrors = Object.keys(errors).length === 0;

			//Si no hay errores ejecuto la fn
			noErrors && fn();

			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errors]);

	//Funcion que se ejecuta conforme el usuario escriba algo
	const handleChange = (e) => {
		setValue({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	//Funcion que se ejecuta cuando el usuaruio hace submit
	const handleSubmit = (e) => {
		e.preventDefault();
		const errorsValidate = validate(values);
		setErrors(errorsValidate);
		setSubmit(true);
	};

	const handleBlur = () => {
		const errorsValidate = validate(values);
		setErrors(errorsValidate);
	};

	return {
		values,
		errors,
		handleSubmit,
		handleChange,
		handleBlur,
	};
};

export default useValidacion;
