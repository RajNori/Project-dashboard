import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  // URI for development 👨‍💻 ⟠ 👇
  // uri: 'http://localhost:5000/graphql',

  // URI for production 🚀 ⟠ 👇 
  uri:'/graphql',
cache,
});
function App() {
  return (
   
      <ApolloProvider client={client}>
        <Router>
          <>
          <Header />
          <div className='container'>
           <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/projects/:id' element={<Project/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
           </Routes>
          </div>
          </>
        </Router>
      </ApolloProvider>
   
  );
}

export default App;
