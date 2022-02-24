import React, { useState } from "react";
import { AutoForm, TextField, SubmitField } from "uniforms-material";
import { bridge as schema } from "../../apollo/contactSchema";
import { useQuery, gql, useMutation } from "@apollo/client";
import { refetch } from "./Contact.jsx";
import { Helmet } from "react-helmet-async";
const ADD_CONTACT = gql`
	mutation CreateContact($input: ContactInput) {
		createContact(input: $input) {
			firstName
			lastName
			email
			phone
			city
			province
			postalCode
			country
			comment
		}
	}
`;

const FormContact = () => {
	const [addContact, { data, loading, error }] = useMutation(ADD_CONTACT);
	const [send, setSended] = useState("");
	const sended = () => {
		setSended("Le contact a été ajouté.");
	};
	return (
		<>
			<Helmet>
				<title>Prosomo : Ajouter contact </title>
				<meta name="description" content="Add Contact" />
			</Helmet>
			<div>
				<AutoForm
					ref={(ref) => {
						fRef = ref;
					}}
					placeholder={true}
					schema={schema}
					onSubmit={(model) => {
						addContact({ variables: { input: model } });
						sended();
						fRef.reset();
						refetch();
					}}
				></AutoForm>
				<p className="formResult">{send}</p>
			</div>
		</>
	);
};

export default FormContact;
