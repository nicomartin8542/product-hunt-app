export default function validaCrearProducto(values) {
	let errors = {};

	//Valido nombre
	!values.nombre && (errors.nombre = "El nombre es obligatorio");

	//valido email
	!values.empresa && (errors.empresa = "El empresa es obligatorio");

	//Valido password
	!values.url
		? (errors.url = "El URL es oblitagorio")
		: !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)
		? (errors.url = "El url no es valida")
		: null;

	//VAlido description
	!values.descripcion && (errors.descripcion = "La descripcion es obligatoria");

	return errors;
}
