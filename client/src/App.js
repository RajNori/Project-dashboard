import React from "react";
import Header from "./components/header";
import {ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from "./components/Clients";

const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});
console.log(Clients.data)
function App() {
  return (
    <>
    <ApolloProvider client={client}>
    <Header/>
    <div className="container">
    <Clients/>
    </div>
    </ApolloProvider>
    </>
  );
}

export default App;
