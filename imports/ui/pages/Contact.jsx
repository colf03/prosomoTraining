import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Paper,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const GET_CONTACTS = gql`
	{
		contacts: getContacts{
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

const GET_MAX_CONTACTS = gql`
	query getNumberContacts{
		getNumberContacts
	}
`;

const GET_CONTACTS_PAGINATION = gql`
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

const DELETE_CONTACT = gql`
	mutation deleteContact($id: ID!) {
		deleteContact(_id: $id)
	}
`;

const Contact = () => {
	const [offset, setOffset] = useState(0);
	const items_per_page = 5;
	const actual_page=1;
	const allPage = [1];

	let  { loading, error, data} = useQuery(GET_CONTACTS_PAGINATION, { variables : { 'limit' :  items_per_page, 'offset' : offset }, fetchPolicy:"cache-and-network"});
	const [deleteContactMutation, { dataDelete, loadingDelete, errorDelete }] = useMutation(DELETE_CONTACT, {refetchQueries: [GET_CONTACTS_PAGINATION]});
	const  maxContact = useQuery(GET_MAX_CONTACTS);

	if(maxContact?.data?.getNumberContacts){
		var currentPage=1;
		for (var i = items_per_page; i < maxContact.data.getNumberContacts; i=i+items_per_page) {
			allPage.push(currentPage+1);
			currentPage++;

		}

	}






	useEffect(() => {}, []);


	function deleteContact(id) {
		deleteContactMutation({ variables: { id: id } });
	}

	function switchPage(page) {
		setOffset((page-1)*5);
	}

	return (
		<>
			<Helmet>
				<title>Prosomo : Liste des contacts </title>
				<meta name="description" content="Contact list" />
			</Helmet>
			<div>
				<h2>Liste des contacts : </h2>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Nom</TableCell>
								<TableCell align="left">Courriel</TableCell>
								<TableCell align="left">téléphone</TableCell>
								<TableCell align="left">Ville</TableCell>
								<TableCell align="left">Province</TableCell>
								<TableCell align="left">Code postal</TableCell>
								<TableCell align="left">Pays </TableCell>
								<TableCell align="left">Commentaire </TableCell>
								<TableCell align="left">Action </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.getContactsPagination?.map((row) => (
								<TableRow
									key={"contact_" + row._id}
									id={row._id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.firstName} {row.lastName}
									</TableCell>
									<TableCell align="left">
										{row.email}
									</TableCell>
									<TableCell align="left">
										{row.phone}
									</TableCell>
									<TableCell align="left">
										{row.city}
									</TableCell>
									<TableCell align="left">
										{row.province}
									</TableCell>
									<TableCell align="left">
										{row.postalCode}
									</TableCell>
									<TableCell align="left">
										{row.country}
									</TableCell>
									<TableCell align="left">
										{row.comment?.map((value, k) => (
											<li key={row._id + "_" + k}>
												{value}
											</li>
										))}
									</TableCell>
									<TableCell>
										<Link to={"/editContact/" + row._id}>
											<span
												className="editContact"
												title="Modifier le contact"
											>
												<FontAwesomeIcon
													icon={faPencilAlt}
												/>
											</span>
										</Link>
										<span
											className="editContact"
											title="Supprimer le contact"
											onClick={() =>
												deleteContact(row._id)
											}
										>
											<FontAwesomeIcon
												icon={faTrashAlt}
											/>
										</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<div className='pageContainer'>
					{allPage.map((row) => (
						<span key={row}>
							<Button
								className="page"
								variant="contained"
								style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
								onClick={() =>switchPage(row)}
							>{row} </Button>
						</span>

					))}
				</div>

			</div>
		</>
	);
};

export default Contact;
