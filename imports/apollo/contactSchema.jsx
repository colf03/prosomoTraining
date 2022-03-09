import { parse } from "graphql/language/parser";
import { buildASTSchema } from "graphql/utilities";
import { GraphQLBridge } from "uniforms-bridge-graphql";

const schema = `
  type Contact {
    firstName : String!
    lastName : String!
    email : String!
    phone: String!
    city : String!
    province : String!
    postalCode : String!
    country : String!
    comment : [String]
  }

  # This is required by buildASTSchema
  type Query { anything: ID }

`;

/* for normal schema
const args = {
  firstName: {
    label: "Prénom",
    required: true,
  },
  lastName: {
    label: "Nom",
    required: true,
  },

  email: {
    label: "Courriel",
    required: true,
  },
  phone: {
    label: "Téléphone",
    placeholder: "xxx-xxx-xxx",
    pattern: "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}",
    required: true,
  },
  city: {
    label: "Ville",
    required: true,
  },
  province: {
    label: "Province",
    required: true,
  },
  postalCode: {
    label: "Code postal",
    required: true,
    pattern: "/^[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ -]?\\d[ABCEGHJ-NPRSTV-Z]\\d$/i",
  },
  country: {
    label: "Pays",
    required: true,
  },
  comment: {
    label: "Commentaire",
    required: false,
  },
};
*/

const validator = (model) => {
	let regexPhone = new RegExp(
		"^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}"
	);
	let regexPostalCode = new RegExp(
		/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
	);
	let regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
	const details = [];
	if (!model.firstName)
		details.push({
			name: "firstName",
			message: "Vous devez rentrer un prénom.",
		});

	if (!model.lastName)
		details.push({
			name: "lastName",
			message: "Vous devez rentrer un nom.",
		});

	if (!model.email)
		details.push({
			name: "email",
			message: "Vous devez rentrer un courriel.",
		});
	else if (!regexEmail.test(model.email))
		details.push({
			name: "email",
			message: "Vous avez rentrer un courriel invalide.",
		});

	if (!model.phone)
		details.push({
			name: "phone",
			message: "Vous devez rentrer un numéro de téléphone.",
		});
	else if (!regexPhone.test(model.phone))
		details.push({
			name: "phone",
			message: "Vous avez rentrer un numéro de téléphone invalide.",
		});

	if (!model.city)
		details.push({
			name: "city",
			message: "Vous devez rentrer une ville.",
		});

	if (!model.province)
		details.push({
			name: "province",
			message: "Vous devez rentrer une province.",
		});

	if (!model.postalCode)
		details.push({
			name: "postalCode",
			message: "Vous devez rentrer un code postal.",
		});
	else if (!regexPostalCode.test(model.postalCode))
		details.push({
			name: "postalCode",
			message: "Vous avez rentrer un code postal invalide.",
		});

	if (!model.country)
		details.push({
			name: "country",
			message: "Vous devez rentrer un pays.",
		});

	if (details.length) return { details };
};

const type = buildASTSchema(parse(schema)).getType("Contact");

export const bridge = new GraphQLBridge(type, validator);
