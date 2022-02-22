import { ApolloServer } from "apollo-server-express";
import { WebApp } from "meteor/webapp";
import { getUser } from "meteor/apollo";
import { LinksCollection } from "/imports/api/links";
import { ContactCollection } from "/imports/api/contact";
import typeDefs from "/imports/apollo/schema.graphql";
import { ObjectId } from "mongodb";

const MongoClient = require("mongodb").MongoClient;
const password = "gyPMaJneVMpD94";
const username = "florian";
const uri = `mongodb+srv://${username}:${password}@cluster0.n75dl.mongodb.net`;

const resolvers = {
	Query: {
		getLink: async (obj, args, { links }, infos) => links.findOne({"_id" :  ObjectId(args._id)}),
		getLinks: async (obj, args, { links }, infos) => links.find().toArray(),
		getContact: async (parent, args, { contact }, infos) =>contact.findOne({"_id" :  ObjectId(args._id)}),
		getContacts: async (parent, args, { contact }, infos) => contact.find().toArray(),

	},
	Mutation: {
		createContact: async (parent, { input}, { contact }, info) => {
			contact.insertOne(input, function (error, response) {
				if (error)
					console.log("Error occurred while inserting : " + error);
				else{
					contact.findOne({"_id" : response.insertedId}).then((value)=>{
						return {value};
					});
				}
			});

		},
		updateContact :  async (parent, { id, input}, { contact }, info) => {
			contact.updateOne({_id : ObjectId(id)}, {$set : input}, function (error, response){
				if(error)
					console.log("Error occurred while updating : " + error);
			});

		},
		deleteContact : async (parent, {_id}, { contact }, info) => {
			contact.deleteOne({"_id" :  ObjectId(_id)}, function (error, response){

				if (error)
					console.log("Error occurred while deleting : " + error);
				else{
					return "Contact deleted";
				}

			});

		},
	},
};

let db;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async () => {
		const dbClient = new MongoClient(uri);
		await dbClient.connect();
		db = dbClient.db("training");

		var contact = db.collection("Contact");
		var links = db.collection("links");

		return { db, contact, links };
	},
});

export async function startApolloServer() {
	await server.start();
	const app = WebApp.connectHandlers;

	server.applyMiddleware({
		app,
		cors: true,
	});
}
