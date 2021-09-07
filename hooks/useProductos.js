import React, {useState, useEffect, useContext} from "react";

import {FirebaseContext} from "../firebase";

const useProductos = (orden) => {
	//State local
	const [products, addProducts] = useState([]);
	const [error, setError] = useState(false);

	//Variables del context
	const {firebase} = useContext(FirebaseContext);

	useEffect(() => {
		const getProducts = () => {
			firebase.db
				.collection("productos")
				.orderBy(orden, "desc")
				.onSnapshot(driveSnapshot);
		};

		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Guardo productos cargados en firebase
	function driveSnapshot(snapshot) {
		//Traigo array de firebase
		const products = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
		addProducts(products);
		products.length === 0 && setError(true);
	}

	return {
		products,
		error,
	};
};

export default useProductos;
