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
/*
const Select = dynamic(import('react-select'), {
	ssr: false
});
*/
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
let _ = require('lodash');

import {GET_ALL_PROVINCE, GET_CONTACTS_BY_PROVINCE} from "../../../apollo/contactQuery";

const ReportContactProvince = () => {
	const [province, setProvince] = useState([]);
	const items_per_page = 5;
	const actual_page=1;
	const allPage = [1];

	let  { loading, error, data} = useQuery(GET_CONTACTS_BY_PROVINCE, {  variables : { 'provinces' :  province}});
	const  allProvince = useQuery(GET_ALL_PROVINCE);
	let options= [{ value: 'all', label: 'Toutes les provinces'}];
	if(allProvince?.data?.getAllProvinces){
		allProvince?.data?.getAllProvinces.map((row) => {
			options=_.concat(options,[{ value: row, label: row}]);
		});
	}







	useEffect(() => {}, []);


	function deleteContact(id) {
		deleteContactMutation({ variables: { id: id } });
	}

	const handleSelectChange = (values) => {
		var arrayProvince = [];
		if(values){
			values.map((row)=>{
				arrayProvince=_.concat(arrayProvince,row.value);
			});
		}
		setProvince(arrayProvince);
	}

	return (
		<>
			<Helmet>
				<title>Prosomo : Rapport Contacts </title>
				<meta name="description" content="Contact list" />
			</Helmet>
			<div>
				<h2>Rapport des contacts regroupé par province : </h2>
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
								<TableCell align="left">Province</TableCell>
								<TableCell align="left">Nombre de contact</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.getContactsByProvince?.map((row) => (
								<TableRow
									key={"repportProvince_" + row._id}
									id={row._id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.province}
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
						_.sumBy(data.getContactsByProvince,"total")
					) : (
						0
					)}
					</span>
				</div>
			</div>
		</>
	);
};

export default ReportContactProvince;
