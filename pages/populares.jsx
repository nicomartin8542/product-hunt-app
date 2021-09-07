import React from "react";
import {css} from "@emotion/react";
import Layout from "../components/layouts/Layout";
import DetalleProducto from "../components/DetalleProducto";
import useProductos from "../hooks/useProductos";

export default function Populares() {
	const {products, error} = useProductos("votos");

	if (products.length === 0 && !error)
		return (
			<p
				css={css`
					text-align: center;
					margin-top: 7rem;
					font-size: 3rem;
				`}
			>
				Cargando....
			</p>
		);

	return (
		<div>
			<Layout>
				<div className="listado-productos">
					<div className="contenedor">
						<ul className="bg-white">
							{products.map((product) => (
								<DetalleProducto key={product.id} product={product} />
							))}
						</ul>
					</div>
				</div>
			</Layout>
		</div>
	);
}
