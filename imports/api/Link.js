import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from "mongodb";

export default class Link extends MongoDataSource {


  async getLink(id) {
    return this.findOneById(id);
  }

  async getLinks() {
	return this.collection.find().toArray();
  }
}

