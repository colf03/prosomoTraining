import React, { Component, useState, useEffect } from "react";
import { AutoForm } from "uniforms-material";
import { bridge as schema } from "../apollo/contactSchema";
import { useQuery, useLazyQuery,  gql, useMutation } from "@apollo/client";
import {useParams} from "react-router-dom";
import {refetch} from "./Contact.jsx"
import { useNavigate } from "react-router-dom";
const GET_CONTACT = gql`
query GetContact ($id: ID!){
	getContact (_id : $id){
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

		const navigate = useNavigate();
		const [send, setSended] = useState("");

		const  id  = useParams().id;
		const sended = () =>{
			setSended("Le contact a été mis à jour.");
		}

		const seeMessage = () =>{
			setSended("");
		}
		const dataNotFound=0;
		const {loading, error, data} =  useQuery (GET_CONTACT, {variables : {id : id}});


		useEffect( async () => {
			if(error!=undefined)
				navigate("/error-404");
		}, [error]);

		const [updateContact, { dataUpdate, loadingUpdate, errorUpdate }] = useMutation(UPDATE_CONTACT);

		return (
			<div>
				<AutoForm
				ref={ref => {
					fRef= ref;
				  }}
				placeholder={true}
				schema={schema}
				model={data?.getContact?data.getContact : []}
				onSubmit={(value) =>  {
					delete value['__typename'];
					updateContact({ variables : { id: id, input : value}});
					sended();
					refetch();
				}}
				/>
				<p className="formResult" onClick={seeMessage}>
					{send}
				</p>
			</div>
		);
};
