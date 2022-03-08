import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from "mongodb";
const MINUTE = 60
export default class Contact extends MongoDataSource {


	constructor(collection){
		super(collection);
	}
	async getContact(id) {
    	return this.findOneById(id);
  	}

	async getContacts() {
		return this.findByFields({});
  	}
	async getContactsPagination(limit, offset) {
		return this.collection.find().skip(offset).limit(limit).toArray();
  	}

	async getMaxContacts (){
		var res= await this.findByFields({});
		return (res.length);
	}

	async updateContact (id, contact){
		this.deleteFromCacheById(id);
		this.deleteFromCacheByFields({ _id: ObjectId(id)});
		this.collection.updateOne({ _id: ObjectId(id)}, {$set: contact});
		return (this.findOneById(id));
	}

	async createContact (contact){
		var response = await this.collection.insertOne(contact);
		return this.findOneById(response.insertedId);
	}

	async deleteContact(id) {
		this.collection.deleteOne({ _id: ObjectId(id) });
		this.deleteFromCacheById(id);
		this.deleteFromCacheByFields({ _id: ObjectId(id)});
		return "Contact deleted";

	}
}
