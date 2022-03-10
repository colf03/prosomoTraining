import React, { Component, useState, useEffect } from "react";
import { AutoForm } from "uniforms-material";
import { bridge as schema } from "../../apollo/contactSchema";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { refetch } from "./Contact.jsx";
import { useHistory  } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import  ContactModel  from "./../../model/Contact";
import {GET_CONTACT, UPDATE_CONTACT, queriesToReftech} from "../../apollo/contactQuery";

const EditContact = () => {
	const [send, setSended] = useState("");
	let history = useHistory();

	const contactModel= new ContactModel();

	const id = useParams().id;
	const sended = () => {
		setSended("Le contact a été mis à jour.");
	};

	const seeMessage = () => {
		setSended("");
	};
	const dataNotFound = 0;
	const { loading, error, data } = useQuery(GET_CONTACT, {
		variables: { id: id }
	});

	useEffect(async () => {
		if (error != undefined)
			history.push("/404");
	}, [error]);
	const [updateContact, { dataUpdate, loadingUpdate, errorUpdate }] = useMutation(UPDATE_CONTACT,{update(cache) {
		queriesToReftech.map(row =>{
			cache.evict({ id: 'ROOT_QUERY', fieldName: row });
		});
	   }});

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
					model={data?.getContact ? data.getContact : contactModel}
					modelTransform={(mode, model) => {
						// This model will be passed to the fields.
						if (mode === 'form') {
							if(model.postalCode!='' && model.postalCode.charAt(3)!=" " && model.postalCode.length > 3){
								model.postalCode=model.postalCode.slice(0, 3) + " " + model.postalCode.slice(3);
							}
						}

						// This model will be submitted.
						if (mode === 'submit') {

							//console.log(model);
						}

						// This model will be validated.
						if (mode === 'validate') {
							//console.log(model);
						}

						// Otherwise, return unaltered model.
						return model;
					  }}
					onSubmit={(value) => {
						updateContact({
							variables: { id: id, input: value },
						});
						sended();
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
