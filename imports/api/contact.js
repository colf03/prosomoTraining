import { empty } from "@apollo/client";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";
import { clearCacheById } from "./Cache.js";
let _ = require("lodash");
export default class Contact extends MongoDataSource {
	constructor(collection) {
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

	async getContactsByProvince(provinces) {
		let result = [];
		let match = {};

		if (provinces.length) {
			if (_.indexOf(provinces, "all") == -1) {
				match = { province: { $in: provinces } };
			}
			result = this.collection.aggregate([
				{ $match: match} ,
				{ $group: { _id: "$province" , province: { $first: '$province' }, total: { $sum:1 } } },
				{ $sort : { province : 1 } }
			]).toArray();
		}
		return result;
	}

	async getMaxContacts() {
		var res = await this.findByFields({});
		return res.length;
	}
	async getAllProvinces() {
		return this.collection.distinct("province");
	}

	async updateContact(id, contact) {
		clearCacheById(this, id);
		this.collection.updateOne({ _id: ObjectId(id) }, { $set: contact });
		return this.findOneById(id);
	}

	async createContact(contact) {
		var response = await this.collection.insertOne(contact);
		return this.findOneById(response.insertedId);
	}

	async deleteContact(id) {
		this.collection.deleteOne({ _id: ObjectId(id) });
		clearCacheById(this, id);
		return "Contact deleted";
	}
}
