import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
	Hello,
	Info,
	LinkPage,
	Contact,
	EditContact,
	FormContact,
	NotFound,
} from "./pages";

const Routes = () => {
	return (
		<>
		<Switch>
			<Route path="/" component={Hello} exact />
			<Route path="/info" component={Info} exact />
			<Route path="/link/:id" component={LinkPage} />
			<Route exact path="/contacts" component={Contact}></Route>
			<Route exact path="/formContact" component={FormContact}></Route>
			<Route path="/editContact/:id" component={EditContact}></Route>
			<Route
					path={"*"}
					render={({ staticContext }) => {
					if (staticContext) {
						staticContext.statusCode = 404;
					}
					return <Redirect to="/404" />;
					}}
				/>
    	</Switch>
		<Route path="/404" component={NotFound}></Route>
		</>
	);
};

export default Routes;
