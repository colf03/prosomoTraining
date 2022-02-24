import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const GET_LINK = gql`
	query Link($id: ID!) {
		link: getLink(_id: $id) {
			_id
			title
			url
		}
	}
`;

const LinkPage = () => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_LINK, {
		variables: { id },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error ⁉️</p>;

	const { link } = data;
	return (
		<>
			<Helmet>
				<title>Prosomo : lien </title>
				<meta name="description" content="Link" />
			</Helmet>
			<div>
				<h2>Learn Meteor!</h2>
				<a href={link.url} target="_blank">
					{link.title}
				</a>
			</div>
		</>
	);
};

export default LinkPage;
