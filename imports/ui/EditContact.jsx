import React, { Component } from "react";
import { AutoForm } from "uniforms-material";
import { bridge as schema } from "../apollo/contactSchema";
import { useQuery, useLazyQuery,  gql, useMutation } from "@apollo/client";
import {useParams} from "react-router-dom";
import  { Redirect } from 'react-router-dom'
const GET_CONTACT = gql`
query GetContact ($id: ID!){
	getContact (id : $id){
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
}`;

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




export const EditContact = () => {
		let  id  = useParams().id;
		console.log(id);
		//const [addContact, { data, loading, error }] = useMutation(ADD_CONTACT);
		const { loading, error, data } =  useQuery (GET_CONTACT, {variables : {id : id}});
		return (
			<div>
				<AutoForm
				placeholder={true}
				schema={schema}
				model={data?.getContact?data.getContact : []}
				onSubmit={(model) =>
					console.log(model)
					//addContact({ variables : {input : model}})
				}
				/>
			</div>
		);
};
