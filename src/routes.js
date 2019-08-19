import React from 'react';
import {Route} from 'react-router-dom';
import AddContact from './components/containers/AddContact/AddContact';
import Layout from './components/presentational/Layout/Layout';
import ContactList from './components/containers/ContactList/ContactList';
import EditContact from './components/containers/EditContact/EditContact';
import ViewContact from './components/presentational/ViewContact/ViewContact';

export const Routes = (
    <Layout>
        <Route component={ContactList} path='/' exact/>
        <Route component={AddContact} path='/contact/add' />
        <Route component={EditContact} path='/contact/edit/:id'/>
        <Route component={ViewContact} path='/contact/get/:id' />
    </Layout>
)