export default class ContactModel {


	firstName;
    lastName;
    email;
    phone;
    city;
    province;
    postalCode;
    country;
    comment;


	constructor (contact = null){
		if(contact == null){
			this.firstName="";
			this.lastName="";
			this.email="";
			this.phone=""
			this.city="";
			this.province="";
			this.postalCode="";
			this.country=""
			this.comment=[];
		}else{
			for (let [key, value] of Object.entries(contact)){
				this[key]=value;
			}

		}

	}

}
