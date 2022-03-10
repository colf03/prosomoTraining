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
import dynamic from 'next/dynamic';
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
let _ = require('lodash');
import {GET_CONTACTS_BY_POSTAL_CODE, GET_ALL_POSTAL_CODE} from "../../../apollo/contactQuery";

const ReportContactPostalCode = () => {
	const [postalcode, setPostalCode] = useState([]);
	const items_per_page = 5;
	const actual_page=1;
	const allPage = [1];

	let  { loading, error, data} = useQuery(GET_CONTACTS_BY_POSTAL_CODE, {  variables : { 'postalCodes' :  postalcode}});
	const  allPostalCode = useQuery(GET_ALL_POSTAL_CODE);
	let options= [{ value: 'all', label: 'Tous les codes postaux'}];
	if(allPostalCode?.data?.getAllPostalCodes){
		allPostalCode?.data?.getAllPostalCodes.map((row) => {
			options=_.concat(options,[{ value: row, label: row}]);
		});
	}







	useEffect(() => {}, []);


	function deleteContact(id) {
		deleteContactMutation({ variables: { id: id } });
	}

	const handleSelectChange = (values) => {
		var arrayPostalCode = [];
		if(values){
			values.map((row)=>{
				arrayPostalCode=_.concat(arrayPostalCode,row.value);
			});
		}
		setPostalCode(arrayPostalCode);
	}

	return (
		<>
			<Helmet>
				<title>Prosomo : Rapport Contacts </title>
				<meta name="description" content="Contact list" />
			</Helmet>
			<div>
				<h2>Rapport des contacts regroupé par codes postaux : </h2>
				<div className="selectContainer">
					<Select
					onChange={handleSelectChange}
					instanceId='select_province_contact'
					options={options}
					isMulti
					/>
				</div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Code postal</TableCell>
								<TableCell align="left">Nombre de contact</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.getContactsByPostalCode?.map((row) => (
								<TableRow
									key={"repportPostalCode_" + row._id}
									id={row._id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.postalCode}
									</TableCell>
									<TableCell align="left">
										{row.total}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<div className="totalReport">
					<span>
						Total :&nbsp;
					{data? (
						_.sumBy(data.getContactsByPostalCode,"total")
					) : (
						0
					)}
					</span>
				</div>
			</div>
		</>
	);
};

export default ReportContactPostalCode;
