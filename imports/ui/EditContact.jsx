import React, { Component, useState } from "react";
import { AutoForm } from "uniforms-material";
import { bridge as schema } from "../apollo/contactSchema";
import { useQuery, useLazyQuery,  gql, useMutation } from "@apollo/client";
import {useParams} from "react-router-dom";
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
/*
const [updateContact, { dataUpdate, loadingUpdate, errorUpdate }] = useMutation(UPDATE_CONTACT);
const { loading, error, data } =  useQuery (GET_CONTACT, {variables : {id : this.state.id}});

export class EditContact extends Component{
	constructor (){
		super();
		this.sended = this.sended.bind(this);
		this.seeMessage = this.seeMessage.bind(this);
		this.setId = this.setId.bind(this);
		this.updateContact = this.updateContact.bind(this);
		this.state = {
			id: 0,
			msg : "",
			update : updateContact
		}
	}

	componentDidMount() {
		let  id  = useParams().id;
		this.setId(id);
	}

	sended = () =>{
		this.setState({msg : "Le contact a été mis à jour."});
	}
	seeMessage = () =>{
		this.setState({msg : "Le contact a été mis à jour."});
	}

	setId = (newId) => {
		this.setState({id : newId});
	}


	render (){

		return(
			<div>
				<AutoForm
				ref={ref => {
					fRef= ref;
				  }}
				placeholder={true}
				schema={schema}
				model={data?.getContact?data.getContact : []}
				onSubmit={(value) =>  {
					this.updateContact({ variables : { id: id, input : value}});
					this.sended();
				}}
				/>
				<p className="formResult" onClick={seeMessage}>
					{send}
				</p>
			</div>
			);
	}


}
*/
export const EditContact = () => {
		let  id  = useParams().id;
		const [send, setSended] = useState("");
		const sended = () =>{
			setSended("Le contact a été mis à jour.");
		}
		const seeMessage = () =>{
			setSended("");
		}

		const { loading, error, data } =  useQuery (GET_CONTACT, {variables : {id : id}});
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
				}}
				/>
				<p className="formResult" onClick={seeMessage}>
					{send}
				</p>
			</div>
		);
};
