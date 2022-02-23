import React from "react";
import ReactDOM from 'react-dom';
import {
	InMemoryCache,
	ApolloProvider,
	ApolloClient,
	ApolloLink,
} from "@apollo/client";
import { onPageLoad } from 'meteor/server-render';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
// import { MeteorAccountsLink } from 'meteor/apollo'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Routes,
	Link,
} from "react-router-dom";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";
import { FormContact } from "./FormContact.jsx";
import { NotFound } from "./NotFound.jsx";
import { EditContact } from "./EditContact.jsx";
import { Contact } from "./Contact.jsx";

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

const link = ApolloLink.from([
	// MeteorAccountsLink(),
	new BatchHttpLink({
		uri: "/graphql",
	}),
]);

const client = new ApolloClient({
	uri: "/graphql",
	cache: new InMemoryCache({
		addTypename: false
	  }),
	link,
});

export const App = () => (
	<ApolloProvider client={client}>
		<div>
			<Router>
				<nav className="App-header">
					<span>
						<Link to="/">Accueil</Link>
					</span>
					<span>
						<Link to="/info">Info</Link>
					</span>
					<span>
						<Link to="/contacts">Liste des contacts</Link>
					</span>
					<span>
						<Link to="/formContact">Ajouter un Contact</Link>
					</span>
				</nav>
				<Routes>
					<Route exact path="/" element={<Hello />}></Route>
					<Route exact path="/info" element={<Info />}></Route>
					<Route exact path="/contacts" element={<Contact />}></Route>
					<Route exact path="/formContact" element={<FormContact />}></Route>
					<Route path="/editContact/:id" element={<EditContact />}></Route>
					<Route path="/*" element={<NotFound />}> </Route>
				</Routes>
			</Router>
		</div>
	</ApolloProvider>
);
onPageLoad(() => {
	ReactDOM.hydrate(<App />, document.getElementById('react-target'));
  });
