import React from "react";
import { ApolloProvider } from "@apollo/client";
import Routes from "./../ui/Routes";
import Router from "./Router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function App({ client, location, context = {} }) {
	return (
		<ApolloProvider client={client}>
			<HelmetProvider context={context}>
				<Helmet>
					<title>Meteor React Apollo SSR</title>
				</Helmet>
				<Router location={location}>
					<nav className="App-header">
						<span>
							<Link to="/">Accueil</Link>
						</span>
						<span>
							<Link to="/info">Info</Link>
						</span>
						<span>
							<Link to="/contacts">Liste des contacts</Link>
						</span>
						<span>
							<Link to="/formContact">Ajouter un Contact</Link>
						</span>
					</nav>
					<Routes />
				</Router>
			</HelmetProvider>
		</ApolloProvider>
	);
}
