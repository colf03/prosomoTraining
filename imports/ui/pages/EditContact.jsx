import React, { Component, useState, useEffect } from "react";
import { AutoForm } from "uniforms-material";
import { bridge as schema } from "../../apollo/contactSchema";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { refetch } from "./Contact.jsx";
import { useHistory  } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const GET_CONTACT = gql`
	query GetContact($id: ID!) {
		getContact(_id: $id) {
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

const UPDATE_CONTACT = gql`
	mutation UpdateContact($id: ID!, $input: ContactInput) {
		updateContact(id: $id, input: $input) {
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

const EditContact = () => {
	const [send, setSended] = useState("");
	let history = useHistory();

	const id = useParams().id;
	const sended = () => {
		setSended("Le contact a été mis à jour.");
	};

	const seeMessage = () => {
		setSended("");
	};
	const dataNotFound = 0;
	const { loading, error, data } = useQuery(GET_CONTACT, {
		variables: { id: id },
	});

	useEffect(async () => {
		if (error != undefined)
			history.push("/404");
	}, [error]);
	const [updateContact, { dataUpdate, loadingUpdate, errorUpdate }] =
		useMutation(UPDATE_CONTACT);

	return (
		<>
			<Helmet>
				<title>Prosomo : Modifier contact </title>
				<meta name="description" content="Edit Contact" />
			</Helmet>
			<div>
				<AutoForm
					ref={(ref) => {
						fRef = ref;
					}}
					placeholder={true}
					schema={schema}
					model={data?.getContact ? data.getContact : []}
					onSubmit={(value) => {
						updateContact({
							variables: { id: id, input: value },
						});
						sended();
						refetch();
					}}
				/>
				<p className="formResult" onClick={seeMessage}>
					{send}
				</p>
			</div>
		</>
	);
};

export default EditContact;
