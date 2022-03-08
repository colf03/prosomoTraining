import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from "mongodb";

export default class Link extends MongoDataSource {


  async getLink(id) {
    return this.findOneById(id, { ttl: 60 });
  }

  async getLinks() {
	return this.collection.find().toArray();
  }
}

