import React from "react";
import ApolloClient from 'apollo-boost'
import "./App.css";
import { ApolloProvider } from '@apollo/react-hooks';
import {BrowserRouter} from 'react-router-dom';
import { Routes } from "../../../routes";

const client = new ApolloClient({
  uri: 'http://localhost:3001'
});

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename='/' children={Routes} />
    </ApolloProvider>
  );
}

export default App;
