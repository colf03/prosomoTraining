import React, { Component } from "react";
import { AutoForm } from "uniforms-material";
import { bridge as schema } from "../apollo/contactSchema";
import { useQuery, gql, useMutation } from "@apollo/client";

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
	return (
		<div>
			<AutoForm
				placeholder={true}
				schema={schema}
				onSubmit={(model) =>
					addContact({ variables : {input : model}})
				}
			/>
		</div>
	);
};
