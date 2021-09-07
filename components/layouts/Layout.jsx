/* eslint-disable @next/next/no-page-custom-font */
import React, {Fragment} from "react";
import Head from "next/head";
import Header from "./Header";

const Layout = (props) => {
	return (
		<Fragment>
			<Head>
				<title>Product Hunt Firebase y Next.js</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
					integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Header />

			<main>{props.children}</main>
		</Fragment>
	);
};

export default Layout;
