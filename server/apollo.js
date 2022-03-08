import { ApolloServer } from "apollo-server-express";
import { WebApp } from "meteor/webapp";
import { getUser } from "meteor/apollo";
import typeDefs from "/imports/apollo/schema.graphql";
import { ObjectId } from "mongodb";
import Contact from "../imports/api/Contact";
import Link from "../imports/api/Link";
const MongoClient = require("mongodb").MongoClient;
const password = "0AJxFvH8CLDjSAuA";
const username = "florian";
const uri = `mongodb+srv://${username}:${password}@cluster0.n75dl.mongodb.net`;

const dbClient = new MongoClient(uri);
await dbClient.connect();
const db= dbClient.db('training');

const resolvers = {
	Query: {
		getLink: async (obj, args, context, infos) =>context.dataSources.linkDataSource.getLink(args._id),
		getLinks: async (obj, args, context, infos) => context.dataSources.linkDataSource.getLinks(),
		getContact: async (obj, args, context) => context.dataSources.contactDataSource.getContact(args._id),
		getContacts: async  (obj, args, context, info ) => context.dataSources.contactDataSource.getContacts()
	},
	Mutation: {
		createContact: async (parent, { input }, context, info) =>context.dataSources.contactDataSource.createContact(input),
		updateContact: async (parent, { id, input }, context, info) =>context.dataSources.contactDataSource.updateContact(id,input),
		deleteContact: async (parent, { _id }, context, info) =>context.dataSources.contactDataSource.deleteContact(_id),
	},

};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		contactDataSource : new Contact(db.collection('Contact')),
		linkDataSource : new Link(db.collection('links')),
		//var test = await contactDataSource.getContact('6216517dd2dc21c9170058cb');
		//var test = await contactDataSource.getContacts();
		//console.log (test);
	}),
	context: async ({ req }) => {
	}
});

server.applyMiddleware({
	app: WebApp.connectHandlers,
	cors: true,
});
