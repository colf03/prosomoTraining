
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
export const GET_CONTACT = gql`
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

export const UPDATE_CONTACT = gql`
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






export const  GET_CONTACTS_BY_POSTAL_CODE = gql`
	query getContactsByPostalCode($postalCodes : [String]){
		getContactsByPostalCode(postalCodes: $postalCodes ){
			_id
			postalCode
			total
		}
	}
`;


export const  GET_ALL_POSTAL_CODE = gql`
	query getAllPostalCodes{
		getAllPostalCodes
	}
`;


export const  GET_MAX_CONTACTS = gql`
	query getNumberContacts{
		getNumberContacts
	}
`;

export const  GET_CONTACTS_PAGINATION = gql`
	query getContactsPagination($limit: Int, $offset: Int){
		getContactsPagination(limit: $limit, offset: $offset ){
			_id
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

export const ADD_CONTACT = gql`
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

export const  DELETE_CONTACT = gql`
	mutation deleteContact($id: ID!) {
		deleteContact(_id: $id)
	}
`;

export const GET_CONTACTS_BY_PROVINCE = gql`
	query getContactsByProvince($provinces : [String]){
		getContactsByProvince(provinces: $provinces ){
			_id
			province
			total
		}
	}
`;


export const GET_ALL_PROVINCE = gql`
	query getAllProvinces{
		getAllProvinces
	}
`;



export const queriesToReftech= ["GetContact", "getContactsPagination", "getNumberContacts", "getContactsByProvince", "getAllProvinces", "getAllPostalCodes", "getContactsByPostalCode"];
