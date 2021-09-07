import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Layout from "../components/layouts/Layout";
import DetalleProducto from "../components/DetalleProducto";
import Error404 from "../components/layouts/404";

import useProductos from "../hooks/useProductos";

const Buscar = () => {
	//Obtengo valores de la url
	const router = useRouter();
	const {
		query: {q},
	} = router;

	//State local

	const [resultado, setResultado] = useState([]);
	const {products} = useProductos("create");

	useEffect(() => {
		const busqueda = q.toLocaleLowerCase();
		const filter = products.filter((prod) => {
			return (
				prod.nombre.toLocaleLowerCase().includes(busqueda) ||
				prod.descripcion.toLocaleLowerCase().includes(busqueda)
			);
		});

		setResultado(filter);
	}, [q, products]);

	return (
		<div>
			<Layout>
				{resultado.length === 0 ? (
					<Error404 msj="No hay resultados" />
				) : (
					<div className="listado-productos">
						<div className="contenedor">
							<ul className="bg-white">
								{resultado.map((product) => (
									<DetalleProducto key={product.id} product={product} />
								))}
							</ul>
						</div>
					</div>
				)}
			</Layout>
		</div>
	);
};

export default Buscar;
