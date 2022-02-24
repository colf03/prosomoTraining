import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
	return (
		<>
			<Helmet>
				<title>Prosomo </title>
				<meta name="description" content="Not Found" />
			</Helmet>
			<div className="home">
				<h1>
					404 - Not Found : Le lien que vous avez entré n'éxiste pas.
				</h1>
				<Button variant="contained" className="linkButton">
					<Link to="/">Retour à l'accueil</Link>
				</Button>
			</div>
		</>
	);
};

export default NotFound;
