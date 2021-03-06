import { ApolloServer } from "apollo-server-express";
import { WebApp } from "meteor/webapp";
import { getUser } from "meteor/apollo";
import { LinksCollection } from "/imports/api/links";
import typeDefs from "/imports/apollo/schema.graphql";
import { ObjectId } from "mongodb";

const MongoClient = require("mongodb").MongoClient;
const password = "0AJxFvH8CLDjSAuA";
const username = "florian";
const uri = `mongodb+srv://${username}:${password}@cluster0.n75dl.mongodb.net`;
const resolvers = {
	Query: {
		getLink: async (obj, args, { links }, infos) =>links.findOne({ _id: args._id }),
		getLinks: async (obj, args, { links }, infos) => links.find().toArray(),
		getContact: async (parent, args, { contact }, infos) =>contact.findOne({ _id: ObjectId(args._id) }),
		getContacts: async (parent, args, { contact }, infos) =>contact.find().toArray(),
	},
	Mutation: {
		createContact: async (parent, { input }, { contact }, info) => {
			contact.insertOne(input, function (error, response) {
				if (error)
					console.log("Error occurred while inserting : " + error);
				else {
					contact.findOne({ _id: ObjectId(response.insertedId) });
				}
			});
		},
		updateContact: async (parent, { id, input }, { contact }, info) => {
			await contact.updateOne(
				{ _id: ObjectId(id) },
				{ $set: input },
				function (error, response) {
					if (error)
						console.log("Error occurred while updating : " + error);
				}
			);
			return await contact.findOne({ _id: ObjectId(id) });
		},
		deleteContact: async (parent, { _id }, { contact }, info) => {
			contact.deleteOne(
				{ _id: ObjectId(_id) },
				function (error, response) {
					if (error)
						console.log("Error occurred while deleting : " + error);
					else {
						return "Contact deleted";
					}
				}
			);
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const user = await getUser(req.headers.authorization);
		const dbClient = new MongoClient(uri);
		await dbClient.connect();
		db = dbClient.db("training");

		var contact = db.collection("Contact");
		var links = db.collection("links");

		return { db, contact, links };
	},
});

server.applyMiddleware({
	app: WebApp.connectHandlers,
	cors: true,
});
