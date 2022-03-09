
import { ObjectId } from "mongodb";


export  function clearCacheById (apiDatasource,id){

	apiDatasource.deleteFromCacheById(id);
	apiDatasource.deleteFromCacheByFields({ _id: ObjectId(id)});


}
