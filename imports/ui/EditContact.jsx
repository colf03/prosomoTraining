import React, { useState } from "react";
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

const UPDATE_CONTACT = gql`
	mutation UpdateContact($id : ID!, $input: ContactInput) {
		updateContact(id : $id, input : $input) {
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
		const [send, setSended] = useState("");
		const sended = () =>{
			setSended("Le contact  a été mis à jour.");
		}

		const { loading, error, data } =  useQuery (GET_CONTACT, {variables : {id : id}});
		const [updateContact, { dataUpdate, loadingUpdate, errorUpdate }] = useMutation(UPDATE_CONTACT);
		return (
			<div>
				<AutoForm
				placeholder={true}
				schema={schema}
				model={data?.getContact?data.getContact : []}
				onSubmit={(value) =>  {
					delete value['__typename'];
					updateContact({ variables : { id: id, input : value}})
				}}
				/>
				<p className="formResult">
					{send}
				</p>
			</div>
		);
};
