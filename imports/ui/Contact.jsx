import React, {useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import {Link} from "react-router-dom";
const GET_CONTACTS = gql`
    {
        contacts: getContacts {
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
	mutation deleteContact($id : ID!) {
		deleteContact(_id : $id)
	}
`;


export const Contact = () => {

	export const { loading, error, data , refetch} = useQuery(GET_CONTACTS);
	const [deleteContactMutation, { dataDelete, loadingDelete, errorDelete }] = useMutation(DELETE_CONTACT);
	useEffect(() => {
	}, []);
	function deleteContact (id){
		deleteContactMutation({ variables : { id: id}});
		refetch();
	}


  return (
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
      	{data?.contacts?.map( row =>
        <TableRow
		key={'contact_'+row._id}
		id={row._id}
		sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
	  	>
		<TableCell component="th" scope="row">
		  {row.firstName} {row.lastName}
		</TableCell>
		<TableCell align="left">{row.email}</TableCell>
		<TableCell align="left">{row.phone}</TableCell>
		<TableCell align="left">{row.city}</TableCell>
		<TableCell align="left">{row.province}</TableCell>
		<TableCell align="left">{row.postalCode}</TableCell>
		<TableCell align="left">{row.country}</TableCell>
		<TableCell align="left">
			{row.comment?.map( (value, k) =>
				<li key={row._id+'_'+k}>{value}</li>
			)}
		</TableCell>
		<TableCell>
			 <Link to={"/editContact/"+row._id} ><span className='editContact' title='Modifier le contact' ><FontAwesomeIcon icon={faPencilAlt} /></span></Link>
			 <span className='editContact' title='Supprimer le contact' onClick={()=> deleteContact(row._id)} ><FontAwesomeIcon icon={faTrashAlt} /></span>
		</TableCell>
	  </TableRow>
      )}
	  </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};
