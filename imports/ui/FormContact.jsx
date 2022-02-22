import React, { useState } from "react";
import { AutoForm, TextField, SubmitField } from 'uniforms-material';
import { bridge as schema } from "../apollo/contactSchema";
import { useQuery, gql, useMutation } from "@apollo/client";
import {refetch} from "./Contact.jsx"
const ADD_CONTACT = gql`
	mutation CreateContact($input: ContactInput) {
		createContact(input : $input) {
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



export const FormContact = () => {
	const [addContact, { data, loading, error }] = useMutation(ADD_CONTACT);
	const [send, setSended] = useState("");
	const sended = () =>{
		setSended("Le contact a été ajouté.");
	}
	return (
		<div>
			<AutoForm
				ref={ref => {
					fRef= ref;
				}}
				placeholder={true}
				schema={schema}
				onSubmit={(model) =>{
					addContact({ variables : {input : model}});
					sended();
					fRef.reset();
					refetch();
				}}
			>
			</AutoForm>
			<p className="formResult">
				{send}
			</p>
		</div>
	);
};
