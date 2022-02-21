import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';
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

export const Contact = () => {
  const { loading, error, data } = useQuery(GET_CONTACTS);

  if (loading) return <p>En cours de chargement ...</p>;
  if (error) return <p>Erreur ⁉️</p>;

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
		key={row._id}
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
		</TableCell>
	  </TableRow>
      )}
	  </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};
